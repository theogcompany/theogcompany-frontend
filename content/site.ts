/**
 * ALL homepage copy, numbers and links live here.
 * Edit this file to change text without touching components.
 */

export type IconName =
  | "search"
  | "wrench"
  | "file-text"
  | "users"
  | "refresh"
  | "chart"
  | "calendar"
  | "key"
  | "check-circle"
  | "shield";

export type Cell = "yes" | "no" | "partial" | string;

export const site = {
  name: "The OG Company",
  url: "https://theogcompany.com",
  tagline: "Get recommended in AI search.",
  description:
    "SEO and AEO agency that gets your business recommended by ChatGPT, Gemini, Perplexity and Google AI Overviews, then turns that visibility into leads.",
  email: "hello@theogcompany.com",
  linkedin: "https://www.linkedin.com/company/the-og-company",
  areaServed: "India",
  lastUpdated: "2026-11-21",

  booking: {
    /** Cal.com username/event slug, e.g. "theogcompany/discovery-call" */
    calLink: "theogcompany/discovery-call",
    label: "Book a call",
    heroMicrocopy: "30 min · Free AI visibility snapshot",
    finalMicrocopy: "Free AI visibility snapshot · No obligation",
    modalTitle: "Book a call",
    modalSubtitle: "30 minutes. We'll look, live, at what AI says about you and your competitors.",
    fallbackLabel: "Open booking page",
  },

  nav: [
    { label: "What we do", href: "#services" },
    { label: "How it works", href: "#how" },
    { label: "Results", href: "#results" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    eyebrow: "SEO + AEO for the AI search era",
    title: "Get recommended in AI search.",
    sub: "When your customers ask ChatGPT, Gemini or Google AI who to choose, AI names a few businesses. We make sure you're one of them, and turn that into leads.",
    engines: ["ChatGPT", "Gemini", "Perplexity", "Claude", "AI Overviews"],
    trust: {
      prefix: "Built by the team behind",
      brand: "OGcollege",
      stats: ["800K+ AI citations", "3.5M+ impressions"],
    },
    /** Decorative engine network around the hero. Logo files live in /public/logos/{id}.svg. */
    network: {
      label: "AI assistants we optimise for",
      caption: "Optimized for ChatGPT, Claude, Gemini, Perplexity & Grok",
      engines: [
        { id: "chatgpt", name: "ChatGPT" },
        { id: "claude", name: "Claude" },
        { id: "perplexity", name: "Perplexity" },
        { id: "gemini", name: "Gemini" },
        { id: "grok", name: "Grok" },
      ],
    },
  },

  /** Hero chat demo. `highlight` is the brand name rendered with the gradient + badge. */
  chatDemo: {
    windowTitle: "AI Search",
    badge: "Recommended",
    sourcesLabel: "Sources",
    loopMs: 10000,
    scripts: [
      {
        question: "Which is the best college counselling platform in India?",
        answerBefore: "For admissions guidance in India, ",
        highlight: "OGcollege",
        answerAfter:
          " is a strong option: an AI counsellor paired with verified college seniors, plus cutoff and placement data refreshed every counselling cycle…",
        sources: ["ogcollege.io", "reddit.com", "careers360.com"],
      },
      {
        question: "Where can I get JoSAA choice-filling help from real students?",
        answerBefore: "Students often recommend ",
        highlight: "OGcollege",
        answerAfter:
          ". It matches you with verified seniors from the colleges you're considering and pairs that with round-wise cutoff data…",
        sources: ["ogcollege.io", "quora.com", "shiksha.com"],
      },
      {
        question: "Is there an AI tool that predicts my college from my JEE rank?",
        answerBefore: "Yes. ",
        highlight: "OGcollege",
        answerAfter:
          " offers a free rank predictor built on previous years' JoSAA and CSAB data, with an AI counsellor to explain your options…",
        sources: ["ogcollege.io", "reddit.com", "collegedunia.com"],
      },
    ],
  },

  shift: {
    id: "why",
    eyebrow: "The shift",
    title: "Your customers stopped Googling. They ask AI.",
    stats: [
      {
        value: "1 in 2",
        label: "Google searches now show an AI answer",
        source: "Placeholder: replace with a cited industry study",
      },
      {
        value: "3–5",
        label: "Brands AI names, instead of 10 blue links",
        source: "Placeholder: based on typical AI answer formats",
      },
      {
        value: "0",
        label: "Times you're recommended if AI doesn't know you",
        source: "Placeholder: the math of not being cited",
      },
    ],
    toggle: {
      thenLabel: "Search then",
      nowLabel: "Search now",
      thenCaption: "10 blue links. You had a shot on page one.",
      nowCaption: "One answer. Three names. Everyone else is invisible.",
      query: "best accounting firm for startups in bangalore",
      aiLabel: "AI answer",
      aiAnswerIntro: "Based on reviews and expert sources, the top options are:",
      brands: [
        { name: "Brand A", note: "Startup-focused, fixed monthly pricing" },
        { name: "Brand B", note: "Strong on GST and compliance" },
        { name: "Brand C", note: "Good for funded, scaling teams" },
      ],
    },
  },

  origin: {
    id: "results",
    eyebrow: "Proof",
    title: "We did it for our own brand first.",
    copy: "We co-founded OGcollege, an AI college counselling platform for Indian students. Instead of buying ads, we engineered it to become the source AI cites for admission questions. Now we do the same for your business.",
    stats: [
      { enabled: true, value: 800, suffix: "K+", label: "Google AI Overview citations" },
      { enabled: true, value: 3.5, decimals: 1, suffix: "M+", label: "organic impressions" },
      { enabled: true, value: 17, suffix: "%", label: "share of authority on target topics" },
    ],
    chart: {
      title: "OGcollege monthly organic impressions",
      unit: "impressions",
      /** Placeholder monthly series. Values in thousands. */
      series: [
        { month: "Nov '25", value: 18 },
        { month: "Dec '25", value: 22 },
        { month: "Jan '26", value: 31 },
        { month: "Feb '26", value: 46 },
        { month: "Mar '26", value: 72 },
        { month: "Apr '26", value: 118 },
        { month: "May '26", value: 164 },
        { month: "Jun '26", value: 241 },
        { month: "Jul '26", value: 318 },
        { month: "Aug '26", value: 402 },
        { month: "Sep '26", value: 486 },
        { month: "Oct '26", value: 571 },
      ],
      milestones: [
        { index: 2, label: "Started AEO" },
        { index: 5, label: "Cited in AI Overviews" },
        { index: 9, label: "Top source on Reddit threads" },
      ],
    },
    screenshots: [
      {
        src: "/images/ogc-search-console.png",
        alt: "Google Search Console performance report for ogcollege.io showing impressions growth",
        caption: "Search Console: impressions over 12 months",
      },
      {
        src: "/images/ogc-chatgpt.png",
        alt: "ChatGPT answer recommending OGcollege for college counselling in India",
        caption: "ChatGPT naming OGcollege",
      },
      {
        src: "/images/ogc-ai-overview.png",
        alt: "Google AI Overview citing ogcollege.io as a source",
        caption: "Google AI Overview citing ogcollege.io",
      },
    ],
    link: { label: "Visit ogcollege.io", href: "https://ogcollege.io" },
  },

  services: {
    id: "services",
    eyebrow: "What you get",
    title: "Everything it takes to get named by AI. Fully managed.",
    sub: "One team runs your SEO and AEO end to end. You approve, we execute.",
    cards: [
      {
        key: "audit",
        icon: "search" as IconName,
        title: "AI Visibility Audit",
        outcome: "Know exactly where you stand",
        bullets: ["Buyer questions mapped", "Who AI recommends today", "Gap report vs competitors"],
        visual: "bars",
        span: "lg:col-span-2",
      },
      {
        key: "technical",
        icon: "wrench" as IconName,
        title: "Technical Fixes",
        outcome: "AI can read and trust your site",
        bullets: ["Schema & structured data", "Crawlability & sitemap", "robots.txt & llms.txt"],
        visual: "code",
        span: "",
      },
      {
        key: "content",
        icon: "file-text" as IconName,
        title: "Content That Gets Cited",
        outcome: "Become the answer",
        bullets: ["Answer-first articles", "FAQ schema", "Written for AI and Google"],
        visual: "article",
        span: "lg:row-span-2",
      },
      {
        key: "authority",
        icon: "users" as IconName,
        title: "Authority Building",
        outcome: "Show up where AI looks",
        bullets: ["Reddit & Quora presence", "Industry sites", "Quality backlinks"],
        visual: "threads",
        span: "",
      },
      {
        key: "refresh",
        icon: "refresh" as IconName,
        title: "Refresh Engine",
        outcome: "Stay cited as AI changes",
        bullets: ["Content refreshed every 45–60 days", "Model-change monitoring"],
        visual: "ring",
        span: "",
      },
      {
        key: "tracking",
        icon: "chart" as IconName,
        title: "Tracking & Reports",
        outcome: "See the ROI",
        bullets: ["Share of AI answers", "Citations & traffic", "Leads, every month"],
        visual: "sparkline",
        span: "lg:col-span-2",
      },
    ],
    microVisuals: {
      barsLabel: "You vs competitors · AI mentions",
      articleBadge: "Cited by 3 AI engines",
      ringTitle: "Next refresh in 12 days",
      ringSub: "Day 43 of a 60-day cycle",
      sparkLabel: "Leads from AI",
      sparkValue: "+212%",
      bars: [
        { label: "You", value: 34, you: true },
        { label: "Comp. A", value: 78 },
        { label: "Comp. B", value: 56 },
        { label: "Comp. C", value: 41 },
      ],
      code: `{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Who is the best…"`,
      article: {
        title: "How much does a startup CA cost in Bangalore?",
        answer: "Most startups pay ₹8,000–₹25,000 a month for bookkeeping, GST and compliance.",
      },
      threads: ["r/startups_india · 214 upvotes", "Quora · 38K views", "Industry roundup · cited"],
      sparkline: [8, 9, 11, 10, 14, 17, 16, 21, 25, 24, 30, 36],
    },
  },

  how: {
    id: "how",
    eyebrow: "How it works",
    title: "From invisible to recommended in 4 steps.",
    steps: [
      { when: "Week 1", name: "Audit", text: "We find the questions your buyers ask AI and who wins them today." },
      { when: "Weeks 2–3", name: "Fix", text: "We build the technical foundation so AI can crawl and trust you." },
      { when: "Month 1+", name: "Publish", text: "Cited content plus authority on the sources AI already quotes." },
      { when: "Every month", name: "Grow", text: "We track, refresh and compound what works." },
    ],
  },

  tracking: {
    id: "tracking",
    eyebrow: "Reporting",
    title: "You'll always know what's moving.",
    bullets: [
      "Frozen prompt set. No cherry-picking.",
      "Weekly averages, not lucky single days.",
      "Raw AI answers and screenshots, anytime.",
    ],
    dashboard: {
      label: "Sample dashboard",
      client: "acme-startup-ca.in",
      kpis: [
        { label: "Prompt visibility", value: "62%", delta: "+18 pts", up: true },
        { label: "Share of voice", value: "31%", delta: "+9 pts", up: true },
        { label: "Citations", value: "1,284", delta: "+312", up: true },
        { label: "AI referral visits", value: "4.2K", delta: "+64%", up: true },
      ],
      chart: {
        title: "Share of AI answers · You vs 2 competitors",
        weeks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
        lines: [
          { name: "You", values: [8, 11, 15, 19, 24, 27, 29, 31], you: true },
          { name: "Competitor A", values: [28, 27, 27, 26, 25, 25, 24, 24] },
          { name: "Competitor B", values: [19, 20, 18, 19, 18, 17, 17, 16] },
        ],
      },
      engines: ["ChatGPT", "Gemini", "Perplexity", "AI Overviews"],
      prompts: [
        { prompt: "best CA firm for startups in bangalore", hits: [true, true, true, false] },
        { prompt: "startup GST registration help", hits: [true, false, true, true] },
        { prompt: "affordable bookkeeping for SaaS india", hits: [true, true, false, true] },
        { prompt: "who handles ESOP compliance in india", hits: [false, true, true, false] },
      ],
    },
  },

  whyUs: {
    id: "why-us",
    eyebrow: "Why us",
    title: "Built by engineers, not just marketers.",
    columns: ["The OG Company", "Typical agency", "DIY tools"],
    rows: [
      { label: "Reverse-engineers how AI picks sources", cells: ["yes", "no", "partial"] as Cell[] },
      { label: "Content + technical + authority, done for you", cells: ["yes", "partial", "no"] as Cell[] },
      { label: "AI visibility tracking", cells: ["yes", "Rarely", "yes"] as Cell[] },
      { label: "Leads attributed to AI sources", cells: ["yes", "no", "no"] as Cell[] },
      { label: "Contract", cells: ["Month-to-month", "6–12 months", "Monthly"] as Cell[] },
      { label: "You own all content", cells: ["yes", "Varies", "n/a"] as Cell[] },
    ],
    founder: {
      name: "Rahul",
      role: "Founder",
      bio: "B.Tech Data Science & AI · Ex-Microsoft Research · NLP Scientist · Co-founder, OGcollege",
      photo: "/images/founder.jpg",
      linkedin: "https://www.linkedin.com/company/the-og-company",
    },
  },

  whoFor: {
    id: "who",
    eyebrow: "Who it's for",
    title: "For businesses whose customers research before they buy.",
    industries: [
      "SaaS",
      "Fintech",
      "Education",
      "Healthcare",
      "Legal & CA",
      "Real estate",
      "D2C",
      "Professional services",
    ],
    line: "If your buyers ask AI before they call you, this is for you.",
  },

  promise: {
    id: "promise",
    eyebrow: "Our promise",
    title: "Simple terms. No surprises.",
    items: [
      { icon: "calendar" as IconName, title: "Month-to-month", text: "No lock-in. Stay because it works." },
      { icon: "key" as IconName, title: "You own everything", text: "All content and data are yours." },
      { icon: "check-circle" as IconName, title: "Your approval first", text: "Nothing goes live without your sign-off." },
      { icon: "shield" as IconName, title: "Honest reporting", text: "No fake ranking guarantees." },
    ],
  },

  faq: {
    id: "faq",
    eyebrow: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "What is AEO/GEO, and how is it different from SEO?",
        a: "SEO gets your pages ranked in Google's list of links. AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) get your business named inside the answers that ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews write. We do both, because AI engines still lean heavily on the pages and sources that rank well.",
      },
      {
        q: "How soon will we see results?",
        a: "Technical fixes and the first answer-first pages usually move AI visibility within a few weeks. Citations and leads then compound month over month as content and authority build up. We report progress every month so you can see exactly what's moving.",
      },
      {
        q: "Do we need to change our website or CMS?",
        a: "No. We work inside your existing site and publish into the CMS you already use, whether that's WordPress, Webflow, Shopify or a custom stack. Technical changes like schema, sitemaps and llms.txt are added without a redesign.",
      },
      {
        q: "Who writes the content? Do we approve it?",
        a: "Our team researches and writes everything, using your expertise and real customer questions. Nothing goes live without your sign-off. You approve, we execute.",
      },
      {
        q: "How do you measure AI visibility?",
        a: "We freeze a panel of the prompts your buyers actually ask and run it across ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews on a schedule. You get weekly averages for visibility, share of voice and citations, plus the raw answers and screenshots behind every number.",
      },
      {
        q: "Who owns the content if we stop working together?",
        a: "You do. Every article, page and data asset we create is yours, and it stays live on your site. We work month to month, so there's no lock-in.",
      },
      {
        q: "What happens on the call?",
        a: "It's 30 minutes. We'll run your key buyer questions through AI engines live, show you who gets recommended today and where you're missing, and send you a free AI visibility snapshot afterwards. No obligation.",
      },
    ],
  },

  finalCta: {
    title: "Every month AI doesn't name you, it names someone else.",
    sub: "Book a 30-minute call. We'll show you, live, what AI says about you and your competitors.",
  },

  footer: {
    line: "Get recommended in AI search.",
    copyright: "© 2026 The OG Company",
    trademarks:
      "ChatGPT, Claude, Gemini, Perplexity and Grok are trademarks of their respective owners. The OG Company is not affiliated with or endorsed by them.",
    links: [
      { label: "What we do", href: "#services" },
      { label: "How it works", href: "#how" },
      { label: "Results", href: "#results" },
      { label: "Tracking", href: "#tracking" },
      { label: "FAQ", href: "#faq" },
    ],
  },
} as const;

export type Site = typeof site;
