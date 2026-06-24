import { siteConfig } from "@/data/portfolio";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Breadcrumb } from "@/components/ui/breadcrumb";

/**
 * Slim top workspace bar, loosely inspired by an IntelliJ project window:
 * brand mark · project breadcrumb · availability. Mono type, thin border,
 * no window controls, no fake IDE chrome.
 */
export function WorkspaceBar() {
  const year = new Date().getFullYear();

  return (
    <div className="flex h-9 items-center justify-between gap-4 border-b border-edge-subtle px-4 sm:px-6 lg:px-8">
      <BrandLogo href="#intro" label={`${siteConfig.name} portfolio home`} showTooltip />

      <Breadcrumb
        segments={siteConfig.workspaceBreadcrumb}
        className="hidden tracking-wide md:block"
      />

      <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-secondary">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-green/80" />
        <span className="hidden sm:inline">{siteConfig.availability}</span>
        <span className="sm:hidden">OPEN</span>
        <span aria-hidden="true" className="hidden text-muted lg:inline">
          · {year}
        </span>
      </p>
    </div>
  );
}
