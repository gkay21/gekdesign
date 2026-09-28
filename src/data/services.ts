export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  outcomeDescription: string;
  deliverables: string[];
  technologies: string[];
  idealFor: string;
  timeline: string;
  businessImpact: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-design',
    number: '01',
    title: 'Web Design',
    tagline: 'Distinctive digital presence that commands brand authority.',
    outcomeDescription: 'We craft bespoke web experiences that translate your brand positioning into an unmistakable visual language. No stock templates or off-the-shelf components—every grid, typographical rhythm, and micro-interaction is custom-engineered to captivate decision-makers.',
    deliverables: [
      'Bespoke Visual Architecture',
      'Art Direction & Spatial Hierarchy',
      'Interactive Design Prototypes',
      'Responsive Breakpoint Systems',
      'Micro-Interactions & Motion Choreography',
      'Design Token Documentation'
    ],
    technologies: ['Figma', 'Principle', 'Cinema 4D', 'Tokens Studio', 'Spline 3D'],
    idealFor: 'Brands outgrowing generic web templates ready to establish category leadership.',
    timeline: '2 – 4 weeks',
    businessImpact: 'Elevates perceived brand equity, commands premium pricing, and reduces bounce rates.'
  },
  {
    id: 'web-development',
    number: '02',
    title: 'Web Development',
    tagline: 'Clean-code engineering built for sub-second speed and scale.',
    outcomeDescription: 'We write modern, accessible, modular TypeScript and React code with zero technical bloat. Built on resilient headless architectures and edge infrastructure that deliver 99+ Lighthouse performance scores and flawless cross-device fidelity.',
    deliverables: [
      'Next.js / Vite / React Architecture',
      'Headless CMS Implementation',
      'Fluid Motion & WebGL Shaders',
      'Edge Infrastructure & CDN Setup',
      'WCAG 2.1 AA Accessibility Compliance',
      'Technical SEO & Performance Auditing'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Motion / GSAP', 'Vite', 'Node.js', 'Sanity / Strapi'],
    idealFor: 'Teams requiring rock-solid front-end execution with high maintainability.',
    timeline: '3 – 6 weeks',
    businessImpact: 'Faster page loads directly lift organic search rankings and conversion efficiency.'
  },
  {
    id: 'brand-strategy',
    number: '03',
    title: 'Brand Strategy',
    tagline: 'Clarifying your competitive edge before writing a single line of code.',
    outcomeDescription: 'High-performing websites start with strategic clarity. We audit your competitive landscape, interview key stakeholders, and define your unique market positioning, value narrative, and customer journey touchpoints.',
    deliverables: [
      'Competitive Market Landscape Audit',
      'Core Brand Positioning Matrix',
      'Tone of Voice & Messaging Architecture',
      'Customer Journey & Funnel Mapping',
      'Editorial Style Guidelines',
      'Brand Identity Refresh / Evolution'
    ],
    technologies: ['Qualitative User Audits', 'Miro', 'Positioning Frameworks', 'Archetype Mapping'],
    idealFor: 'Companies navigating pivot points, funding rounds, or strategic re-positioning.',
    timeline: '2 – 3 weeks',
    businessImpact: 'Eliminates friction in customer acquisition and aligns internal sales and executive teams.'
  },
  {
    id: 'ui-ux-design',
    number: '04',
    title: 'UI/UX Design',
    tagline: 'Converting complex workflows into intuitive, high-velocity software.',
    outcomeDescription: 'We design digital products, SaaS dashboards, and consumer web applications that users genuinely enjoy using every day. Through rapid wireframing, behavioral testing, and structured UI systems, we reduce cognitive friction and drive customer lifetime value.',
    deliverables: [
      'User Personas & Journey Maps',
      'Information Architecture & Wireframes',
      'Complete Production Design Systems',
      'Usability Audits & User Testing',
      'High-Fidelity Interactive Prototypes',
      'Developer Handoff Specs'
    ],
    technologies: ['Figma Component Architecture', 'ProtoPie', 'Maze User Testing', 'Linear / Storybook'],
    idealFor: 'B2B SaaS, digital platforms, and web apps with multi-step user workflows.',
    timeline: '3 – 5 weeks',
    businessImpact: 'Directly lowers user onboarding churn and increases product adoption velocity.'
  },
  {
    id: 'e-commerce',
    number: '05',
    title: 'E-commerce',
    tagline: 'Seamless commerce architecture designed for frictionless transaction.',
    outcomeDescription: 'We build headless and bespoke e-commerce flagships that balance elevated visual storytelling with conversion-rate optimization. From custom product bundle configurators to one-tap checkouts, every detail is engineered to drive average order value.',
    deliverables: [
      'Headless Shopify Plus Development',
      'Custom 3D / Interactive Configurators',
      'Frictionless Checkout Funnels',
      'ERP, WMS & Logistics Integration',
      'Subscription & Recurring Order Engines',
      'Conversion Rate Optimization (CRO)'
    ],
    technologies: ['Shopify Plus', 'Hydrogen / Oxygen', 'Stripe', 'Klaviyo', 'Sanity Studio'],
    idealFor: 'Luxury, direct-to-consumer, and high-volume brands seeking higher conversion.',
    timeline: '4 – 7 weeks',
    businessImpact: 'Substantially lifts conversion rates, mobile basket sizes, and repeat purchase retention.'
  },
  {
    id: 'creative-direction',
    number: '06',
    title: 'Creative Direction',
    tagline: 'Guiding visual narrative, motion, and aesthetics across all touchpoints.',
    outcomeDescription: 'We orchestrate the entire visual universe of your digital experience. From commissioning bespoke 3D imagery and editorial typography to choreographing interactive motion systems that leave a lasting imprint on your audience.',
    deliverables: [
      'Campaign & Digital Art Direction',
      'Bespoke 3D & Spatial Asset Production',
      'Motion Choreography Guidelines',
      'Editorial Photography Curation',
      'Interactive Sound Design Concepting',
      'Brand Book & Aesthetic Governance'
    ],
    technologies: ['Blender / Cinema 4D', 'After Effects', 'Custom Shader Pipelines', 'Creative Direction Deck'],
    idealFor: 'Visionary founders and creative directors demanding cultural relevance and editorial distinction.',
    timeline: '2 – 4 weeks',
    businessImpact: 'Transforms brands from standard commodity vendors into cultural reference points.'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    name: 'Discover',
    subtitle: 'Immersion & Commercial Clarity',
    description: 'We dive deep into your business metrics, audience personas, competitors, and technical constraints. We define non-negotiable success outcomes before designing a single pixel.',
    deliverables: ['Stakeholder Workshops', 'Competitive Audit', 'Technical Architecture Plan', 'Project Roadmap']
  },
  {
    step: '02',
    name: 'Strategize',
    subtitle: 'Architecture & Positioning Narrative',
    description: 'We translate raw research into a rigorous information architecture, wireframe blueprint, and high-impact messaging hierarchy that guides visitors toward conversion.',
    deliverables: ['Information Architecture', 'Low-Fidelity Wireframes', 'Content & Copy Strategy', 'Interactive Flow Maps']
  },
  {
    step: '03',
    name: 'Design & Build',
    subtitle: 'Bespoke Art Direction & Modular Engineering',
    description: 'We bring the concept to life through bespoke art direction, responsive interactive prototypes, and production-grade TypeScript code with sub-second performance.',
    deliverables: ['High-Fidelity Visual Design', 'Production Component System', 'Interactive Motion & Micro-interactions', 'Headless CMS Integration']
  },
  {
    step: '04',
    name: 'Launch & Grow',
    subtitle: 'Rigorous QA & Commercial Scaling',
    description: 'We conduct multi-device stress testing, security validation, and SEO audits before orchestrating a zero-downtime launch, followed by proactive data analysis and continuous optimization.',
    deliverables: ['Cross-Browser & Device QA', 'Technical SEO Deployment', 'Performance Optimization (99+ score)', 'Post-Launch Analytics Review']
  }
];

export const CREDIBILITY_METRICS = [
  { value: '11+', label: 'Years of Studio Craft', subtext: 'Founded in 2015 in Sydney, Australia' },
  { value: '94+', label: 'Digital Products Launched', subtext: 'Across 14 countries globally' },
  { value: '$180M+', label: 'Client Revenue Generated', subtext: 'Directly attributed to digital redesigns' },
  { value: '14', label: 'Design Accolades', subtext: 'Awwwards SOTD, FWA, and Red Dot' }
];
