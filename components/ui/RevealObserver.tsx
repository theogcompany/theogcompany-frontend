"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __ogcRevealReady?: boolean;
  }
}

const STAGGER_MS = 80;

/** One IntersectionObserver for every [data-reveal] container on the page. */
export function RevealObserver() {
  useEffect(() => {
    window.__ogcRevealReady = true;
    const root = document.documentElement;
    const containers = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const show = (el: HTMLElement) => {
      const items = Array.from(el.querySelectorAll<HTMLElement>(".reveal-item")).filter(
        (it) => it.closest("[data-reveal]") === el,
      );
      items.forEach((it, i) => {
        it.style.transitionDelay = `${i * STAGGER_MS}ms`;
      });
      el.classList.add("is-in");
    };

    // Ambient loops (blob drift, pill float, CTA shimmer) start after load + idle.
    let ambientTimer: number | undefined;
    const startAmbient = () => {
      ambientTimer = window.setTimeout(() => {
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
          .requestIdleCallback;
        if (ric) ric(() => root.classList.add("anim-on"), { timeout: 2000 });
        else root.classList.add("anim-on");
      }, 1500);
    };
    if (document.readyState === "complete") startAmbient();
    else window.addEventListener("load", startAmbient, { once: true });

    if (!("IntersectionObserver" in window)) {
      root.classList.add("reveal-all");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          // 20% of the element in view, or a quarter of the viewport for very tall containers.
          if (e.intersectionRatio >= 0.2 || e.intersectionRect.height >= window.innerHeight * 0.25) {
            show(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: [0, 0.05, 0.1, 0.15, 0.2] },
    );
    containers.forEach((c) => io.observe(c));
    return () => {
      io.disconnect();
      window.removeEventListener("load", startAmbient);
      if (ambientTimer !== undefined) clearTimeout(ambientTimer);
    };
  }, []);

  return null;
}

/**
 * Inline (pre-paint) script: enables reveal hiding only when JS runs, with a
 * safety net that shows everything if the observer never initialises.
 */
export const revealBootScript = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__ogcRevealReady)d.classList.add('reveal-all')},3500)})();`;
