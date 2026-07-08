"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Container } from "@/components/ui/container";
import { CodeCommentLabel } from "@/components/ui/code-comment-label";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";
import { tokenizeJavaLine as tokenizeLine } from "@/lib/java-tokenizer";

// ─────────────────────────────────────────────────────────────────────────────
// Enterprise code snippets — procurement workflow, anonymised from production
// Line indices are 0-based; highlighted lines show business-critical patterns.
// ─────────────────────────────────────────────────────────────────────────────

interface Snippet {
  tab: string;
  file: string;
  badge: string;
  badgeTone: string;
  code: string;
  highlightLines: readonly number[];
}

const SNIPPETS: readonly Snippet[] = [
  {
    tab: "Controller.java",
    file: "PurchaseRequestController.java",
    badge: "REST LAYER",
    badgeTone: "text-accent-blue",
    highlightLines: [2, 19, 21, 27, 30],
    code: `@RestController
@RequestMapping("/api/v1/procurement/purchase-requests")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@Validated
public class PurchaseRequestController {

    private final PurchaseRequestService service;

    @GetMapping
    public ResponseEntity<Page<PurchaseRequestDto>> getAll(
            @RequestParam(required = false) WorkflowStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(
                service.findAll(status, PageRequest.of(page, size)));
    }

    @PostMapping
    @PreAuthorize("hasRole('REQUESTER')")
    public ResponseEntity<PurchaseRequestDto> create(
            @Valid @RequestBody CreatePurchaseRequestCommand cmd) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.initiateRequest(cmd));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('APPROVER')")
    public ResponseEntity<PurchaseRequestDto> approve(
            @PathVariable Long id,
            @Valid @RequestBody ApprovalDecisionDto decision) {
        return ResponseEntity.ok(
                service.processApproval(id, decision));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('APPROVER')")
    public ResponseEntity<PurchaseRequestDto> reject(
            @PathVariable Long id,
            @Valid @RequestBody RejectionReasonDto reason) {
        return ResponseEntity.ok(
                service.processRejection(id, reason));
    }
}`,
  },
  {
    tab: "Service.java",
    file: "PurchaseRequestService.java",
    badge: "BUSINESS LAYER",
    badgeTone: "text-accent-orange",
    highlightLines: [1, 14, 21, 22, 35, 40],
    code: `@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class PurchaseRequestService {

    private final PurchaseRequestRepository repository;
    private final BudgetValidationService budgetService;
    private final WorkflowEngine workflowEngine;
    private final NotificationService notificationService;
    private final PurchaseRequestMapper mapper;

    public PurchaseRequestDto initiateRequest(
            CreatePurchaseRequestCommand cmd) {
        budgetService.validateBudgetAvailability(
                cmd.getDepartmentId(), cmd.getEstimatedAmount());

        PurchaseRequest request = mapper.toEntity(cmd);
        request.setStatus(WorkflowStatus.DRAFT);
        request = repository.save(request);

        workflowEngine.transition(request, WorkflowEvent.SUBMIT);
        notificationService.notifyApprovers(request);

        log.info("PR initiated: id={}, dept={}",
                request.getId(), cmd.getDepartmentId());

        return mapper.toDto(request);
    }

    public PurchaseRequestDto processApproval(
            Long id, ApprovalDecisionDto decision) {
        PurchaseRequest request = repository.findByIdWithLock(id)
                .orElseThrow(() -> new EntityNotFoundException(id));

        workflowEngine.transition(request, WorkflowEvent.APPROVE);
        request.setApprovedBy(decision.getApproverId());
        request.setApprovedAt(Instant.now());

        PurchaseRequest saved = repository.save(request);
        notificationService.notifyRequester(saved, "APPROVED");
        return mapper.toDto(saved);
    }
}`,
  },
  {
    tab: "Repository.java",
    file: "PurchaseRequestRepository.java",
    badge: "DATA LAYER",
    badgeTone: "text-accent-green",
    highlightLines: [4, 19, 23, 24, 25, 33],
    code: `@Repository
public interface PurchaseRequestRepository
        extends JpaRepository<PurchaseRequest, Long> {

    @Query("""
            SELECT pr FROM PurchaseRequest pr
            LEFT JOIN FETCH pr.requester u
            LEFT JOIN FETCH pr.department d
            WHERE (:status IS NULL
               OR pr.status = :status)
              AND pr.deletedAt IS NULL
            ORDER BY pr.createdAt DESC
            """,
            countQuery = """
            SELECT COUNT(pr) FROM PurchaseRequest pr
            WHERE (:status IS NULL
               OR pr.status = :status)
              AND pr.deletedAt IS NULL
            """)
    Page<PurchaseRequest> findAllByStatus(
            @Param("status") WorkflowStatus status,
            Pageable pageable);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT pr FROM PurchaseRequest pr WHERE pr.id = :id")
    Optional<PurchaseRequest> findByIdWithLock(@Param("id") Long id);

    @Query("""
            SELECT pr FROM PurchaseRequest pr
            WHERE pr.department.id = :deptId
              AND pr.status IN ('PENDING', 'APPROVED')
              AND pr.createdAt >= :since
            """)
    List<PurchaseRequest> findActiveBudgetCommitments(
            @Param("deptId") Long deptId,
            @Param("since") Instant since);
}`,
  },
  {
    tab: "Workflow.java",
    file: "ProcurementWorkflowEngine.java",
    badge: "WORKFLOW LAYER",
    badgeTone: "text-accent-yellow",
    highlightLines: [18, 21, 27, 28, 37, 40],
    code: `@Component
@RequiredArgsConstructor
@Slf4j
public class ProcurementWorkflowEngine implements WorkflowEngine {

    private final ApplicationEventPublisher eventPublisher;
    private final AuditLogRepository auditLog;

    private static final Map<WorkflowStatus, Set<WorkflowEvent>>
        VALID_TRANSITIONS = Map.of(
            WorkflowStatus.DRAFT,    Set.of(WorkflowEvent.SUBMIT),
            WorkflowStatus.PENDING,  Set.of(WorkflowEvent.APPROVE,
                                            WorkflowEvent.REJECT),
            WorkflowStatus.APPROVED, Set.of(WorkflowEvent.COMPLETE),
            WorkflowStatus.REJECTED, Set.of(WorkflowEvent.RESUBMIT)
        );

    @Override
    @Transactional
    public void transition(PurchaseRequest request,
                           WorkflowEvent event) {
        validateTransition(request.getStatus(), event);

        WorkflowStatus previous = request.getStatus();
        WorkflowStatus next = resolveNextStatus(event);
        request.setStatus(next);

        auditLog.record(request.getId(), previous, next, event);
        eventPublisher.publishEvent(
                new WorkflowTransitionEvent(request, previous, next));

        log.info("Workflow: id={} {} -> {}",
                request.getId(), previous, next);
    }

    private void validateTransition(
            WorkflowStatus current, WorkflowEvent event) {
        Set<WorkflowEvent> allowed =
                VALID_TRANSITIONS.getOrDefault(current, Set.of());
        if (!allowed.contains(event)) {
            throw new InvalidWorkflowTransitionException(
                    current, event);
        }
    }
}`,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Architecture layers
// ─────────────────────────────────────────────────────────────────────────────

const ARCH_LAYERS = [
  { label: "REST API", detail: "HTTP / JSON" },
  { label: "Controller", detail: "@RequestMapping" },
  { label: "Service", detail: "@Transactional" },
  { label: "Repository", detail: "JPA / Hibernate" },
  { label: "Oracle SQL", detail: "Persistence" },
] as const;

// Which architecture layers each tab highlights (indices into ARCH_LAYERS)
const TAB_LAYERS: readonly (readonly number[])[] = [
  [0, 1], // Controller tab
  [2], // Service tab
  [3, 4], // Repository tab
  [2], // Workflow tab — orchestrates at the service level
];

const TECH_STACK = [
  "Java 21",
  "Spring Boot 3.5",
  "REST APIs",
  "JPA / Hibernate",
  "Oracle SQL",
] as const;

const RESPONSIBILITIES = [
  "Request Validation",
  "Business Rules",
  "Workflow Engine",
  "Transaction Management",
  "API Integration",
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function CodeShowcaseSection() {
  const [active, setActive] = useState(0);
  const [highlightsVisible, setHighlightsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const snippet = SNIPPETS[active];
  const lines = snippet.code.split("\n");
  const highlightSet = useMemo(() => new Set(snippet.highlightLines), [snippet.highlightLines]);
  const activeLayers = TAB_LAYERS[active];

  // Reveal highlights after the code fades in. Reset happens in handleTabChange.
  useEffect(() => {
    const delay = shouldReduceMotion ? 0 : 380;
    const t = setTimeout(() => setHighlightsVisible(true), delay);
    return () => clearTimeout(t);
  }, [active, shouldReduceMotion]);

  function handleTabChange(idx: number) {
    if (idx === active) return;
    setHighlightsVisible(false);
    setActive(idx);
  }

  return (
    <section id="code" className="scroll-mt-24">
      <Container className="py-20 md:py-28">
        <SectionReveal className="mb-12 space-y-5 md:mb-16">
          <SectionLabel index="04" label="CODE SIGNATURE" />
          <CodeCommentLabel>{"// real patterns · anonymised from production"}</CodeCommentLabel>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Building Enterprise Software.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="overflow-hidden rounded-[0.9rem] border border-edge bg-background-deep shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_8px_40px_rgba(0,0,0,0.5)]">
            {/* ── Tab bar ── */}
            <div className="flex items-stretch overflow-x-auto border-b border-edge bg-surface/30">
              {SNIPPETS.map((s, i) => (
                <button
                  key={s.tab}
                  type="button"
                  onClick={() => handleTabChange(i)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-1.5 border-r border-edge px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] transition-colors duration-200 select-none",
                    active === i
                      ? "bg-background-deep text-primary"
                      : "text-muted/60 hover:bg-surface-hover/20 hover:text-secondary",
                  )}
                >
                  {/* Active tab: orange top-border indicator */}
                  {active === i && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[2px] bg-accent-orange shadow-[0_0_8px_var(--accent-orange)]"
                    />
                  )}
                  {/* Java file badge */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[0.2rem] text-[8px] font-bold transition-colors duration-200",
                      active === i
                        ? "bg-accent-orange/20 text-accent-orange"
                        : "bg-muted/8 text-muted/40",
                    )}
                  >
                    J
                  </span>
                  {s.tab}
                </button>
              ))}
            </div>

            {/* ── Body ── */}
            <div className="grid lg:grid-cols-[minmax(0,1fr)_236px]">
              {/* Code panel */}
              <div
                className="code-scroll overflow-auto border-b border-edge lg:border-b-0 lg:border-r"
                style={{ maxHeight: "480px" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.pre
                    key={active}
                    className="flex py-4 font-mono text-[12px] leading-[1.75]"
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                  >
                    {/* Gutter — line numbers */}
                    <div
                      aria-hidden="true"
                      className="min-w-[2.75rem] shrink-0 select-none border-r border-edge-subtle pr-3 text-right text-[11px] leading-[1.75] text-muted/28"
                    >
                      {lines.map((_, idx) => (
                        <div key={idx}>{idx + 1}</div>
                      ))}
                    </div>

                    {/* Source — each line is a full-width block for highlight bg */}
                    <code className="block min-w-0 flex-1">
                      {lines.map((line, idx) => {
                        const isHl = highlightSet.has(idx);
                        return (
                          <div
                            key={idx}
                            className={cn(
                              "pl-4 pr-6 transition-colors duration-500",
                              isHl && highlightsVisible
                                ? "border-l-[2px] border-accent-orange/55 bg-accent-orange/8"
                                : "border-l-[2px] border-transparent",
                            )}
                          >
                            {line === "" ? (
                              <span className="select-none">&nbsp;</span>
                            ) : (
                              tokenizeLine(line).map((tok, ti) => (
                                <span key={ti} className={tok.cls}>
                                  {tok.text}
                                </span>
                              ))
                            )}
                          </div>
                        );
                      })}
                    </code>
                  </motion.pre>
                </AnimatePresence>
              </div>

              {/* Info panel */}
              <div className="flex flex-col gap-5 p-5 font-mono text-[11px]">
                {/* Architecture flow */}
                <div>
                  <p className="mb-3 tracking-[0.16em] text-muted/50 uppercase">Architecture</p>
                  <div>
                    {ARCH_LAYERS.map((layer, idx) => {
                      const isActive = (activeLayers as readonly number[]).includes(idx);
                      const isLast = idx === ARCH_LAYERS.length - 1;
                      const nextActive = (activeLayers as readonly number[]).includes(idx + 1);
                      return (
                        <div key={layer.label}>
                          <div
                            className={cn(
                              "flex items-center justify-between rounded-[0.3rem] px-2 py-1 transition-colors duration-300",
                              isActive ? "bg-accent-orange/10 text-accent-orange" : "text-muted/40",
                            )}
                          >
                            <span>{layer.label}</span>
                            <span
                              className={cn(
                                "text-[9px] tracking-[0.08em] transition-colors duration-300",
                                isActive ? "text-accent-orange/60" : "text-muted/25",
                              )}
                            >
                              {layer.detail}
                            </span>
                          </div>
                          {!isLast && (
                            <div
                              className={cn(
                                "mx-[0.65rem] h-3 w-px transition-colors duration-300",
                                isActive || nextActive ? "bg-accent-orange/35" : "bg-edge-subtle",
                              )}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="h-px bg-edge-subtle" />

                {/* Tech stack */}
                <div>
                  <p className="mb-2 tracking-[0.16em] text-muted/50 uppercase">Stack</p>
                  {TECH_STACK.map((tech) => (
                    <p key={tech} className="py-[2px] text-secondary/65">
                      {tech}
                    </p>
                  ))}
                </div>

                <div className="h-px bg-edge-subtle" />

                {/* Responsibilities */}
                <div>
                  <p className="mb-2 tracking-[0.16em] text-muted/50 uppercase">Responsibilities</p>
                  {RESPONSIBILITIES.map((r) => (
                    <p key={r} className="flex items-baseline gap-2 py-[2px] text-secondary/65">
                      <span className="text-accent-green/65 shrink-0">✓</span>
                      {r}
                    </p>
                  ))}
                </div>

                <p className="mt-auto text-[10px] tracking-[0.1em] text-muted/25 uppercase">
                  Anonymised · from real work
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}
