import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export function FAQ() {
  const f = site.faq;
  return (
    <Section id={f.id} eyebrow={f.eyebrow} title={f.title}>
      <Reveal className="mx-auto mt-12 max-w-[860px] md:mt-14">
        <RevealItem>
          <Accordion items={f.items} />
        </RevealItem>
      </Reveal>
    </Section>
  );
}
