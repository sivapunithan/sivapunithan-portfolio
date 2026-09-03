import type {
  ArchitectureContent,
  ContactConfig,
  EducationEntry,
  ExperienceEntry,
  FocusItem,
  HeroContent,
  IntroContent,
  NavItem,
  Project,
  SectionCopy,
  SiteConfig,
  SocialLink,
  StackGroup,
} from "@/types/portfolio";

export const siteConfig: SiteConfig = {
  name: "Sivapunithan S",
  brandMark: "SP",
  role: "Java Backend Engineer",
  description:
    "Java and Spring Boot engineer working across APIs, enterprise workflows, SQL and Next.js applications.",
  domain: "sivapunithan.in",
  location: "Kanyakumari, Tamil Nadu, India",
  availability: "Open to relevant opportunities",
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

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/sivapunithan" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sivapunithan-sathasivan-462959257/",
  },
  { label: "Email", href: "mailto:punithansiva987@gmail.com" },
];

export const introContent: IntroContent = {
  tab: "Sivapunithan.java",
  openingMessage: "Opening engineer profile...",
  skipLabel: "Skip intro",
  profileLines: [
    "public final class Sivapunithan {",
    "",
    "    String role = \"Java Backend Engineer\";",
    "",
    "    String[] core = {",
    "        \"Java\",",
    "        \"Spring Boot\",",
    "        \"REST APIs\",",
    "        \"SQL\"",
    "    };",
    "",
    "    String focus = \"Reliable backend systems\";",
    "}",
  ],
  revealName: "Sivapunithan",
  revealRole: "Java Backend Engineer",
  revealStatement: "Building reliable systems.",
};

export const heroContent: HeroContent = {
  fileLabel: "Sivapunithan.java",
  eyebrow: "Engineer profile / ready",
  heading: "I build reliable backend systems and the interfaces that operate them.",
  body: "Java and Spring Boot engineer working across APIs, enterprise workflows, SQL and Next.js applications.",
  primaryAction: "View selected work",
  resumeAction: "Résumé",
  architectureCaption: "request path",
  architecturePath: ["interface", "API", "service", "data"],
  portrait: {
    src: "[ADD PORTRAIT IMAGE]",
    alt: "Portrait of Sivapunithan S",
  },
};

export const sectionCopy: Record<
  "introduction" | "projects" | "experience" | "stack" | "education" | "focus",
  SectionCopy
> = {
  introduction: {
    index: "02",
    label: "ENGINEERING INTRODUCTION",
    heading: "I work where business workflows, backend logic and data integrity meet.",
    body: "My work spans Java and Spring Boot development, REST APIs, enterprise workflows, Oracle SQL and MySQL, production debugging, and Next.js with TypeScript integration.",
  },
  projects: {
    index: "03",
    label: "SELECTED WORK",
    heading: "Systems thinking, production discipline and clear technical choices.",
  },
  experience: {
    index: "05",
    label: "EXPERIENCE",
    heading: "One continuous role, working across enterprise workflows and backend reliability.",
  },
  stack: {
    index: "06",
    label: "TECHNICAL STACK",
    heading: "A practical toolkit for building and operating backend-heavy applications.",
  },
  education: {
    index: "07",
    label: "EDUCATION",
    heading: "Academic foundation.",
  },
  focus: {
    index: "08",
    label: "CURRENT FOCUS",
    heading: "Keeping the fundamentals sharp while expanding the system view.",
  },
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "enterprise-procurement-workflow",
    title: "Enterprise Procurement Workflow",
    category: "ANONYMISED ENTERPRISE WORK",
    summary:
      "A backend-heavy procurement platform where approval states, persistence behaviour and workflow visibility require careful, confidential handling.",
    problem:
      "Multi-stage procurement flows can fail when validation, persisted state and role visibility fall out of sync.",
    responsibility:
      "Contributed to Java and Spring Boot APIs, Oracle SQL investigation, workflow debugging and Next.js integration across procurement-related modules.",
    decision:
      "Treat state transitions and validation boundaries as explicit workflow concerns, while keeping client and operational details anonymised.",
    stack: ["Java", "Spring Boot", "Oracle SQL", "Next.js", "TypeScript"],
    status: { label: "ANONYMISED CASE STUDY", tone: "neutral" },
    links: [],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Enterprise workflow architecture" },
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
      "A backend-focused booking system designed around concurrent reservation attempts and transactional state changes.",
    problem:
      "Two requests can target the same seat before either transaction has completed, risking an invalid double booking.",
    responsibility:
      "Modelled the booking domain and REST workflow around seat availability, reservation and confirmation states.",
    decision:
      "Designed the booking workflow around optimistic locking and rollback handling for concurrent reservation attempts.",
    stack: ["Java", "Spring Boot", "JPA", "MySQL", "REST APIs"],
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
      "A role-based library platform connecting Spring Boot services, Next.js interfaces, authentication and lending workflows.",
    problem:
      "Administrative catalogue work and member lending actions need different permissions without fragmenting the product experience.",
    responsibility:
      "Built and integrated API-driven flows for catalogue management, lending, returns and role-aware navigation.",
    decision:
      "Kept role checks aligned across backend endpoints and interface states so unavailable actions remain clear to each user type.",
    stack: ["Java", "Spring Boot", "MySQL", "Next.js", "TypeScript"],
    status: { label: "COMPLETED LEARNING PROJECT", tone: "green" },
    links: [{ label: "Repository", href: "[ADD PROJECT REPOSITORY URL]" }],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Library management platform interface" },
    layout: "imageLeft",
    confidential: false,
    accent: "blue",
  },
];

