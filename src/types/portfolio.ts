/** Typed content models for the portfolio. Editable copy lives in src/data/portfolio.ts. */

export type AccentTone = "blue" | "green" | "orange" | "yellow" | "neutral";

export interface SiteConfig {
  name: string;
  brandMark: string;
  role: string;
  description: string;
  domain: string;
  location: string;
  availability: string;
  resumePath: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SectionCopy {
  index: string;
  label: string;
  heading: string;
  body?: string;
}

export interface IntroContent {
  tab: string;
  openingMessage: string;
  skipLabel: string;
  profileLines: readonly string[];
  revealName: string;
  revealRole: string;
  revealStatement: string;
}

export interface PortraitConfig {
  src: string;
  alt: string;
}

export interface HeroContent {
  fileLabel: string;
  eyebrow: string;
  heading: string;
  body: string;
  primaryAction: string;
  resumeAction: string;
  architectureCaption: string;
  architecturePath: readonly string[];
  portrait: PortraitConfig;
}

export interface ProjectStatus {
  label: string;
  tone: AccentTone;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export type ProjectLayout = "imageLeft" | "imageRight" | "wide";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  index: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  responsibility: string;
  decision: string;
  stack: string[];
  status: ProjectStatus;
  links: ProjectLink[];
  image: ProjectImage;
  layout: ProjectLayout;
  confidential: boolean;
  accent: AccentTone;
}

export interface ArchitectureContent {
  section: SectionCopy;
  flow: readonly { label: string; detail: string }[];
  concernLabel: string;
  concern: string;
  principlesLabel: string;
  principles: readonly string[];
}

export interface StackGroup {
  index: string;
  title: string;
  accent: AccentTone;
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
  title: string;
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
  emailLabel: string;
  locationLabel: string;
  availabilityLabel: string;
}
