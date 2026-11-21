"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { cn } from "@/lib/cn";

/** Mobile-only: appears once the hero CTA scrolls away, hides over the final CTA. */
export function MobileStickyCTA() {
  const [heroGone, setHeroGone] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const final = document.getElementById("final-cta");
    if (!hero || !final) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0);
          if (e.target === final) setFinalVisible(e.isIntersecting);
        }
      },
      { threshold: 0 },
    );
    io.observe(hero);
    io.observe(final);
    return () => io.disconnect();
  }, []);

  const show = heroGone && !finalVisible;

  return (
    <div
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-[var(--surface)] px-4 pt-3 backdrop-blur-xl transition-[transform,opacity] duration-300 md:hidden",
        "pb-[max(12px,env(safe-area-inset-bottom))]",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <BookCallButton size="md" fullWidth />
    </div>
  );
}
