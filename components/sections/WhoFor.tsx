import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export function WhoFor() {
  const w = site.whoFor;
  const n = w.industries.length;
  return (
    <Section id={w.id} eyebrow={w.eyebrow} title={w.title} className="lg:!pb-20">
      <Reveal className="mt-12 flex flex-col items-center gap-10">
        <RevealItem as="ul" className="flex max-w-[860px] flex-wrap justify-center gap-3">
          {w.industries.map((ind, i) => (
            <li
              key={ind}
              className="pill-seq rounded-full border border-line-strong bg-white/50 px-5 py-2.5 text-[15px] font-medium text-ink/80"
              style={{ ["--i" as string]: i, ["--n" as string]: n }}
            >
              {ind}
            </li>
          ))}
        </RevealItem>
        <RevealItem>
          <p className="text-center text-[18px] text-ink">{w.line}</p>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
