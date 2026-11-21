import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Blobs } from "@/components/ui/Blobs";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { GrowthChart } from "@/components/visuals/GrowthChart";
import { ScreenshotGallery } from "./ScreenshotGallery";

export function OriginStory() {
  const o = site.origin;
  const stats = o.stats.filter((s) => s.enabled);

  return (
    <section id={o.id} aria-labelledby={`${o.id}-title`} className="cv-auto relative isolate overflow-hidden section-y">
      <Blobs variant="origin" />
      <div className="container-page">
        <Reveal as="header" className="flex max-w-[760px] flex-col gap-5">
          <RevealItem>
            <Pill>{o.eyebrow}</Pill>
          </RevealItem>
          <RevealItem>
            <h2 id={`${o.id}-title`} className="text-h2">
              {o.title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-[640px] text-[18px] leading-relaxed text-body">{o.copy}</p>
          </RevealItem>
        </Reveal>

        <Reveal as="ul" className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6 md:mt-20">
          {stats.map((s) => (
            <RevealItem as="li" key={s.label} className="border-t border-line-strong pt-6">
              <StatCounter
                value={s.value}
                decimals={"decimals" in s ? s.decimals : 0}
                suffix={s.suffix}
                className="text-stat text-gradient block"
              />
              <span className="mt-3 block text-[16px] text-body">{s.label}</span>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-16 md:mt-20">
          <RevealItem>
            <GrowthChart />
          </RevealItem>
        </Reveal>

        <ScreenshotGallery />

        <p className="mt-10">
          <a
            href={o.link.href}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-[16px] font-medium text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:decoration-ink"
          >
            {o.link.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
