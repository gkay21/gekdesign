import type { Picture } from "vite-imagetools";
// Real site screenshots: Fairfield composited onto the monitor in project_fairfield_dental_care_1790327371933.jpg;
// Mini Minds as overlapping full-page captures in the style of the Studio Aeterna image.
import fairfieldDentalHero from "../assets/images/project_fairfield_dental_care_office.jpg?responsive";
import miniMindsHero from "../assets/images/project_miniminds_stacked.jpg?responsive";
// Unibet: live unibet.com.au screenshot composited onto the glass display from the original Chronos image.
import unibetHero from "../assets/images/project_unibet_glass.jpg?responsive";
// Stan: live stan.com.au screenshot composited onto Unsplash jLn20MzqfdE (Petri R, Unsplash License).
import stanHero from "../assets/images/project_stan_desk.jpg?responsive";
// Vodafone: archived Feb 2021 vodafone.com.au/mobile-phones (Wayback Machine) on Unsplash gVpXbCGG6jI (Unsplash License).
import vodafoneHero from "../assets/images/project_vodafone_desk.jpg?responsive";
// Jira: Atlassian's public Ecosystem Jira issue view (people blurred) in the app-window scene from the Strata image.
import jiraHero from "../assets/images/project_jira_window.jpg?responsive";

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  industry: string;
  category: "E-commerce" | "SaaS & Platforms" | "Healthcare & Services";
  services: string[];
  shortOutcome: string;
  /** Text shown on listing cards in place of the first metric, when a number would undersell the project. */
  cardHighlight?: string;
  /** Case study section headings, written per project (no generic filler). */
  challengeHeading: string;
  approachHeading: string;
  /** Short status shown in the preview frame, e.g. "Live" or "Launched 2020 · Replaced 2023". */
  status: string;
  /** Actual technologies used, shown in the preview frame. */
  stack: string[];
  heroImage: Picture;
  featured: boolean;
  accentColor: string;
  liveUrl?: string;
  /** Uptime SLA shown in the case study preview frame: GEK Design's own guarantee, or a product's published SLA (e.g. Atlassian Cloud). Label says whose it is. */
  uptimeSla?: {
    label: string;
    detail: string;
  };
  metrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  challenge: string;
  approach: string;
  designSystem: {
    fontDisplay: string;
    fontBody: string;
    palette: { name: string; hex: string }[];
    designNotes: string;
  };
  deliverables: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "fairfield-dental-care",
    slug: "fairfield-dental-care",
    title: "Fairfield Dental Care Website",
    client: "Fairfield Dental Care",
    year: "2024",
    industry: "Healthcare & Dentistry",
    category: "Healthcare & Services",
    services: [
      "Web Design",
      "Front-End Development",
      "Content Architecture",
      "Technical SEO",
      "Ongoing Support",
    ],
    shortOutcome:
      "A fast, static practice website with 12 treatment guides, a patient education blog, and one-tap booking and calling on every page",
    cardHighlight: "Design, Build & Care",
    challengeHeading:
      "A long-standing family practice, explained clearly online.",
    approachHeading:
      "A fast static site, built to be booked from and easy to keep updated.",
    status: "Live · Maintained by GEK Design",
    stack: [
      "Next.js (static export)",
      "React",
      "SCSS",
      "Markdown content",
      "AWS Lambda & SES",
    ],
    heroImage: fairfieldDentalHero,
    featured: true,
    accentColor: "#01133B",
    liveUrl: "https://fairfielddentalcare.com.au",
    uptimeSla: {
      label: "99.99% SLA · GEK Design",
      detail: "99.99% uptime SLA guaranteed by GEK Design",
    },
    metrics: [
      {
        label: "Treatment Guides",
        value: "12",
        subtext: "Dedicated pages from check-ups to implants and emergencies",
      },
      {
        label: "Patient Articles",
        value: "17",
        subtext: "Markdown-powered oral health blog",
      },
      {
        label: "Ongoing Partnership",
        value: "3 yrs",
        subtext: "Built in 2023, maintained and extended through 2026",
      },
    ],
    challenge:
      "Fairfield Dental Care is a family practice on Harris Street in Fairfield, NSW, led by Principal Dentist Dr James El-Khoury and caring for local families since 1942. The practice needed a website that reflects that heritage, explains a broad range of treatments in plain language — from general and children’s dentistry to implants, wisdom teeth surgery and anti-wrinkle injections — and makes it effortless for patients to call or send an enquiry, especially on mobile. It also had to stay easy to update as services, team members and articles change.",
    approach:
      "We built the site with Next.js as a fully static export, so every page is pre-rendered and served without a runtime server. Treatment pages, blog posts, FAQs, technology and payment information live in Markdown files, which keeps content updates simple and reviewable. Images are converted to responsive WebP with blur-up placeholders at build time, and a sitemap is generated automatically. Enquiries go through a validated contact form (including Australian phone number checks) to GEK Design’s shared mailer service on AWS Lambda and Amazon SES, with instant on-page feedback. Book Now and click-to-call buttons sit in the header and a dedicated mobile toolbar, linking straight to the practice’s existing Centaur (Dental4Windows) online booking portal and phone line, so booking is always one tap away. We continue to maintain the site, most recently adding a refreshed payment options page, updated team and service content, and the phone-first contact flow.",
    designSystem: {
      fontDisplay: "Outfit",
      fontBody: "Outfit",
      palette: [
        { name: "Practice Navy", hex: "#01133B" },
        { name: "Logo Blue", hex: "#2274BA" },
        { name: "Stone Grey", hex: "#8C9091" },
        { name: "Clean White", hex: "#FFFFFF" },
      ],
      designNotes:
        "A calm navy-and-white palette with a single geometric sans (Outfit) for headings and body, real photography of the team and practice, subtle scroll animations, and booking and calling kept one tap away on every page.",
    },
    deliverables: [
      "Responsive Website Design & Build (Next.js Static Export)",
      "12 Treatment Pages & Patient FAQs",
      "Patient Education Blog (17 Articles)",
      "Team, Technology & Payment Options Pages",
      "Validated Enquiry Form via Shared SES Mailer",
      "Book Now & Click-to-Call Header and Mobile Toolbar",
      "Optimised WebP Images, Sitemap & Analytics",
      "Ongoing Updates & Maintenance",
    ],
  },
  {
    id: "mini-minds-early-learning",
    slug: "mini-minds-early-learning",
    title: "Mini Minds Early Learning Centre Website",
    client: "Mini Minds Early Learning Centre",
    year: "2026",
    industry: "Early Childhood Education",
    category: "Healthcare & Services",
    services: [
      "Web Design",
      "Front-End Development",
      "Performance Optimisation",
      "Local SEO",
      "Accessibility",
    ],
    shortOutcome:
      "A warm, pre-rendered website for a West Hoxton childcare centre that walks parents from programs to a booked tour",
    challengeHeading: "Turning parents’ questions into booked tours.",
    approachHeading:
      "A playful single-page site, then a dedicated performance pass.",
    status: "Live · Maintained by GEK Design",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Vercel"],
    heroImage: miniMindsHero,
    featured: true,
    accentColor: "#38BDF8",
    liveUrl: "https://minimindselc.com.au",
    uptimeSla: {
      label: "99.99% SLA · GEK Design",
      detail: "99.99% uptime SLA guaranteed by GEK Design",
    },
    metrics: [
      {
        label: "Lighthouse",
        value: "100/100",
        subtext:
          "Performance, accessibility, best practices and SEO on mobile and desktop (PageSpeed Insights, September 2026)",
      },
      {
        label: "Local Suburbs",
        value: "7",
        subtext:
          "Covered by ChildCare structured data and suburb-specific FAQs",
      },
      {
        label: "Age Programs",
        value: "3",
        subtext: "Nursery, toddler and preschool, from 6 weeks to 5 years",
      },
    ],
    challenge:
      "Mini Minds is a long day care centre at 1 Watts Place, West Hoxton NSW, caring for children from 6 weeks to 5 years, Monday to Friday, 7am to 6pm. The centre needed a website that feels as warm and playful as the centre itself, answers the questions parents actually ask — which program suits my child, what does a day look like, how does enrolment work — and turns that interest into tour bookings. It also had to be found by families searching across the surrounding South West Sydney suburbs.",
    approach:
      "We designed and built a single-page site in React, Vite and Tailwind CSS, with anchor-linked sections for the centre’s story, philosophy, age-based programs, daily routine, gallery, reviews, a three-step enrolment guide, FAQs and contact. Book a Tour calls to action run through the page, and the enquiry form validates Australian phone numbers before sending to GEK Design’s shared mailer service on AWS Lambda and Amazon SES. After launch we ran a dedicated performance and accessibility pass: the page is now pre-rendered at build time so content appears before JavaScript loads, fonts are self-hosted and preloaded, below-the-fold sections and animations are code-split, images were converted and right-sized (the hero image is skipped entirely on mobile), and colour contrast, form labels and heading order were fixed. A further optimisation pass in September 2026 took the site to a perfect 100 in all four Lighthouse categories, on both mobile and desktop. For local search, ChildCare structured data lists the address, opening hours and the seven suburbs the centre serves, and the FAQ answers the suburb-specific questions families search for.",
    designSystem: {
      fontDisplay: "Fredoka",
      fontBody: "Nunito",
      palette: [
        { name: "Sky Blue", hex: "#38BDF8" },
        { name: "Sunshine Yellow", hex: "#FFD166" },
        { name: "Coral", hex: "#FF7F50" },
        { name: "Mint", hex: "#6EE7B7" },
        { name: "Cream", hex: "#FFFDF7" },
        { name: "Dark Slate", hex: "#2D3748" },
      ],
      designNotes:
        "A playful but calm system: rounded Fredoka headings, soft organic blob shapes and cloud motifs, a floating pill navigation, and a bright sky-blue, sunshine and coral palette on cream — anchored by a deep blue hero and real photography of the centre’s educators.",
    },
    deliverables: [
      "Single-Page Website Design & Build (React + Vite)",
      "Nursery, Toddler & Preschool Program Sections",
      "Daily Routine Timeline & Photo Gallery",
      "Tour Enquiry Form via Shared SES Mailer",
      "Three-Step Enrolment Guide & Local FAQ",
      "Build-Time Pre-rendering & Performance Pass",
      "ChildCare & FAQ Structured Data",
      "Accessibility Fixes (Contrast, Labels, Heading Order)",
    ],
  },
  {
    id: "fdj-united-unibet",
    slug: "fdj-united-unibet",
    title: "Unibet Platform Performance",
    client: "FDJ United (Unibet)",
    year: "2025–2026",
    industry: "Online Sports Betting & Gaming",
    category: "SaaS & Platforms",
    services: [
      "Performance Engineering",
      "Reliability Engineering",
      "Back-End Engineering",
      "Front-End & iOS Performance",
      "AI Tooling (MCP)",
    ],
    shortOutcome:
      "More than 10× faster bet placement and 8× faster bet settlement across every Unibet market",
    challengeHeading:
      "Speed and reliability across a multi-market betting platform.",
    approachHeading:
      "A company-wide performance task force, from front end to infrastructure.",
    status: "Live · Principal Engineer, July 2025 – October 2026",
    stack: [
      "TypeScript / Node.js",
      ".NET",
      "Kafka",
      "PostgreSQL",
      "Kubernetes",
      "MCP",
    ],
    heroImage: unibetHero,
    featured: true,
    accentColor: "#147B45",
    liveUrl: "https://www.unibet.com",
    uptimeSla: {
      label: "99.99% SLA · GEK Design",
      detail: "99.99% uptime SLA guaranteed by GEK Design",
    },
    metrics: [
      {
        label: "Bet Placement Performance",
        value: "10×+",
        subtext: "More than an order of magnitude faster",
      },
      {
        label: "Bet Settlement Performance",
        value: "8×",
        subtext: "Eight times faster settlement once results are in",
      },
      {
        label: "Unibet Markets",
        value: "All",
        subtext: "Platform-wide, across every market where Unibet is offered",
      },
    ],
    challenge:
      "Unibet is FDJ United’s online sports betting and gaming brand, offered across multiple international markets on a shared, distributed, event-driven platform. Its customer journeys, from placing a bet to settling it, run through TypeScript services, internal .NET APIs, Kafka messaging and PostgreSQL, and reach customers through the web and iOS apps. FDJ United set up a company-wide performance task force to find and fix the performance and reliability issues across those production systems.",
    approach:
      "From July 2025 to October 2026, GEK Design’s founder worked on that task force as a Principal Engineer, across the whole Unibet domain. On the back end, that meant optimising the TypeScript services and PostgreSQL databases behind customer-facing journeys, improving Kafka messaging performance and reliability between internal services, and investigating and optimising internal .NET APIs and how they integrate with the TypeScript services and apps. On the client side, it meant TypeScript front-end performance and fixing iOS app reliability issues across key customer journeys, all on the Kubernetes infrastructure underneath. The headline results were bet placement more than ten times faster and bet settlement eight times faster, platform-wide across every Unibet market. The role also included building AI tooling with the Model Context Protocol (MCP) as part of FDJ United’s AI implementation, and helping shape its company-wide AI adoption, including the technical guardrails for using it safely and reliably.",
    designSystem: {
      fontDisplay: "Unibet Pro",
      fontBody: "Roboto",
      palette: [
        { name: "Unibet Green", hex: "#147B45" },
        { name: "Deep Green", hex: "#00531D" },
        { name: "Unibet Yellow", hex: "#FFE71F" },
        { name: "Ink", hex: "#111111" },
        { name: "Light Grey", hex: "#EEEEEE" },
      ],
      designNotes:
        "This role was performance and reliability engineering rather than visual design. Unibet’s existing brand system is shown for reference: Unibet Pro headings, Roboto body text, and the signature green and yellow.",
    },
    deliverables: [
      "Company-Wide Performance Task Force",
      "Bet Placement Optimisation (10×+)",
      "Bet Settlement Optimisation (8×)",
      "TypeScript Service & PostgreSQL Optimisation",
      "Kafka Messaging Performance & Reliability",
      ".NET API Optimisation & Integration",
      "Front-End Performance & iOS Reliability",
      "AI Tooling with MCP & Adoption Guardrails",
    ],
  },
  {
    id: "stan-live-video",
    slug: "stan-live-video",
    title: "Stan Live Sport & Video Automation",
    client: "Stan",
    year: "2024",
    industry: "Streaming & Entertainment",
    category: "SaaS & Platforms",
    services: [
      "Technical Leadership",
      "Go Engineering",
      "Video Workflow Automation",
      "Data Modelling",
      "Performance Optimisation",
    ],
    shortOutcome:
      "Technical leadership and Go automation for Stan’s live sport and video workflows, through the Paris 2024 Olympics",
    challengeHeading: "Keeping live sport and video operations moving.",
    approachHeading:
      "Hands-on technical leadership while the Video Lead was on leave.",
    status: "Live · Role April – November 2024",
    stack: ["Go", "PostgreSQL", "Slack automation", "Cloud media storage"],
    heroImage: stanHero,
    featured: true,
    accentColor: "#0072FB",
    liveUrl: "https://www.stan.com.au",
    uptimeSla: {
      label: "99.99% SLA · GEK Design",
      detail: "99.99% uptime SLA guaranteed by GEK Design",
    },
    metrics: [
      {
        label: "Video Lead Cover",
        value: "8 mo",
        subtext:
          "Technical leadership of video operations, April to November 2024",
      },
      {
        label: "Paris Olympics",
        value: "2024",
        subtext:
          "Medal-event data and live-to-VOD workflows for Olympic coverage",
      },
      {
        label: "Services Improved",
        value: "5",
        subtext: "Go services, team tooling and the sports data model",
      },
    ],
    challenge:
      "Stan is one of Australia’s leading streaming services, with live sport alongside its on-demand library. Live sport creates a constant operational load. Fixtures and sessions have to become scheduled programs and live jobs, live streams have to become on-demand titles, and stored media has to be managed and cleaned up. When Stan’s Video Lead went on parental leave in 2024, the team needed someone to keep video operations running and keep improving the automation behind them, through the Paris 2024 Olympics.",
    approach:
      "GEK Design’s founder stepped in as Stan’s Video Lead from April to November 2024, leading the video team while working hands-on in Go and PostgreSQL. On the data side, we extended the sports data model with versioned schemas, idempotent data crawls, competition and team structures and medal events for Olympic coverage, then cleaned out unused tables once the Games were over. For live-to-VOD, we added scheduled Slack reminders that clear once the team confirms, made title and download-link handling more robust, and let screeners be created from several assets at once. We also moved manual fixtures and sessions onto a more reliable integration feeding the live automation pipeline, and made the media deletion service configurable per storage bucket. Alongside this sat day-to-day ownership of encoding, playback and cross-device performance.",
    designSystem: {
      fontDisplay: "Garet",
      fontBody: "Garet",
      palette: [
        { name: "Stan Blue", hex: "#0072FB" },
        { name: "Near Black", hex: "#070707" },
        { name: "White", hex: "#FFFFFF" },
      ],
      designNotes:
        "This role was engineering leadership rather than visual design. Stan’s existing brand system is shown for reference: Garet type, a near-black canvas and the signature Stan blue.",
    },
    deliverables: [
      "Video Lead Cover (April – November 2024)",
      "Sports Data Model: Versioned Schemas & Medal Events",
      "Live-to-VOD Slack Workflow Automation",
      "Multi-Asset Screener Creation",
      "Fixture & Session Automation Integration",
      "Configurable Media Deletion Service",
      "Encoding, Playback & Cross-Device Performance",
    ],
  },
  {
    id: "vodafone-shop",
    slug: "vodafone-shop",
    title: "Vodafone Online Shop Rebuild",
    client: "Vodafone Australia",
    year: "2020",
    industry: "Telecommunications",
    category: "E-commerce",
    services: [
      "Front-End Engineering",
      "Next.js & React",
      "E-commerce",
      "Performance Optimisation",
    ],
    shortOutcome:
      "A rebuilt Next.js shop for plans, phones, cart and checkout, with page loads under one second",
    challengeHeading:
      "A slow legacy shop standing between customers and a new plan.",
    approachHeading:
      "A rebuilt Next.js shop front end, fast from the first page.",
    status: "Launched December 2020 · Replaced in 2023",
    stack: ["Next.js", "React", "styled-components", "Node.js custom server"],
    heroImage: vodafoneHero,
    featured: true,
    accentColor: "#E60000",
    liveUrl: "https://www.vodafone.com.au",
    uptimeSla: {
      label: "99.99% SLA · GEK Design",
      detail: "99.99% uptime SLA guaranteed by GEK Design",
    },
    metrics: [
      {
        label: "Page Load Time",
        value: "<1s",
        subtext: "Much faster than the Angular site it replaced",
      },
      {
        label: "Shop Flows",
        value: "4",
        subtext: "Plans, phones, cart and checkout",
      },
      {
        label: "In Production",
        value: "2+ yrs",
        subtext: "Launched December 2020, served the shop until 2023",
      },
    ],
    challenge:
      "Vodafone Australia’s online shop ran on an older Angular site, and buying a plan or a phone online was slower than it needed to be. As the business moved its website onto a new content platform, the shop — the pages that actually sell plans and phones — needed a modern, fast front end of its own.",
    approach:
      "Working as a senior engineer at Kablamo, GEK Design’s founder was part of the team that built Vodafone Australia’s new Next.js shop pages, covering the full buying journey: plans, the phone range and individual device pages, cart and checkout. The shop was a server-rendered Next.js and React application styled with styled-components, running alongside Vodafone’s new content platform. Pages loaded in under a second, much faster than the Angular site they replaced. The shop launched in December 2020 and stayed in production until it was replaced in 2023.",
    designSystem: {
      fontDisplay: "Vodafone Regular Bold",
      fontBody: "Vodafone Light & Regular",
      palette: [
        { name: "Vodafone Red", hex: "#E60000" },
        { name: "Charcoal", hex: "#333333" },
        { name: "Anthracite", hex: "#4A4D4E" },
        { name: "Light Grey", hex: "#F4F4F4" },
      ],
      designNotes:
        "Built to Vodafone’s existing brand system: Vodafone typefaces, the signature red used sparingly for calls to action and pricing, and calm greys that keep the focus on plans and devices.",
    },
    deliverables: [
      "Next.js Shop Front End (Server-Rendered)",
      "Mobile Plans Pages",
      "Phone Range & Device Pages",
      "Cart & Checkout",
      "styled-components UI",
      "Sub-Second Page Loads",
    ],
  },
  {
    id: "atlassian-jira",
    slug: "atlassian-jira",
    title: "Jira Issue & Board View Migration",
    client: "Atlassian (Jira)",
    year: "2020–2021",
    industry: "Software & Developer Tools",
    category: "SaaS & Platforms",
    services: [
      "Front-End Engineering",
      "React & Redux",
      "Server-Side Rendering",
      "Legacy Migration",
      "Reliability & SLAs",
    ],
    shortOutcome:
      "Migrating Jira’s issue and board views from the legacy monolith to a React and Redux front end with server-side rendering",
    challengeHeading: "Moving Jira’s core views off a legacy monolith.",
    approachHeading:
      "Feature-by-feature migration to a server-rendered React app.",
    status: "Shipped 2020 – 2021 via Kablamo",
    stack: ["React", "Redux", "Server-side rendering"],
    heroImage: jiraHero,
    featured: true,
    accentColor: "#1868DB",
    liveUrl: "https://www.atlassian.com/software/jira",
    uptimeSla: {
      label: "99.9% Cloud SLA",
      detail:
        "Atlassian Cloud uptime SLA for Jira: 99.9% on Premium, 99.95% on Enterprise (atlassian.com/legal/sla)",
    },
    metrics: [
      {
        label: "Core Views",
        value: "2",
        subtext: "Jira’s issue view and board view",
      },
      {
        label: "Engagement",
        value: "7 mo",
        subtext: "August 2020 to February 2021",
      },
      {
        label: "React + Redux",
        value: "SSR",
        subtext: "Single-page app with server-side rendering",
      },
    ],
    challenge:
      "Jira is Atlassian’s work-tracking product, used by teams around the world. Its issue and board views were moving off a legacy monolith onto a new React front end. Features had to be migrated without breaking what customers relied on, and the service still had to meet its SLA requirements while the migration was under way.",
    approach:
      "From August 2020 to February 2021, working as a senior engineer at Kablamo, GEK Design’s founder worked on Jira’s issue view and board view, migrating features from the monolith into the new React and Redux single-page app with server-side rendering. Alongside the feature migration, the work included supporting Jira’s SLA requirements, so the new front end could take over from the old one without compromising reliability.",
    designSystem: {
      fontDisplay: "Atlassian Sans",
      fontBody: "System UI Stack",
      palette: [
        { name: "Jira Blue", hex: "#1868DB" },
        { name: "Text", hex: "#292A2E" },
        { name: "White", hex: "#FFFFFF" },
      ],
      designNotes:
        "This work was front-end engineering within Atlassian’s existing design system, not visual design. The current Jira interface is shown for reference. Jira and Atlassian are trademarks of Atlassian.",
    },
    deliverables: [
      "Issue View Feature Migration",
      "Board View Feature Migration",
      "React & Redux Front End",
      "Server-Side Rendering",
      "SLA Requirement Support",
    ],
  },
];
