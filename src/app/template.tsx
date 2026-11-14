import type { ReactNode } from "react";

/**
 * Re-mounted on every navigation, so the curtain (a pure-CSS animation, see
 * `.page-curtain` in globals.css) lifts off each new page as it arrives.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="page-curtain" />
      {children}
    </>
  );
}
