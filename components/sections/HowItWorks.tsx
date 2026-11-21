import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { TimelineFill } from "./TimelineFill";

export function HowItWorks() {
  const h = site.how;
  return (
    <Section id={h.id} eyebrow={h.eyebrow} title={h.title}>
      <div className="relative mt-16 md:mt-20">
        <TimelineFill />
        <Reveal as="ol" className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          {h.steps.map((st, i) => (
            <RevealItem as="li" key={st.name} className="relative flex gap-5 lg:flex-col lg:gap-6">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white text-[14px] font-semibold text-ink shadow-[0_1px_2px_rgba(15,23,42,0.06)] tabular-nums">
                {i + 1}
              </span>
              <div>
                <p className="text-[13px] font-medium text-subtle">{st.when}</p>
                <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{st.name}</h3>
                <p className="mt-2 max-w-[320px] text-[16px] leading-relaxed text-body">{st.text}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
