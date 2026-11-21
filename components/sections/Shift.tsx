import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { ShiftToggle } from "./ShiftToggle";

export function Shift() {
  const s = site.shift;
  return (
    <Section id={s.id} eyebrow={s.eyebrow} title={s.title}>
      <Reveal as="ul" className="mt-14 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        {s.stats.map((st) => (
          <RevealItem as="li" key={st.label}>
            <Card className="flex h-full flex-col p-7 md:p-8">
              <span className="text-[56px] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums md:text-[64px]">
                {st.value}
              </span>
              <span className="mt-4 text-[17px] leading-snug text-ink/80">{st.label}</span>
              <span className="mt-auto pt-6 text-[12px] text-subtle">{st.source}</span>
            </Card>
          </RevealItem>
        ))}
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-[720px]">
        <RevealItem>
          <ShiftToggle />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
