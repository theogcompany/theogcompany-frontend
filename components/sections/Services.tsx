import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icons";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { MicroVisual, type MicroVisualKey } from "@/components/visuals/BentoMicroVisuals";
import { cn } from "@/lib/cn";

export function Services() {
  const s = site.services;
  return (
    <Section id={s.id} eyebrow={s.eyebrow} title={s.title} sub={s.sub}>
      <Reveal as="ul" className="mt-14 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {s.cards.map((c) => (
          <RevealItem as="li" key={c.key} className={cn("flex", c.span)}>
            <article className="glass flex w-full flex-col gap-6 rounded-[24px] p-7 transition-shadow duration-300 hover:shadow-float md:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-line-strong bg-white text-ink">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-1 text-[16px] text-body">{c.outcome}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[15px] leading-snug text-ink/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.25} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-1 flex-col justify-center rounded-2xl border border-line bg-bg/70 p-4">
                <MicroVisual kind={c.visual as MicroVisualKey} />
              </div>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
