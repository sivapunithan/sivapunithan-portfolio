/**
 * Typed content models for the portfolio. Editable copy lives in src/data/portfolio.ts.
 *
 * Headings may wrap one phrase in asterisks — "plain *accent phrase* plain" — which the
 * text components render in the italic brass accent style.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  brandMark: string;
  role: string;
  description: string;
  domain: string;
  location: string;
  availability: string;
  resumePath: string;
  githubUsername: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Illustration {
  src: string;
  alt: string;
  /** CSS object-position, used to keep the subject in frame when the image is cropped. */
  position: string;
  /** Engraved-plate style caption shown along the image edge, e.g. "Plate I — The workshop". */
  caption?: string;
}

export interface IntroContent {
  name: string;
  role: string;
  note: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  body: string;
  primaryAction: string;
  resumeAction: string;
  illustration: Illustration;
}

/** Hero copy for a top-level page (About / Work / Contact). */
export interface PageHeroCopy {
  eyebrow: string;
  heading: string;
  body: string;
  illustration: Illustration;
}

export interface SectionCopy {
  index: string;
  label: string;
  heading: string;
  body?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export type ProjectTone = "active" | "building" | "private";

export interface ProjectStatus {
  label: string;
  tone: ProjectTone;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface FlowNode {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  summary: string;
  problem: string;
  responsibility: string;
  decision: string;
  stack: string[];
  status: ProjectStatus;
  links: ProjectLink[];
  /** The request path through the system, drawn as the project's schematic. */
  flow: FlowNode[];
  confidential: boolean;
}

export interface ArchitectureContent {
  section: SectionCopy;
  flow: FlowNode[];
  concernLabel: string;
  concern: string;
  principlesLabel: string;
  principles: string[];
}

export interface StackGroup {
  index: string;
  title: string;
  items: string[];
}

export interface ExperienceModule {
  title: string;
  description: string;
  stack: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  techTags: string[];
  modules: ExperienceModule[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  board: string;
  period: string;
  score: string;
  scoreLabel: string;
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
  email: string;
  footerPrompt: string;
  footerAction: string;
}
