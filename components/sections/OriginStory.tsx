"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { site } from "@/content/site";
import { Blobs } from "@/components/ui/Blobs";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { GrowthChart } from "@/components/visuals/GrowthChart";

type Shot = (typeof site.origin.screenshots)[number];

function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  useEffect(() => {
    if (!shot) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.getElementById("lightbox-close")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [shot, onClose]);

  if (!shot) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.caption}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
    >
      <button
        id="lightbox-close"
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <figure className="max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1200}
          height={800}
          className="h-auto max-h-[80vh] w-auto rounded-2xl shadow-float"
        />
        <figcaption className="mt-3 text-center text-[14px] text-white/90">{shot.caption}</figcaption>
      </figure>
    </div>
  );
}

export function OriginStory() {
  const o = site.origin;
  const [active, setActive] = useState<Shot | null>(null);
  const close = useCallback(() => setActive(null), []);
  const stats = o.stats.filter((s) => s.enabled);

  return (
    <section id={o.id} aria-labelledby={`${o.id}-title`} className="relative isolate overflow-hidden section-y">
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

        <Reveal as="ul" className="mt-6 grid gap-5 md:grid-cols-3">
          {o.screenshots.map((shot) => (
            <RevealItem as="li" key={shot.src}>
              <button
                type="button"
                onClick={() => setActive(shot)}
                aria-label={`Enlarge: ${shot.caption}`}
                className="group block w-full rounded-[20px] text-left"
              >
                <BrowserFrame className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.02] motion-reduce:group-hover:transform-none">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={800}
                    loading="lazy"
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="block h-auto w-full"
                  />
                </BrowserFrame>
              </button>
              <p className="mt-3 text-[14px] text-subtle">{shot.caption}</p>
            </RevealItem>
          ))}
        </Reveal>

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
      <Lightbox shot={active} onClose={close} />
    </section>
  );
}
