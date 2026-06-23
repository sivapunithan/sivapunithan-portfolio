import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  /** Subtle dividers sit inside content; default dividers separate sections. */
  subtle?: boolean;
}

/** Thin horizontal rule — the core structural element of the IDEA Noir layout. */
export function Divider({ className, subtle = false }: DividerProps) {
  return (
    <hr
      className={cn("border-0 border-t", subtle ? "border-edge-subtle" : "border-edge", className)}
    />
  );
}
