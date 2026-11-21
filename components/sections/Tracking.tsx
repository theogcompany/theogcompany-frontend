import { Check } from "lucide-react";
import { site } from "@/content/site";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { DashboardMock } from "@/components/visuals/DashboardMock";

export function Tracking() {
  const t = site.tracking;
  return (
    <section id={t.id} aria-labelledby={`${t.id}-title`} className="relative section-y">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <Reveal className="order-2 min-w-0 lg:order-1">
          <RevealItem>
            <DashboardMock />
          </RevealItem>
        </Reveal>

        <Reveal className="order-1 flex min-w-0 flex-col gap-5 lg:order-2">
          <RevealItem>
            <Pill>{t.eyebrow}</Pill>
          </RevealItem>
          <RevealItem>
            <h2 id={`${t.id}-title`} className="text-h2">
              {t.title}
            </h2>
          </RevealItem>
          <RevealItem as="ul" className="mt-3 flex flex-col gap-4">
            {t.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[18px] leading-snug text-ink/85">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
