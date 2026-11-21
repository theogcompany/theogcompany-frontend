import { site } from "@/content/site";
import { Blobs } from "@/components/ui/Blobs";
import { Pill } from "@/components/ui/Pill";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { AIChatDemo } from "@/components/visuals/AIChatDemo";
import { cn } from "@/lib/cn";

/** Positions for the floating engine pills around the chat window (desktop). */
const PILL_POS = [
  "left-[-6%] top-[14%]",
  "right-[-7%] top-[8%]",
  "left-[-9%] top-[58%]",
  "right-[-5%] top-[52%]",
  "left-[38%] bottom-[-5%]",
];

export function Hero() {
  const h = site.hero;
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-24 pt-32 md:pb-32 md:pt-44">
      <Blobs variant="hero" />
      {/* Fine grid fade for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,#000_30%,transparent_80%)]"
      />

      <div className="container-page flex flex-col items-center text-center">
        <Pill className="hero-in">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-accent" aria-hidden="true" />
          {h.eyebrow}
        </Pill>

        <h1 id="hero-title" className="text-display mt-7 max-w-[900px]">
          {h.title}
        </h1>

        <p className="hero-in mt-6 max-w-[620px] text-[18px] leading-relaxed text-body md:text-[20px]" style={{ animationDelay: "80ms" }}>
          {h.sub}
        </p>

        <div id="hero-cta" className="hero-in mt-9 flex flex-col items-center gap-3" style={{ animationDelay: "160ms" }}>
          <BookCallButton size="lg" />
          <p className="text-[13px] text-body">{site.booking.heroMicrocopy}</p>
        </div>

        <div className="hero-in relative mt-16 w-full max-w-[760px] md:mt-20" style={{ animationDelay: "240ms" }}>
          <ul aria-label="AI engines we optimise for" className="mb-6 flex flex-wrap justify-center gap-2 lg:mb-0 lg:block">
            {h.engines.map((e, i) => (
              <li
                key={e}
                className={cn("lg:absolute lg:z-10", PILL_POS[i % PILL_POS.length])}
              >
                <span
                  className="float-y glass inline-flex rounded-full px-3.5 py-1.5 text-[13px] font-medium text-ink"
                  style={{ animationDelay: `${i * -1.3}s`, animationDuration: `${6 + (i % 3)}s` }}
                >
                  {e}
                </span>
              </li>
            ))}
          </ul>
          <AIChatDemo />
        </div>

        <p className="mt-12 text-[14px] text-subtle md:text-[15px]">
          {h.trust.prefix} <strong className="font-semibold text-ink">{h.trust.brand}</strong>
          {h.trust.stats.map((s) => (
            <span key={s}>
              <span className="mx-2 text-muted" aria-hidden="true">
                ·
              </span>
              {s}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
