# The OG Company: homepage

Production homepage for [theogcompany.com](https://theogcompany.com), an SEO + AEO/GEO agency.
Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react · Geist.

The whole page is pre-rendered to static HTML, so AI crawlers that don't run JavaScript still see every
heading, FAQ answer and the JSON-LD.

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site in ./out
pnpm lint
pnpm typecheck
```

No pnpm? With Node 18+ you can run `corepack enable` once, or prefix commands with `corepack` (for example `corepack pnpm build`).

## Where to edit copy

**Everything lives in [`content/site.ts`](content/site.ts):** the copy, stats, links, nav, FAQ, chart data,
dashboard numbers and the hero chat-demo scripts. Components only read from it.

| What | Key in `site.ts` |
| --- | --- |
| Hero headline, sub, engine pills, trust line | `hero` |
| Chat demo questions and answers (loops through them) | `chatDemo.scripts` |
| "The Shift" stat cards (with a `source` line) | `shift.stats` |
| OGcollege stats (toggle each with `enabled`) | `origin.stats` |
| Growth chart series and milestone labels | `origin.chart` |
| Bento services and micro-visual data | `services` |
| Sample dashboard numbers | `tracking.dashboard` |
| Comparison table and founder strip | `whyUs` |
| FAQ (also feeds the FAQPage JSON-LD) | `faq.items` |
| Email, LinkedIn, canonical URL | `email`, `linkedin`, `url` |

## Booking (Cal.com)

Set your Cal.com event in `content/site.ts`:

```ts
booking: {
  calLink: "theogcompany/discovery-call", // <username>/<event-slug>
  ...
}
```

Every "Book a call" button opens the same modal. The Cal.com embed script loads only the first time
the modal opens. If the embed fails to load or the link is wrong, the modal shows an "Open booking page ↗" link instead.
Without JavaScript, the button is a normal link to `https://cal.com/<calLink>`.

## Replace before launch

| Placeholder | Path | Notes |
| --- | --- | --- |
| Search Console screenshot | `public/images/ogc-search-console.png` | 1200×800 (3:2) |
| ChatGPT answer screenshot | `public/images/ogc-chatgpt.png` | 1200×800 (3:2) |
| Google AI Overview screenshot | `public/images/ogc-ai-overview.png` | 1200×800 (3:2) |
| Founder photo | `public/images/founder.jpg` | square, at least 320×320 |
| Open Graph image | `public/og.png` | 1200×630 |
| Cal.com link | `site.booking.calLink` | currently a placeholder (Cal returns 404) |
| "The Shift" stats + sources | `site.shift.stats` | cite real studies in `source` |
| Growth chart data | `site.origin.chart.series` | placeholder monthly impressions (thousands) |
| Sample dashboard numbers | `site.tracking.dashboard` | labelled "Sample dashboard" on the page |
| Bento micro-visual numbers | `site.services.microVisuals` | illustrative |
| Founder LinkedIn URL | `site.whyUs.founder.linkedin` | currently the company page |
| Contact email | `site.email` | `hello@theogcompany.com` |

The placeholder images were made by `scripts/generate-placeholders.ps1` (Windows PowerShell, no
dependencies). Re-run it to regenerate them, or just overwrite the files with real ones at the same sizes.

## SEO / AEO

- `app/layout.tsx`: metadata (title, description, canonical, Open Graph, Twitter) and server-rendered JSON-LD:
  `Organization`, `ProfessionalService` (with the six services as an offer catalog), `FAQPage` (from `site.faq`)
  and `WebSite`.
- `app/sitemap.ts` → `/sitemap.xml` (lastModified is stamped at build time).
- `public/robots.txt`: allows all crawlers, explicitly including GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot and Google-Extended.
- `public/llms.txt`: plain-language summary for LLMs. **Update it by hand when services or stats change.**
- `app/icon.svg`: favicon (the eye-O mark).

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, then pick the repo.
3. Build settings:
   - **Framework preset:** None (or Next.js (Static HTML Export))
   - **Build command:** `pnpm build`
   - **Build output directory:** `out`
   - **Environment variable:** `NODE_VERSION` = `20` (or newer)
4. Deploy. Then go to **Custom domains → Set up a custom domain**, add `theogcompany.com` (and `www`
   if you want it), and follow the DNS prompts.

Cloudflare serves the files compressed (Brotli or gzip) and cached at the edge. Nothing else needs configuring.

## Project structure

```
app/            layout (fonts, metadata, JSON-LD), page, globals.css (tokens), sitemap, icon
components/
  ui/           Pill, Card, Section, Reveal + RevealObserver, StatCounter, BrowserFrame,
                Accordion, Modal, Blobs, Logo, Icons
  sections/     Navbar, Hero, Shift, OriginStory, Services, HowItWorks, Tracking, WhyUs,
                WhoFor, Promise, FAQ, FinalCTA, Footer, MobileStickyCTA (+ small client islands)
  booking/      BookingProvider (context), BookingModal (Cal.com), BookCallButton
  visuals/      AIChatDemo, GrowthChart, DashboardMock, BentoMicroVisuals
content/site.ts all copy and data
public/         images, og.png, robots.txt, llms.txt
```

### Implementation notes

- **One CTA.** `BookCallButton` is the only call to action on the page. The other controls (FAQ accordion,
  search toggle, menu, screenshot lightbox) don't navigate anywhere, and nav links only scroll to sections.
- **Reveals work without JS.** Content is visible in the static HTML. Reveal hiding only switches on when
  JavaScript runs (`html.js`), and it switches back off if the observer hasn't started after 3.5 s.
- **Performance.** Below-the-fold sections use `content-visibility: auto`. The ambient loops (blob drift,
  pill float, button shimmer) start after the page has loaded and gone idle. The chat demo types straight
  into the DOM and fades words in with CSS, so React re-renders only a few times per loop.
- **Reduced motion.** Under `prefers-reduced-motion` the typewriter, counters, blobs and timeline fill
  are switched off and their final state is shown.
