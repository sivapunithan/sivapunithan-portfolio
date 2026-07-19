import type {
  ContactConfig,
  EducationEntry,
  ExperienceEntry,
  FocusItem,
  NavItem,
  Project,
  SiteConfig,
  SocialLink,
  StackGroup,
} from "@/types/portfolio";

/**
 * Central content configuration.
 * Every editable value of the portfolio lives here — components never
 * hard-code content. Placeholders follow the [ADD …] convention and are
 * detected by isPlaceholder() in src/lib/utils.ts:
 *
 *   [ADD PROJECT REPOSITORY URL]
 *   [ADD LIVE DEMO URL]
 *   [ADD PROJECT SCREENSHOT]
 *
 * Placeholder links are never rendered as broken actions; placeholder
 * screenshots render a designed IDE-inspired visual instead.
 */

export const siteConfig: SiteConfig = {
  name: "Sivapunithan S",
  brandMark: "SP",
  role: "Java / Spring Boot / Systems",
  description: "Backend-focused software engineer building reliable Java systems, APIs, and workflows.",
  domain: "sivapunithan.in",
  workspaceBreadcrumb: ["portfolio", "sivapunithan-s", "backend-engineer"],
  availability: "OPEN TO OPPORTUNITIES",
  resumePath: "/resume.pdf",
};

