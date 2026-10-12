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
    readTime: '3 min read',
    date: 'September 2026',
    summary: 'High-value buyers judge a website in an instant and then research it carefully. Here is why restraint (fewer elements, clear proof and one obvious next step) earns their trust, and how we apply it.',
    author: {
      name: 'George El-Khoury',
      role: 'Founder & Principal Engineer'
    },
    content: [
      {
        sectionHeading: 'The Noise Trap of Modern Web Design',
        body: [
          'It has never been easier to add things to a website. Gradients, floating 3D objects, autoplaying video, chat widgets, newsletter popups and trust badges can all be dropped in within an afternoon, and many sites end up wearing all of them at once.',
          'First impressions form quickly. A widely cited 2006 study from Carleton University found that people form a reliable impression of a web page’s visual appeal in about 50 milliseconds, long before they have read a word. A crowded screen makes that first impression for you, and it rarely says “category leader”.',
          'For a buyer about to commit serious money, whether that is a five-figure renovation, a private medical procedure or a B2B contract, clutter reads as risk. Every popup that asks for an email address before the visitor has seen any proof is a small signal that the business needs them more than they need the business.'
        ]
      },
      {
        sectionHeading: 'How High-Value Buyers Actually Decide',
        body: [
          'Expensive decisions are rarely made in one visit. Buyers come back several times, compare a shortlist, send the link to a partner or a colleague, and look for reasons to say no. A website for these buyers has three jobs: show credible proof, answer the hard questions plainly, and make the next step obvious.',
          'Restraint serves all three. When there is less on the page, the proof you do show (real work, real names, specific outcomes) gets the attention it deserves. Plain answers about price ranges, timelines and process do more for trust than any badge. And when each screen has one clear action, nobody has to hunt for it.',
          'Whitespace is not empty space. It is what tells the reader which three things on the page matter.'
        ]
      },
      {
        sectionHeading: 'The Three Pillars of High-Performing Minimalism',
        body: [
          '1. Typographic discipline. Use no more than two typefaces, a consistent type scale and comfortable line lengths. Most of a premium feel comes from type that is set carefully, not from decoration.',
          '2. Speed. A minimal design that loads slowly is not minimal, it is just sparse. Restraint applies to code as much as to visuals: fewer scripts, properly sized images and self-hosted fonts. After a dedicated performance pass this year, the Mini Minds Early Learning Centre site we built scores 100 in all four Lighthouse categories, on both mobile and desktop.',
          '3. A single focal anchor. Every screen should make one action obvious. On the Fairfield Dental Care site, that action is booking: Book Now and click-to-call buttons sit in the header and in a dedicated mobile toolbar, so booking is always one tap away.'
        ]
      },
      {
        sectionHeading: 'Restraint Is Editing, Not Emptiness',
        body: [
          'Minimal does not mean bland, and it does not mean removing content buyers need. A treatment page should still explain the treatment, and a services page should still say how an engagement works. Restraint is the discipline of deciding what each page is for and cutting everything that does not serve it.',
          'A useful test before launch: for every element on a page, ask what would be lost if it were removed. If the honest answer is “nothing”, remove it.',
          '• Remove popups that interrupt before the visitor has seen any value.',
          '• Replace generic stock imagery with real work, real people and real places.',
          '• Keep one primary call to action per screen, and make it look like one.',
          '• Test page weight and load time on a mid-range phone, not on a studio monitor.'
        ]
      }
    ]
  },
  {
    id: 'modern-headless-commerce',
    slug: 'modern-headless-commerce',
    title: 'Headless Commerce Without the Bloat: Lessons from $50M+ Flagship Launches',
    category: 'Engineering',
    readTime: '4 min read',
    date: 'August 2026',
    summary: 'Going headless lets a store look like nobody else’s, but it is easy to end up slower than the template you replaced. What a server-rendered shop rebuild taught us about keeping custom storefronts fast.',
    author: {
      name: 'George El-Khoury',
      role: 'Founder & Principal Engineer'
    },
    content: [
      {
        sectionHeading: 'The False Dichotomy of Brand vs Performance',
        body: [
          'For years, online stores had to choose between template themes that load quickly but look like everyone else’s, and fully custom builds that look distinctive but are heavy on mobile.',
          'Headless commerce promises a way out. The storefront becomes a separate front end, built with a framework like Next.js, that talks to the commerce platform, product data and content management system through APIs. You get complete design freedom without giving up a proven checkout and inventory back end.',
          'But headless is an architecture, not a performance guarantee. A badly built headless store can ship far more JavaScript than the theme it replaced, fetch its data in the browser and leave shoppers looking at loading spinners. The freedom that makes headless attractive is the same freedom that lets bloat in.'
        ]
      },
      {
        sectionHeading: 'What the Vodafone Shop Rebuild Taught Me',
        body: [
          'In 2020, while working as a senior engineer at Kablamo, I was part of the team that rebuilt Vodafone Australia’s online shop: plans, the phone range, individual device pages, cart and checkout. The old shop was an Angular site. The new one was a server-rendered Next.js and React application, running alongside the new content platform Vodafone was moving its website onto. It launched in December 2020 and stayed in production until it was replaced in 2023.',
          'Three lessons from that project still shape how we build storefronts.',
          'Render the pages that sell on the server. Plan and device pages arrived as complete HTML, so shoppers saw products and prices straight away instead of waiting for the browser to assemble them. The new pages loaded in under a second, much faster than the site they replaced.',
          'Give the shop a front end of its own. The shop ran alongside the content platform rather than inside it, which meant the buying journey could be built and tuned on its own terms.',
          'Treat the whole journey as one product. Plans, devices, cart and checkout were built as one journey, so the experience did not change character halfway through a purchase. Shoppers do not care where one system ends and another begins.'
        ]
      },
      {
        sectionHeading: 'Where the Bloat Creeps In',
        body: [
          'Most slow headless stores are not slow because of the framework. They get slow one reasonable-sounding addition at a time.',
          '• Third-party tags. Analytics, heatmaps, chat, reviews, personalisation and A/B testing scripts all compete with the product page for the browser’s attention.',
          '• Client-side data fetching. If product data is fetched in the browser after the page loads, the shopper sees an empty layout first.',
          '• Interactivity everywhere. Most of a product page is static content. Only the parts people interact with, such as variant pickers, add to cart and the cart drawer, need JavaScript.',
          '• Oversized images. Product photography is usually the heaviest thing on the page, and it is often sent to a phone at the same size as to a 4K monitor.'
        ]
      },
      {
        sectionHeading: 'Tactical Engineering Takeaways',
        body: [
          '• Pre-render or server-render product, category and plan pages, so prices and stock are in the first response.',
          '• Keep third-party scripts off the critical path, load non-essential tags after the page is interactive, and review the list regularly.',
          '• Serve images as AVIF and WebP in responsive picture elements, sized for the device.',
          '• Use optimistic UI for cart actions: update the cart immediately and confirm with the server in the background, so adding to cart feels instant.',
          '• Set a performance budget for page weight, JavaScript size and load time on a mid-range phone, and check it on every release, not only at launch.'
        ]
      },
      {
        sectionHeading: 'Do You Need Headless at All?',
        body: [
          'Headless is the right call when a brand needs a storefront that genuinely cannot be built within a theme, or when the shop has to integrate with systems a theme cannot reach. For many smaller stores, a well-built theme on a hosted platform will be faster to launch, cheaper to run and quick enough.',
          'The honest answer depends on what the store needs to do, and part of our job is to say so before anyone writes code.'
        ]
      }
    ]
  },
  {
    id: 'design-systems-that-scale',
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Actually Ship: Avoiding the Documentation Graveyard',
    category: 'Product Strategy',
    readTime: '3 min read',
    date: 'July 2026',
    summary: 'Most design systems die as a documentation site nobody updates. Keeping tokens and components in production code, with the code as the single source of truth, is what keeps design and engineering aligned as a team grows.',
    author: {
      name: 'George El-Khoury',
      role: 'Founder & Principal Engineer'
    },
    content: [
      {
        sectionHeading: 'How Design Systems End Up in the Graveyard',
        body: [
          'Many design systems start the same way: a big Figma library, a documentation site and a launch announcement. Six months later the Figma file says one thing, the production code says another, and the documentation site describes a version of the product that no longer exists.',
          'The problem is rarely effort. It is that the system lives somewhere other than the product. Every change has to be made twice, once in design and once in code, and the documentation is a third copy that nobody is responsible for. Copies drift, and once people notice the drift they stop trusting the system and start working around it.',
          'A design system that ships is not a 200-page Figma file. It is the living contract between design intent and production code, and the only way to keep a contract honest is to keep one copy of it.'
        ]
      },
      {
        sectionHeading: 'The Token-First Architecture',
        body: [
          'Design tokens are the named decisions underneath everything else: colours, type scale, spacing, corner radii, shadows and motion timings. Define them once, in code, and have everything else read from them.',
          'With Tailwind CSS v4, tokens can be declared as CSS custom properties in a single @theme block, and every utility class and component picks them up from there. With plain CSS, custom properties on the root element do the same job.',
          'When designers and developers use the same names, such as accent, surface and display, there is no translation step between a design file and a pull request. Changing a brand colour becomes a one-line change, not a search through hundreds of files.',
          'Name tokens by purpose, not by value. A token called surface still makes sense after a rebrand. A token called grey-900 does not.'
        ]
      },
      {
        sectionHeading: 'Components Are the Documentation',
        body: [
          'Tokens keep the details consistent. Components keep the patterns consistent: buttons, form fields, cards, dialogs and navigation, each built once with accessibility and edge cases handled, and reused everywhere.',
          'The most reliable documentation for a component is the component itself: typed props that say what it accepts, sensible defaults, and live examples rendered from the real production code rather than screenshots. Documentation generated from the code cannot fall out of date.',
          'Build components in the product, for a real screen that needs them, and extract them once a second or third screen needs the same thing. Components designed in isolation for hypothetical future use tend to be either too rigid or too flexible to be useful.'
        ]
      },
      {
        sectionHeading: 'Shared Components Make Big Changes Possible',
        body: [
          'The payoff shows up during large changes. From 2020 to 2021, while at Kablamo, I worked on Jira’s issue and board views as they moved from a legacy monolith to a new React and Redux front end, migrating features one by one without breaking what customers relied on.',
          'Migrations like that depend on shared building blocks and conventions that every team can rely on. Without them, each migrated feature rebuilds the same pieces slightly differently, and the new codebase starts collecting the inconsistency the migration was meant to remove.'
        ]
      },
      {
        sectionHeading: 'Keeping the System Alive',
        body: [
          '• Make the right thing the easy thing. If using a token is quicker than typing a hex value, people will use the token.',
          '• Enforce with tooling, not reminders. Lint rules, type checks and visual regression tests catch drift in code review rather than months later.',
          '• Give the system an owner, even part-time. Someone has to decide what gets added, what gets deprecated and when.',
          '• Deprecate in the open. Mark old components as deprecated, point to the replacement, and remove them on a published schedule.',
          '• Start small. A handful of tokens and five well-built components used everywhere beat a hundred components used nowhere.'
        ]
      }
    ]
  }
];
