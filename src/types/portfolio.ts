/**
 * Typed content models for the portfolio.
 * All editable content lives in src/data/portfolio.ts and must conform to these types.
 */

export type AccentTone = "blue" | "green" | "orange" | "yellow" | "lavender" | "neutral";

export interface SiteConfig {
  /** Full display name. */
  name: string;
  /** Short brand mark shown in the workspace bar. */
  brandMark: string;
  /** Role line used in metadata and the hero. */
  role: string;
  /** SEO description. */
  description: string;
  /** Production domain. Placeholder until deployed: [ADD PRODUCTION DOMAIN] */
  domain: string;
  /** Breadcrumb shown in the top workspace bar. */
  workspaceBreadcrumb: string[];
  /** Availability label shown in the workspace bar. */
  availability: string;
  /** Path to the résumé file in /public. */
  resumePath: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  /** May be a placeholder like [ADD GITHUB URL]; placeholder links are not rendered. */
  href: string;
}

export interface ProjectStatus {
  label: string;
  tone: AccentTone;
}

export interface ProjectLink {
  label: string;
  /** May be a placeholder; placeholder links are not rendered. */
  href: string;
}

export type ProjectLayout = "imageLeft" | "imageRight" | "wide";

export interface ProjectImage {
  /** May be a placeholder like [ADD PROJECT SCREENSHOT]; placeholders render a designed visual. */
  src: string;
  alt: string;
}

export interface Project {
  /** Two-digit index used in editorial layout, e.g. "01". */
  index: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  /** Heading for the highlights list, e.g. "HIGHLIGHTS" or "PLANNED SCOPE". */
  highlightsLabel: string;
  highlights: string[];
  status: ProjectStatus;
  links: ProjectLink[];
  image: ProjectImage;
  layout: ProjectLayout;
  /** Confidential work never renders repository or demo links. */
  confidential: boolean;
  /** Accent used sparingly inside the project visual placeholder. */
  accent: AccentTone;
  /**
   * Optional terminal command block rendered inside the project entry.
   * Lines prefixed with "$ " are styled as commands, "status: " as green,
   * "stack: " as orange. Used for the anonymised case study only.
   */
  terminalBlock?: readonly string[];
}

export interface StackGroup {
  index: string;
  title: string;
  accent: AccentTone;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  /** May be a placeholder: [ADD COMPANY NAME] */
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  board: string;
  period: string;
  score: string;
}

export type FocusStatus = "LEARNING" | "PRACTISING" | "BUILDING";

export interface FocusItem {
  index: string;
  title: string;
  status: FocusStatus;
}

export interface ContactConfig {
  heading: string;
  body: string;
  /** May be a placeholder: [ADD EMAIL] */
  email: string;
}