export const architectureContent: ArchitectureContent = {
  section: {
    index: "04",
    label: "ARCHITECTURE SPOTLIGHT",
    heading: "A clear request path makes workflow rules easier to reason about.",
    body: "The interface presents permitted actions; the API validates the request; the service layer owns the transition; persistence protects the resulting state; integrations remain explicit boundaries.",
  },
  flow: [
    { label: "Next.js interface", detail: "Role-aware action and state" },
    { label: "Spring Boot API", detail: "Validation and contract" },
    { label: "Service / domain", detail: "Workflow transition" },
    { label: "Oracle SQL or MySQL", detail: "Transactional state" },
    { label: "Integration boundary", detail: "External dependency" },
  ],
  concernLabel: "Authentic concern",
  concern:
    "In an approval or reservation flow, success is not only an accepted request. The stored state, permitted next action and visible role-specific task must still agree after the transaction completes.",
  principlesLabel: "Design checks",
  principles: [
    "Validate before changing workflow state.",
    "Keep transaction boundaries explicit.",
    "Make role-based visibility follow persisted state.",
    "Treat integrations as failure-aware boundaries.",
  ],
};

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
    items: ["Oracle SQL", "MySQL", "Transaction handling", "SQL optimisation"],
  },
  {
    index: "03",
    title: "FRONTEND",
    accent: "neutral",
    items: ["Next.js", "React", "TypeScript", "API integration"],
  },
  {
    index: "04",
    title: "ENGINEERING",
    accent: "green",
    items: ["Git", "Maven", "Docker", "Debugging", "Concurrency control"],
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
    title: "Enterprise application development",
    summary:
      "Contributing to enterprise business applications using Java, Spring Boot, Oracle SQL, Next.js and TypeScript.",
    techTags: ["Java", "Spring Boot", "REST APIs", "Oracle SQL", "Next.js", "TypeScript"],
    modules: [
      {
        title: "Workflow handling",
        description:
          "Contributed to multi-stage approval behaviour, business validations and role-based workflow transitions.",
        stack: ["Spring Boot", "REST APIs", "Spring Security"],
      },
      {
        title: "Persistence and debugging",
        description:
          "Investigated application issues across backend logic, Oracle SQL and frontend integration, then implemented scoped fixes.",
        stack: ["Oracle SQL", "JPA", "Next.js"],
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
  heading: "Let’s build software that stays dependable when the workflow gets complicated.",
  body: "I am open to roles involving Java, Spring Boot, REST APIs, workflow systems, SQL and production-facing backend work.",
  email: "punithansiva987@gmail.com",
  emailLabel: "Email",
  locationLabel: "Location",
  availabilityLabel: "Availability",
};
