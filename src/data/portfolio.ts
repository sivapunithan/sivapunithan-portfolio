import type {
  ArchitectureContent,
  ContactConfig,
  EducationEntry,
  ExperienceEntry,
  Fact,
  FocusItem,
  HeroContent,
  IntroContent,
  NavItem,
  PageHeroCopy,
  Project,
  SectionCopy,
  SiteConfig,
  SocialLink,
  StackGroup,
} from "@/types/portfolio";

export const siteConfig: SiteConfig = {
  name: "Sivapunithan S",
  shortName: "Sivapunithan",
  brandMark: "SP",
  role: "Java Backend Engineer",
  description:
    "Java and Spring Boot engineer building the backend behind approval flows, booking systems and ledgers.",
  domain: "sivapunithan.in",
  location: "Kanyakumari, Tamil Nadu, India",
  availability: "Open to relevant opportunities",
  resumePath: "/resume.pdf",
  githubUsername: "sivapunithan",
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/sivapunithan", handle: "@sivapunithan" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sivapunithan-sathasivan-462959257/",
    handle: "Sivapunithan Sathasivan",
  },
  {
    label: "Email",
    href: "mailto:punithansiva987@gmail.com",
    handle: "punithansiva987@gmail.com",
  },
];

/** First-visit preloader copy. */
export const introContent: IntroContent = {
  name: "Sivapunithan",
  role: "Java Backend Engineer",
  note: "Warming up the workshop",
};

export const heroContent: HeroContent = {
  eyebrow: "Java Backend Engineer",
  heading: "I build the backend systems nobody notices — *until they'd miss them.*",
  body: "Java and Spring Boot, mostly. The kind of work that lives in approval flows, booking systems and ledgers — where “it mostly works” isn't good enough.",
  primaryAction: "See the work",
  resumeAction: "Résumé",
  illustration: {
    src: "/images/forge-hero.png",
    alt: "Steampunk-style illustration of Sivapunithan at a brass workshop desk, holding a mug labelled Java",
    position: "50% 18%",
    caption: "Plate I — The workshop",
  },
};

/** Home: the paragraph that lights up word by word as it scrolls into view. */
export const homeStatement = {
  index: "01",
  label: "What I do",
  text: "Business workflows break in boring ways: an approval that skips a stage, a seat sold twice, a balance that can't explain itself. *I build the part that makes sure they don't.*",
};

/** Home: short pointer to the About page. */
export const homeAbout = {
  index: "03",
  label: "Behind the work",
  heading: "I like the part of the system *nobody screenshots.*",
  body: "Approval states, lock contention, the edge case where two requests land in the same millisecond. It's the work I do by day, and what I keep building after hours.",
  action: "More about me",
};

export const aboutHero: PageHeroCopy = {
  eyebrow: "About",
  heading: "I like the part of the system *nobody screenshots.*",
  body: "Approval states, lock contention, the edge case where two requests land in the same millisecond — that's the work I actually enjoy.",
  illustration: {
    src: "/images/forge-about.png",
    alt: "Steampunk-style illustration of Sivapunithan working at a brass machine and a typewriter, blueprints pinned behind him",
    position: "72% 26%",
    caption: "Plate II — The workbench",
  },
};

export const workHero: PageHeroCopy = {
  eyebrow: "Work",
  heading: "Things I've actually built — *not things I've just read about.*",
  body: "Every personal project here links to a real repository, and says so when it's still in progress. The enterprise work stays anonymised.",
  illustration: {
    src: "/images/forge-stack.png",
    alt: "Illustration of a brass steam-engine machine with gears, gauges and glowing glass tubes",
    position: "58% 42%",
    caption: "Plate III — The machine",
  },
};

export const contactHero: PageHeroCopy = {
  eyebrow: "Contact",
  heading: "Say hello. *I reply faster than most of my APIs.*",
  body: "Open to roles and conversations around Java, Spring Boot and backend-heavy systems.",
  illustration: {
    src: "/images/forge-contact.png",
    alt: "Steampunk-style illustration of Sivapunithan at a Victorian transmission desk with envelopes and a pen",
    position: "70% 22%",
    caption: "Plate IV — The dispatch desk",
  },
};

export const sectionCopy: Record<
  "introduction" | "projects" | "experience" | "stack" | "education" | "focus",
  SectionCopy
