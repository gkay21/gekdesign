export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  author: {
    name: string;
    role: string;
  };
  content: {
    sectionHeading: string;
    body: string[];
  }[];
}

export const ARTICLES: Article[] = [
  {
    id: 'restraint-in-digital-luxury',
    slug: 'restraint-in-digital-luxury',
    title: 'The Architecture of Restraint: Why Minimal Websites Convert High-Value Buyers',
    category: 'Design Philosophy',
    readTime: '5 min read',
    date: 'September 2026',
    summary: 'Why excessive decoration, animated clutter, and aggressive popups destroy high-ticket consumer trust, and how intentional whitespace commands commercial authority.',
    author: {
      name: 'George El-Khoury',
      role: 'Founder & Principal Engineer'
    },
    content: [
      {
        sectionHeading: 'The Noise Trap of Modern Web Design',
        body: [
          'In an era where generative tools make it effortless to generate infinite gradients, floating 3D widgets, and badge clutter, the rarest currency in digital design is intentional restraint.',
          'When an affluent client or B2B enterprise decision-maker visits a website, they subconsciously assess credibility within 200 milliseconds. Interfaces crowded with unsolicited popups, vibrating badges, and endless generic stock graphics signal desperation rather than category leadership.',
          'True luxury and high-value B2B platforms operate on the opposite principle: serene clarity, confident typography, and generous whitespace that lets the value proposition breathe.'
        ]
      },
      {
        sectionHeading: 'The Three Pillars of High-Performing Minimalism',
        body: [
          '1. Uncompromising Typographic Discipline: Pairing no more than two deliberate typefaces with strict scale math and balanced line length.',
          '2. Sub-second Latency: A minimalist aesthetic backed by bloat-free React code and optimized assets ensures instant response times, directly driving conversion.',
          '3. Single Focal Anchor: Designing each viewport so the eye is never confused about the single most critical action.'
        ]
      }
    ]
  },
  {
    id: 'modern-headless-commerce',
    slug: 'modern-headless-commerce',
    title: 'Headless Commerce Without the Bloat: Lessons from $50M+ Flagship Launches',
    category: 'Engineering',
    readTime: '7 min read',
    date: 'August 2026',
    summary: 'Technical blueprints for building modern e-commerce storefronts that combine editorial art direction with sub-second page loads and frictionless checkout.',
    author: {
      name: 'George El-Khoury',
      role: 'Founder & Principal Engineer'
    },
    content: [
      {
        sectionHeading: 'The False Dichotomy of Brand vs Performance',
        body: [
          'For years, brands were forced to choose between rigid template stores that loaded quickly but looked identical to everyone else, or custom creative agencies that built gorgeous sites that took eight seconds to load on mobile.',
          'By leveraging modern React 19 server components, edge routing, and headless commerce engines, we eliminate this tradeoff entirely.',
          'Our recent build for Mini Minds Early Learning Centre scores a perfect 100/100 in every Lighthouse category, on both mobile and desktop.'
        ]
      },
      {
        sectionHeading: 'Tactical Engineering Takeaways',
        body: [
          '• Zero third-party script bloat on first paint; defer non-critical analytics.',
          '• Image asset optimization with modern WebP/AVIF formats and responsive picture elements.',
          '• Optimistic UI updates on cart additions to eliminate transactional latency.'
        ]
      }
    ]
  },
  {
    id: 'design-systems-that-scale',
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Actually Ship: Avoiding the Documentation Graveyard',
    category: 'Product Strategy',
    readTime: '6 min read',
    date: 'July 2026',
    summary: 'How to structure design tokens and modular UI components so engineering and design remain tightly aligned as companies scale beyond Series B.',
    author: {
      name: 'George El-Khoury',
      role: 'Founder & Principal Engineer'
    },
    content: [
      {
        sectionHeading: 'The Token-First Architecture',
        body: [
          'A design system is not a 200-page Figma file; it is the living contract between design intent and production code.',
          'When tokens for spacing, typography, and color are synchronized directly into Tailwind or CSS custom properties, designers and developers speak the exact same language.',
          'This drastically accelerates feature velocity while preventing visual entropy from degrading the brand over time.'
        ]
      }
    ]
  }
];
