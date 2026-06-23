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
  brandMark: "SS",
  role: "Java Developer · Spring Boot · Full-Stack",
  description:
    "Java developer building reliable enterprise systems with Spring Boot, Oracle SQL, Spring Security, and Next.js.",
  domain: "sivapunithan.in",
  workspaceBreadcrumb: ["portfolio", "sivapunithan-s", "java-developer"],
  availability: "OPEN TO OPPORTUNITIES",
  resumePath: "/resume.pdf",
};

export const navigation: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const gutterSections: NavItem[] = [
  { label: "INTRO", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "STACK", href: "#stack" },
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
    slug: "library-management-system",
    title: "Library Management System",
    category: "FULL-STACK APPLICATION",
    summary:
      "A role-based platform with separate administrative and user workflows for managing books, authors, publishers, lending, and returns.",
    stack: ["Java", "Spring Boot", "MySQL", "Next.js", "TypeScript"],
    highlightsLabel: "HIGHLIGHTS",
    highlights: [
      "Designed and integrated REST API workflows",
      "Implemented role-aware navigation and access handling",
      "Built lending and return flows",
      "Resolved authentication, CORS, and UI-state issues",
    ],
    status: { label: "COMPLETED LEARNING PROJECT", tone: "green" },
    links: [
      { label: "Repository", href: "[ADD PROJECT REPOSITORY URL]" },
      { label: "Live demo", href: "[ADD LIVE DEMO URL]" },
    ],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Library Management System interface" },
    layout: "imageLeft",
    confidential: false,
    accent: "blue",
  },
  {
    index: "02",
    slug: "movie-ticket-booking-application",
    title: "Movie Ticket Booking Application",
    category: "BACKEND APPLICATION",
    summary:
      "A backend-focused booking system with concurrent seat reservation, transaction safety via optimistic locking, and rollback handling for simultaneous booking requests.",
    stack: ["Java", "Spring Boot", "JPA", "MySQL", "REST APIs"],
    highlightsLabel: "HIGHLIGHTS",
    highlights: [
      "Implemented optimistic locking using JPA @Version fields to prevent double-booking under concurrent requests",
      "Built REST API endpoints for seat selection, booking confirmation, and real-time availability with rollback handling",
      "Designed data models for movies, screens, showtimes, seats, and bookings to support the full booking workflow",
      "Tested multi-threaded booking scenarios to verify concurrency control under simultaneous load",
      "Structured application as a realistic backend-heavy project focused on data integrity and concurrent access",
    ],
    status: { label: "IN DEVELOPMENT", tone: "yellow" },
    links: [{ label: "Repository", href: "[ADD PROJECT REPOSITORY URL]" }],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Movie Ticket Booking Application interface" },
    layout: "imageRight",
    confidential: false,
    accent: "green",
  },
  {
    index: "03",
    slug: "java-backend-engineering-lab",
    title: "Java Backend Engineering Lab",
    category: "ENGINEERING PRACTICE",
    summary:
      "A structured repository for learning backend fundamentals beyond basic CRUD applications.",
    stack: ["Java", "SQL", "Git"],
    highlightsLabel: "HIGHLIGHTS",
    highlights: [
      "Java concurrency exercises",
      "Networking experiments",
      "Echo-server implementation",
      "SQL practice",
      "Technical notes and observations",
    ],
    status: { label: "ONGOING", tone: "blue" },
    links: [{ label: "Repository", href: "[ADD PROJECT REPOSITORY URL]" }],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Java Backend Engineering Lab" },
    layout: "wide",
    confidential: false,
    accent: "orange",
  },
  {
    index: "04",
    slug: "procurement-workflow-case-study",
    title: "Procurement Workflow Case Study",
    category: "ANONYMISED ENTERPRISE WORK",
    summary:
      "A sanitised case study covering workflow debugging, persistence fixes, approval-state handling, calculation corrections, and frontend-backend integration.",
    stack: ["Java", "Spring Boot", "Oracle SQL", "ServiceNow", "Next.js"],
    highlightsLabel: "HIGHLIGHTS",
    highlights: [
      "Debugged and resolved approval-flow issues across purchase request and GRN workflows",
      "Fixed database-persistence problems including duplicate invoice checks and financial-calculation errors",
      "Identified and corrected role-based task-visibility gaps across requester, approver, and finance stages",
      "Integrated frontend approval dashboards and procurement forms with backend Java and Spring Boot APIs",
      "Worked across Oracle SQL queries, ServiceNow asset records, and Next.js pages in a production-style enterprise codebase",
    ],
    status: { label: "ANONYMISED CASE STUDY", tone: "neutral" },
    links: [],
    image: { src: "[ADD PROJECT SCREENSHOT]", alt: "Procurement workflow case study" },
    layout: "wide",
    confidential: true,
    accent: "lavender",
    terminalBlock: [
      "$ debug workflow --module procurement",
      "status: resolved",
      "stack: Spring Boot · Oracle SQL · ServiceNow · Next.js",
    ],
  },
];

export const stackGroups: StackGroup[] = [
  {
    index: "01",
    title: "BACKEND",
    accent: "orange",
    items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "JPA"],
  },
  {
    index: "02",
    title: "DATA",
    accent: "blue",
    items: ["Oracle SQL", "MySQL", "Hibernate", "SQL Optimisation"],
  },
  {
    index: "03",
    title: "FRONTEND",
    accent: "neutral",
    items: ["Next.js", "React.js", "TypeScript", "API Integration"],
  },
  {
    index: "04",
    title: "ENGINEERING PRACTICE",
    accent: "green",
    items: ["ServiceNow Integration", "Concurrency Control", "Maven", "Debugging"],
  },
  {
    index: "05",
    title: "TOOLS",
    accent: "neutral",
    items: ["Git", "SVN", "Postman", "IntelliJ IDEA", "VS Code"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: "Java Developer",
    company: "RCS Tech LLP",
    period: "November 2025 — Present",
    summary:
      "Working on an enterprise Procurement and Asset Management System using Spring Boot, Oracle SQL, and Next.js. The role covers backend API development, Spring Security integration, ServiceNow asset sync, and production debugging across a Tomcat and SVN-based business application.",
    highlights: [
      "Developing and maintaining backend modules for procurement workflows including purchase request handling and a 3-step approval flow covering requester, approver, and finance stages",
      "Designed and built REST APIs for GRN creation, purchase orders, AP processing, and payment-request flows",
      "Implemented Spring Security for role-based access control across procurement and asset management modules",
      "Integrated the Asset Management module with ServiceNow for automated incident creation, asset record sync, and service request handling",
      "Wrote and optimised Oracle SQL queries for procurement reports, asset records, and budget validation",
      "Developed Next.js frontend pages including approval dashboards, procurement forms, and data tables connected to backend APIs",
      "Debugged production backend issues including API failures, data inconsistencies, and SQL query errors",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "RCS Tech LLP",
    period: "July 2025 — October 2025",
    summary:
      "Four-month internship contributing to the same enterprise procurement application under senior developer guidance.",
    highlights: [
      "Built REST API endpoints for procurement modules using Spring Boot and Oracle SQL under senior developer guidance",
      "Assisted with Next.js and React.js frontend tasks connecting UI components to backend services",
      "Participated in sprint planning, daily standups, and peer code reviews",
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
];

export const contactConfig: ContactConfig = {
  heading: "Let's build something reliable.",
  body: "I am open to software-development opportunities involving Java, Spring Boot, Oracle SQL, Next.js, and backend-heavy full-stack work.",
  email: "punithansiva987@gmail.com",
};
