"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function WhoFor() {
  const w = site.whoFor;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % w.industries.length), 1400);
    return () => window.clearInterval(id);
  }, [reduce, w.industries.length]);

  return (
    <Section id={w.id} eyebrow={w.eyebrow} title={w.title}>
      <Reveal className="mt-12 flex flex-col items-center gap-10">
        <RevealItem as="ul" className="flex max-w-[860px] flex-wrap justify-center gap-3">
          {w.industries.map((ind, i) => (
            <li
              key={ind}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[15px] font-medium transition-[background-color,border-color,color,box-shadow] duration-700",
                active === i
                  ? "border-ink/15 bg-white text-ink shadow-card"
                  : "border-line-strong bg-white/50 text-body",
              )}
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
