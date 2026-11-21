import { site } from "@/content/site";
import { Blobs } from "@/components/ui/Blobs";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { BookCallButton } from "@/components/booking/BookCallButton";

export function FinalCTA() {
  const f = site.finalCta;
  return (
    <section id="book" aria-labelledby="book-title" className="pb-24 pt-8 md:pb-32">
      <div className="container-page">
        <div id="final-cta" className="relative isolate overflow-hidden rounded-[32px] border border-white/70 bg-white/40 px-6 py-20 text-center shadow-float md:px-12 md:py-28">
          <Blobs variant="cta" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.22] [background:var(--gradient)]"
          />
          <Reveal className="mx-auto flex max-w-[760px] flex-col items-center gap-6">
            <RevealItem>
              <h2 id="book-title" className="text-h2">
                {f.title}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="max-w-[560px] text-[18px] leading-relaxed text-ink/75">{f.sub}</p>
            </RevealItem>
            <RevealItem className="mt-3 flex flex-col items-center gap-3">
              <BookCallButton size="lg" />
              <p className="text-[13px] text-ink/70">{site.booking.finalMicrocopy}</p>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
