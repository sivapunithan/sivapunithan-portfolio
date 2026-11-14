import { cn } from "@/lib/utils";

/** Printer's fleuron: a hairline, a small diamond lozenge flanked by dots, a hairline. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center justify-center gap-4 text-accent", className)}>
      <span className="h-px w-16 bg-line-strong md:w-28" />
      <svg viewBox="0 0 60 12" className="h-3 w-14" fill="currentColor">
        <circle cx="6" cy="6" r="1.4" />
        <path d="M18 6 24 1.2 30 6 24 10.8Z" opacity="0.55" />
        <path d="M24 6 30 .8 36 6 30 11.2Z" />
        <path d="M30 6 36 1.2 42 6 36 10.8Z" opacity="0.55" />
        <circle cx="54" cy="6" r="1.4" />
      </svg>
      <span className="h-px w-16 bg-line-strong md:w-28" />
    </div>
  );
}
