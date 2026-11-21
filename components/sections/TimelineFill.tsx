"use client";

import { useEffect, useRef } from "react";

/**
 * Gradient track that fills as the user scrolls through the timeline.
 * Vertical on mobile, horizontal on desktop. Writes a CSS variable via rAF
 * (no React re-renders). Full under reduced motion.
 */
export function TimelineFill() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = ref.current;
    const host = track?.parentElement;
    if (!track || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.setProperty("--p", "1");
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the list top hits 75% of the viewport, 1 when its bottom reaches 55%.
      const start = vh * 0.75;
      const end = vh * 0.55;
      const total = r.height + (start - end);
      const p = Math.min(1, Math.max(0, (start - r.top) / total));
      track.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ ["--p" as string]: 0 }}
      className="absolute bottom-6 left-[19px] top-6 w-px bg-line-strong lg:bottom-auto lg:left-0 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto"
    >
      <div className="h-full w-full origin-top scale-y-[var(--p)] bg-gradient-accent transition-transform duration-150 ease-out lg:hidden" />
      <div className="hidden h-full w-full origin-left scale-x-[var(--p)] bg-gradient-accent transition-transform duration-150 ease-out lg:block" />
    </div>
  );
}
