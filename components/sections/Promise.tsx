import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icons";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export function OurPromise() {
  const p = site.promise;
  return (
    <Section id={p.id} eyebrow={p.eyebrow} title={p.title} className="lg:!pt-24">
      <Reveal as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {p.items.map((it) => (
          <RevealItem as="li" key={it.title} className="glass flex flex-col gap-3 rounded-[24px] p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-white text-ink">
              <Icon name={it.icon} className="h-[18px] w-[18px]" />
            </span>
            <h3 className="mt-1 text-[17px] font-semibold tracking-[-0.01em]">{it.title}</h3>
            <p className="text-[15px] leading-relaxed text-body">{it.text}</p>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
