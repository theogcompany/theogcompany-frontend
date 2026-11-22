"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/*
 * Decorative engine network around the hero (desktop only, ≥1024px).
 * This wrapper ships almost no JS: the network chunk is fetched only on wide
 * screens, after the page has loaded and gone idle, so it never touches LCP/TBT
 * and never loads on phones. It is absolutely positioned, so mounting it late
 * causes no layout shift.
 */
const Network = dynamic(() => import("./AIEngineNetworkCanvas").then((m) => m.AIEngineNetworkCanvas), {
  ssr: false,
});

const QUERY = "(min-width: 1024px)";

export function AIEngineNetwork() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    let ready = false;
    let cancelled = false;
    const update = () => setShow(ready && mq.matches);
    const go = () => {
      const fire = () => {
        if (cancelled) return;
        ready = true;
        update();
      };
      if (w.requestIdleCallback) w.requestIdleCallback(fire, { timeout: 2000 });
      else window.setTimeout(fire, 400);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    mq.addEventListener("change", update);
    return () => {
      cancelled = true;
      window.removeEventListener("load", go);
      mq.removeEventListener("change", update);
    };
  }, []);

  return show ? <Network /> : null;
}