> = {
  introduction: {
    index: "01",
    label: "A bit about me",
    heading: "Business workflows break in boring ways. *I happen to find that interesting.*",
    body: "Day to day that's Java and Spring Boot, REST APIs, Oracle SQL and MySQL, a fair amount of production debugging, and enough Next.js and TypeScript to be dangerous on the frontend too.",
  },
  projects: {
    index: "01",
    label: "Selected work",
    heading: "A few things I've built that *I'd actually explain in an interview.*",
  },
  experience: {
    index: "03",
    label: "Experience",
    heading: "One job so far. *Three very different problems inside it.*",
  },
  stack: {
    index: "02",
    label: "Technical stack",
    heading: "What's actually in the toolbox.",
  },
  education: {
    index: "04",
    label: "Education",
    heading: "Where the fundamentals came from.",
  },
  focus: {
    index: "05",
    label: "Current focus",
    heading: "What I'm sharpening *alongside the day job.*",
  },
};

export const aboutFacts: Fact[] = [
  { label: "Role", value: "Software Engineer, RCS Tech LLP" },
  { label: "Based in", value: "Kanyakumari, Tamil Nadu" },
  { label: "Core stack", value: "Java · Spring Boot · SQL" },
  { label: "Education", value: "B.E. Computer Science, 2024" },
];

export const projects: Project[] = [
  {
    slug: "enterprise-procurement-workflow",
    title: "Enterprise Procurement Workflow",
    tagline: "Multi-stage approvals that have to agree with the database",
    category: "Anonymised enterprise work",
    summary:
      "A backend-heavy procurement platform where approval states, persistence behaviour and workflow visibility require careful, confidential handling.",
    problem:
      "Multi-stage procurement flows can fail when validation, persisted state and role visibility fall out of sync.",
    responsibility:
      "Contributed to Java and Spring Boot APIs, Oracle SQL investigation, workflow debugging and Next.js integration across procurement-related modules.",
    decision:
      "Treat state transitions and validation boundaries as explicit workflow concerns, while keeping client and operational details anonymised.",
    stack: ["Java", "Spring Boot", "Oracle SQL", "Next.js", "TypeScript"],
    status: { label: "Anonymised case study", tone: "private" },
    links: [],
    flow: [
      { label: "Next.js interface", detail: "Role-aware actions" },
      { label: "Spring Boot API", detail: "Validation and contract" },
      { label: "Workflow service", detail: "Approval-stage transition" },
      { label: "Oracle SQL", detail: "Persisted state" },
    ],
    confidential: true,
  },
  {
    slug: "replymate-ai-whatsapp-assistant",
    title: "ReplyMate",
    tagline: "An LLM-powered WhatsApp assistant that knows when to call a human",
    category: "AI-integrated backend",
    summary:
      "An LLM-powered WhatsApp assistant for a service business: webhook-triggered, tool-calling against an internal business API, with automatic escalation to a human when a conversation needs one.",
    problem:
      "A WhatsApp Business webhook has to acknowledge in milliseconds or the provider retries and redelivers the same message — but generating a reply means a real LLM call with tools, per-conversation memory, and a second classification pass.",
    responsibility:
      "Built the Spring Boot (Java 21, Spring AI) service end to end: webhook parsing, a virtual-thread pipeline off the request thread, a tool-calling reply model backed by per-conversation chat memory, and a secondary LLM pass that classifies intent, urgency, and whether a human needs to step in.",
    decision:
      "Kept the webhook handler's only job as fast acknowledgement, moving the LLM calls, business-API tool calls and Telegram escalation onto a virtual-thread executor — so WhatsApp's retry behaviour never doubles up on a slow reply.",
    stack: [
      "Java 21",
      "Spring Boot",
      "Spring AI",
      "Virtual Threads",
      "WhatsApp Cloud API",
      "Telegram API",
    ],
    status: { label: "Active development", tone: "active" },
    links: [{ label: "Repository", href: "https://github.com/sivapunithan/Reply-Mate" }],
    flow: [
      { label: "WhatsApp webhook", detail: "Acknowledged in milliseconds" },
      { label: "Virtual-thread pipeline", detail: "Off the request thread" },
      { label: "Reply model", detail: "Tool calls + chat memory" },
      { label: "Classifier", detail: "Intent and urgency" },
      { label: "WhatsApp reply", detail: "Always sent" },
      { label: "Telegram alert", detail: "Only when a human is needed" },
    ],
    confidential: false,
  },
  {
    slug: "seatsync-ticket-booking-platform",
    title: "SeatSync",
    tagline: "Multi-platform ticket booking that can't sell a seat twice",
    category: "Multi-platform booking system",
    summary:
      "A seat-based booking platform spanning a Spring Boot backend, a Next.js web app and a React Native mobile app, built around one shared Event model for movies, drama, concerts and workshops.",
    problem:
      "Two people can select the same seat for the same show within milliseconds of each other, and seat availability has to be tracked per show rather than per physical seat, so booking one show never blocks an unrelated show in the same hall.",
    responsibility:
      "Designed the booking domain — the Seat / ShowSeat separation and a show-seat status machine (available, locked, booked, blocked) — plus the Spring Boot REST API, JWT auth, and ticket issuance (PDF + QR) behind it.",
    decision:
      "Used pessimistic locking on the show-seat row during the seat-hold step rather than relying on optimistic version checks alone, since the cost of a false double-booking outweighs the cost of a short lock wait.",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Next.js", "React Native", "JWT"],
    status: { label: "In development", tone: "building" },
    links: [
      { label: "Repository", href: "https://github.com/sivapunithan/Ticket-booking-application" },
    ],
    flow: [
      { label: "Web and mobile clients", detail: "Next.js · React Native" },
      { label: "Spring Boot API", detail: "JWT-secured REST" },
      { label: "Seat hold", detail: "Pessimistic lock on ShowSeat" },
      { label: "Booking", detail: "Mock payment, then confirmed" },
      { label: "Ticket", detail: "PDF + QR issued" },
    ],
    confidential: false,
  },
  {
    slug: "digital-wallet-ledger",
    title: "Digital Wallet Ledger",
    tagline: "A wallet whose balance can always explain itself",
    category: "Transactional backend",
    summary:
      "A Spring Boot wallet and ledger service built around double-entry accounting — every transfer and reversal is a balanced pair of entries, never a mutated balance field.",
    problem:
      "A wallet balance stored as a single mutable number can't prove how it got there, and concurrent transfers against the same account can race past a naive read-then-write update.",
    responsibility:
      "Built the double-entry ledger schema with Flyway migrations, the transfer and reversal flows, and a script that fires concurrent transfer requests at the same account to exercise the locking under race conditions.",
    decision:
      "Made transfers idempotent at the API boundary so a retried request — from a timeout or a client retry — can never post the same transfer twice, instead of relying on the client to avoid duplicate calls.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Flyway", "Docker Compose"],
    status: { label: "In development", tone: "building" },
    links: [
      { label: "Repository", href: "https://github.com/sivapunithan/digital-wallet-ledger" },
    ],
    flow: [
      { label: "Transfer request", detail: "Carries an idempotency key" },
      { label: "Transfer service", detail: "Skips a repeated key" },
      { label: "Ledger entries", detail: "Balanced debit + credit" },
      { label: "PostgreSQL", detail: "Flyway-managed schema" },
    ],
    confidential: false,
  },
];