export const navigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export const gutterSections: NavItem[] = [
  { label: "INTRO", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "STACK", href: "#stack" },
  { label: "CODE", href: "#code" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "EDUCATION", href: "#education" },
  { label: "FOCUS", href: "#focus" },
  { label: "CONTACT", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/sivapunithan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sivapunithan-sathasivan-462959257/" },
  { label: "Email", href: "mailto:punithansiva987@gmail.com" },
];

export const projects: Project[] = [
  {
    index: "01",
    slug: "enterprise-procurement-workflow",
    title: "Enterprise Procurement Workflow",
    category: "ANONYMISED ENTERPRISE WORK",
    summary:
      "A backend-heavy procurement platform where approvals, persistence issues, and workflow visibility had to be corrected without exposing confidential business details.",
    stack: ["Java", "Spring Boot", "Oracle SQL", "Next.js", "TypeScript"],
    highlightsLabel: "ENGINEERING FOCUS",
    highlights: [
      "Investigated approval-state handling across procurement and GRN workflows",
      "Resolved persistence and validation issues affecting workflow behaviour",
      "Integrated backend APIs with frontend approval screens and data entry flows",
      "Worked across production debugging and enterprise application reliability",
    ],
    status: { label: "ANONYMISED CASE STUDY", tone: "neutral" },
    links: [],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Enterprise procurement workflow case study" },
    layout: "wide",
    confidential: true,
    accent: "orange",
  },
  {
    index: "02",
    slug: "concurrent-movie-booking-system",
    title: "Concurrent Movie Booking System",
    category: "BACKEND SYSTEM",
    summary:
      "A backend-focused booking system designed around concurrency control, transaction integrity, optimistic locking, and rollback behaviour under simultaneous requests.",
    stack: ["Java", "Spring Boot", "JPA", "MySQL", "REST APIs"],
    highlightsLabel: "ENGINEERING FOCUS",
    highlights: [
      "Implemented optimistic locking to prevent double-booking under concurrent requests",
      "Modelled transactional booking flows with rollback-safe state updates",
      "Validated concurrency behaviour through repeatable high-contention scenarios",
      "Prioritised consistency over delivery speed in a backend-heavy project",
    ],
    status: { label: "IN DEVELOPMENT", tone: "yellow" },
    links: [{ label: "Repository", href: "[ADD PROJECT REPOSITORY URL]" }],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Concurrent booking system architecture" },
    layout: "imageRight",
    confidential: false,
    accent: "green",
  },
  {
    index: "03",
    slug: "library-management-platform",
    title: "Library Management Platform",
    category: "FULL-STACK APPLICATION",
    summary:
      "A role-based library platform that connects Spring Boot services, Next.js interfaces, authentication, and lending workflows in a single product experience.",
    stack: ["Java", "Spring Boot", "MySQL", "Next.js", "TypeScript"],
    highlightsLabel: "ENGINEERING FOCUS",
    highlights: [
      "Built role-aware application flows for administration and end-user actions",
      "Connected backend APIs with Next.js interfaces for lending and return operations",
      "Handled authentication, authorisation and workflow state in a cohesive stack",
      "Used the project to strengthen full-stack integration and backend reliability",
    ],
    status: { label: "COMPLETED LEARNING PROJECT", tone: "blue" },
    links: [{ label: "Repository", href: "[ADD PROJECT REPOSITORY URL]" }],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Library management platform interface" },
    layout: "imageLeft",
    confidential: false,
    accent: "blue",
  },
];

export const stackGroups: StackGroup[] = [
  {
    index: "01",
    title: "BACKEND",
    accent: "orange",
    items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "JPA / Hibernate"],
  },
  {
    index: "02",
    title: "DATA",
    accent: "blue",
    items: ["Oracle SQL", "MySQL", "Transaction Handling", "SQL Optimisation"],
  },
  {
    index: "03",
    title: "FRONTEND",
    accent: "neutral",
    items: ["Next.js", "React", "TypeScript", "API Integration"],
  },
  {
    index: "04",
    title: "ENGINEERING",
    accent: "green",
    items: ["Git", "Maven", "Docker", "Debugging", "Concurrency Control"],
  },
  {
    index: "05",
    title: "TOOLS",
    accent: "neutral",
    items: ["IntelliJ IDEA", "VS Code", "Postman / Bruno", "SVN"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "RCS Tech LLP",
    location: "Bengaluru, Karnataka, India",
    startDate: "July 2025",
    endDate: "Present",
    title: "Enterprise Procurement & Asset Management Platform",
    summary:
      "Contributing to the development of enterprise business applications using Java, Spring Boot, Oracle SQL, Next.js and TypeScript.",
    techTags: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Oracle SQL",
      "Next.js",
      "TypeScript",
      "Spring Security",
      "Tomcat",
      "SVN",
    ],
    modules: [
      {
        title: "Workflow Engine",
        description:
          "Built multi-stage approval workflows with business validations and role-based transitions across requester, approver, and finance stages.",
        stack: ["Spring Boot", "REST APIs", "Spring Security"],
        codeFile: "Workflow.java",
        codeSnippet: [
          "@Service",
          "public class WorkflowEngine {",
          "",
          "    @Transactional",
          "    public void transition(PurchaseRequest request, WorkflowEvent event) {",
          "        WorkflowStage next = stageResolver.resolve(request, event);",
          "        request.setStage(next);",
          "",
          "        if (next == WorkflowStage.FINANCE_REVIEW) {",
          "            notificationService.notifyFinanceTeam(request);",
          "        }",
          "    }",
          "}",
        ],
      },
      {
        title: "REST APIs",
        description:
          "Designed and built backend APIs powering procurement, GRN, AP processing, and payment-request modules.",
        stack: ["Spring Boot", "REST APIs", "JPA"],
        codeFile: "ProcurementController.java",
        codeSnippet: [
          "@RestController",
          "@RequestMapping(\"/api/v1/procurement\")",
          "public class ProcurementController {",
          "",
          "    @PostMapping(\"/grn\")",
          "    public ResponseEntity<GrnDto> createGrn(",
          "            @Valid @RequestBody CreateGrnCommand cmd) {",
          "        return ResponseEntity.ok(grnService.create(cmd));",
          "    }",
          "}",
        ],
      },
      {
        title: "Database",
        description:
          "Wrote and optimised Oracle SQL queries used for procurement reporting, validations, and workflow checks.",
        stack: ["Oracle SQL", "JPA"],
        codeFile: "OracleQueries.sql",
        codeSnippet: [
          "SELECT pr.id, pr.status, d.name AS department,",
          "       SUM(pi.amount) AS total_amount",
          "FROM purchase_request pr",
          "JOIN department d ON d.id = pr.department_id",
          "JOIN purchase_item pi ON pi.request_id = pr.id",
          "WHERE pr.created_at >= :startDate",
          "  AND pr.deleted_at IS NULL",
          "GROUP BY pr.id, pr.status, d.name",
          "ORDER BY total_amount DESC;",
        ],
      },
      {
        title: "Frontend",
        description:
          "Developed Next.js pages integrating backend APIs for procurement workflows, including approval dashboards and data tables.",
        stack: ["Next.js", "TypeScript"],
        codeFile: "ApprovalDashboard.tsx",
        codeSnippet: [
          "export function ApprovalDashboard() {",
          "  const { data, isLoading } = usePendingApprovals();",
          "",
          "  if (isLoading) return <DashboardSkeleton />;",
          "",
          "  return (",
          "    <DataTable",
          "      rows={data}",
          "      columns={approvalColumns}",
          "      onApprove={(id) => approveRequest(id)}",
          "    />",
          "  );",
          "}",
        ],
      },
      {
        title: "Production Support",
        description:
          "Investigated and resolved production issues spanning APIs, workflow logic, frontend integration, and Oracle SQL.",
        stack: ["Spring Boot", "Oracle SQL", "Tomcat"],
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    degree: "B.E. Computer Science and Engineering",
    institution: "Amrita College of Engineering and Technology, Nagercoil",
    board: "Anna University",
    period: "August 2020 — June 2024",
    score: "CGPA 8.35 / 10",
  },
];

export const focusItems: FocusItem[] = [
  { index: "01", title: "Java Concurrency", status: "PRACTISING" },
  { index: "02", title: "System Design Fundamentals", status: "LEARNING" },
  { index: "03", title: "Database Internals", status: "LEARNING" },
  { index: "04", title: "Backend Architecture", status: "BUILDING" },
  { index: "05", title: "Data Structures and Algorithms", status: "PRACTISING" },
  { index: "06", title: "Go (Golang) — Backend Systems", status: "LEARNING" },
];

export const contactConfig: ContactConfig = {
  heading: "Looking for backend-heavy software engineering opportunities.",
  body: "I am open to roles involving Java, Spring Boot, REST APIs, workflow systems, SQL, and production-facing backend work.",
  email: "punithansiva987@gmail.com",
};