export const architectureContent: ArchitectureContent = {
  section: {
    index: "02",
    label: "How I think about it",
    heading: "If you can't trace a request end to end, *you don't understand the system yet.*",
    body: "The interface shows what's allowed; the API validates the request; the service layer owns the transition; persistence protects the result; every integration is a boundary that can fail. That's the whole mental model.",
  },
  flow: [
    { label: "Next.js interface", detail: "Role-aware action and state" },
    { label: "Spring Boot API", detail: "Validation and contract" },
    { label: "Service / domain", detail: "Workflow transition" },
    { label: "Oracle SQL or MySQL", detail: "Transactional state" },
    { label: "Integration boundary", detail: "External dependency" },
  ],
  concernLabel: "The thing I keep checking",
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
    title: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "REST APIs", "JPA / Hibernate"],
  },
  {
    index: "02",
    title: "Data",
    items: ["Oracle SQL", "MySQL", "Transaction handling", "SQL optimisation"],
  },
  {
    index: "03",
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "API integration"],
  },
  {
    index: "04",
    title: "Engineering",
    items: ["Git", "Maven", "Docker", "Debugging", "Concurrency control"],
  },
  {
    index: "05",
    title: "Tools",
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
    summary:
      "Contributing to enterprise business applications using Java, Spring Boot, Oracle SQL, Next.js and TypeScript.",
    techTags: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Oracle SQL",
      "Next.js",
      "TypeScript",
      "ServiceNow REST APIs",
    ],
    modules: [
      {
        title: "Approval workflow engineering",
        description:
          "Contributed to multi-stage approval behaviour, business validations and role-based workflow transitions across procurement-style and delegation-of-authority rules.",
        stack: ["Spring Boot", "REST APIs", "Spring Security"],
      },
      {
        title: "External system integration",
        description:
          "Synchronised application state with a third-party service-management platform, treating the integration boundary as failure-aware rather than assuming every call succeeds.",
        stack: ["RestTemplate", "ServiceNow REST APIs", "JPA"],
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
    score: "8.35",
    scoreLabel: "CGPA out of 10",
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
  heading: "Email's the fastest way *to reach me.*",
  body: "Open to roles and conversations around Java, Spring Boot, REST APIs and production-facing backend work.",
  email: "punithansiva987@gmail.com",
  footerPrompt: "Got a workflow that keeps getting “complicated”?",
  footerAction: "Let's *talk.*",
};
