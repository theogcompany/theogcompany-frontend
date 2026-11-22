"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";
import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/*
 * Desktop engine network (loaded lazily by AIEngineNetwork).
 *
 * Geometry is measured from the real hero text, so nodes always sit in the empty
 * gutters at least CLEAR px from the H1, subtext and CTA, whatever the viewport or copy.
 * Each node has one quadratic curve to the "Book a call" button. The curve's control
 * point sits directly below the node, so it drops down the gutter and only turns
 * inward below the subtext; it never crosses the headline.
 */

const R = 28; // node radius (56px circle)
const CLEAR = 80; // min distance from text blocks
const EDGE = 20; // min distance from the viewport edge
const END_GAP = 24; // curves stop this far from the button edge
const TURN_MS = 2800;
const TRAVEL_S = 1.4;
const LIT_MS = 2200;

type EngineId = (typeof site.hero.network.engines)[number]["id"];
type Side = -1 | 1;
type Box = { l: number; t: number; r: number; b: number };
type NodeGeo = { id: EngineId; name: string; logo: string; x: number; y: number; side: Side };
type Geo = { w: number; h: number; nodes: NodeGeo[]; curves: Record<string, string>; links: string[] };

/** Where each engine sits: side, vertical anchor, extra outward stagger, end-point offset at the CTA. */
const LAYOUT: Record<EngineId, { side: Side; anchor: (m: Metrics) => number; stagger: number; endDy: number }> = {
  chatgpt: { side: -1, anchor: (m) => (m.eyebrow.t + m.eyebrow.b) / 2 - 6, stagger: 36, endDy: -9 },
  claude: { side: -1, anchor: (m) => m.h1.t + (m.h1.b - m.h1.t) * 0.76, stagger: 0, endDy: 0 },
  perplexity: { side: -1, anchor: (m) => m.sub.t + (m.sub.b - m.sub.t) * 0.9, stagger: 14, endDy: 9 },
  gemini: { side: 1, anchor: (m) => m.h1.t + (m.h1.b - m.h1.t) * 0.08, stagger: 22, endDy: -5 },
  grok: { side: 1, anchor: (m) => m.sub.t + (m.sub.b - m.sub.t) * 0.3, stagger: 4, endDy: 5 },
};

type Metrics = { w: number; h: number; cx: number; eyebrow: Box; h1: Box; sub: Box; cta: Box; obstacles: Box[] };

function rel(r: DOMRect, o: DOMRect): Box {
  return { l: r.left - o.left, t: r.top - o.top, r: r.right - o.left, b: r.bottom - o.top };
}

/** Glyph boxes (one per line) so clearance follows the actual text, not the block width. */
function lineBoxes(el: Element, o: DOMRect): Box[] {
  const range = document.createRange();
  range.selectNodeContents(el);
  return Array.from(range.getClientRects())
    .filter((r) => r.width > 0)
    .map((r) => rel(r, o));
}

function measure(section: HTMLElement): Metrics | null {
  const o = section.getBoundingClientRect();
  const eyebrow = section.querySelector(".container-page > :first-child");
  const h1 = section.querySelector("#hero-title");
  const sub = h1?.nextElementSibling;
  const cta = section.querySelector("#hero-cta a");
  const micro = section.querySelector("#hero-cta p");
  if (!eyebrow || !h1 || !sub || !cta) return null;
  const ctaBox = rel(cta.getBoundingClientRect(), o);
  const obstacles = [
    ...lineBoxes(h1, o),
    ...lineBoxes(sub, o),
    ctaBox,
    ...(micro ? [rel(micro.getBoundingClientRect(), o)] : []),
    rel(eyebrow.getBoundingClientRect(), o),
  ];
  return {
    w: o.width,
    h: o.height,
    cx: (ctaBox.l + ctaBox.r) / 2,
    eyebrow: rel(eyebrow.getBoundingClientRect(), o),
    h1: rel(h1.getBoundingClientRect(), o),
    sub: rel(sub.getBoundingClientRect(), o),
    cta: ctaBox,
    obstacles,
  };
}

const pt = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;

/** Start a curve on the node's rim rather than its centre, pointing at the control point. */
function rim(x: number, y: number, cx: number, cy: number, r = R + 3) {
  const dx = cx - x;
  const dy = cy - y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: x + (dx / len) * r, y: y + (dy / len) * r };
}

function link(a: NodeGeo, b: NodeGeo, bow: number, w: number) {
  const mx = (a.x + b.x) / 2 + a.side * bow;
  const my = (a.y + b.y) / 2;
  const cx = Math.max(EDGE / 2, Math.min(mx, w - EDGE / 2));
  const s = rim(a.x, a.y, cx, my);
  const e = rim(b.x, b.y, cx, my);
  return `M${pt(s.x, s.y)} Q${pt(cx, my)} ${pt(e.x, e.y)}`;
}

function layout(m: Metrics): Geo {
  const extra = Math.min(Math.max((m.w - 1024) * 0.28, 0), 160);
  const nodes: NodeGeo[] = [];
  for (const { id, name, logo } of site.hero.network.engines) {
    const L = LAYOUT[id];
    const y = L.anchor(m);
    // Smallest horizontal offset that keeps the node CLEAR px from every text box it is level with.
    let need = 0;
    for (const ob of m.obstacles) {
      const vGap = Math.max(ob.t - (y + R), y - R - ob.b, 0);
      if (vGap >= CLEAR) continue;
      const half = L.side < 0 ? m.cx - ob.l : ob.r - m.cx;
      need = Math.max(need, half + CLEAR + R);
    }
    const max = L.side < 0 ? m.cx - R - EDGE : m.w - m.cx - R - EDGE;
    if (max < need) continue; // not enough gutter at this width: skip the node rather than crowd the text
    const dx = Math.min(need + extra + L.stagger, max);
    nodes.push({ id, name, logo, x: m.cx + L.side * dx, y, side: L.side });
  }

  const ctaY = (m.cta.t + m.cta.b) / 2;
  const curves: Record<string, string> = {};
  for (const n of nodes) {
    const ex = n.side < 0 ? m.cta.l - END_GAP : m.cta.r + END_GAP;
    const ey = ctaY + LAYOUT[n.id].endDy;
    const s = rim(n.x, n.y, n.x, ey);
    curves[n.id] = `M${pt(s.x, s.y)} Q${pt(n.x, ey)} ${pt(ex, ey)}`;
  }

  // Two faint node-to-node curves per side, bowing outward into the gutter.
  const links: string[] = [];
  for (const side of [-1, 1] as const) {
    const ns = nodes.filter((n) => n.side === side).sort((a, b) => a.y - b.y);
    if (ns.length >= 3) {
      for (let i = 0; i < ns.length - 1; i++) links.push(link(ns[i], ns[i + 1], 34 + i * 10, m.w));
    } else if (ns.length === 2) {
      links.push(link(ns[0], ns[1], 30, m.w), link(ns[0], ns[1], 64, m.w));
    }
  }
  return { w: m.w, h: m.h, nodes, curves, links };
}

export function AIEngineNetworkCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const curveRefs = useRef<Partial<Record<EngineId, SVGPathElement | null>>>({});
  const nodeRefs = useRef<Partial<Record<EngineId, HTMLDivElement | null>>>({});
  const [geo, setGeo] = useState<Geo | null>(null);
  const [lit, setLit] = useState<EngineId | null>(null);
  const [hover, setHover] = useState<EngineId | null>(null);
  const [reduce, setReduce] = useState(false);
  const [running, setRunning] = useState(false);

  // Measure (and re-measure on resize / font load).
  useLayoutEffect(() => {
    const section = rootRef.current?.closest("section");
    if (!section) return;
    const run = () => {
      const m = measure(section);
      if (m) setGeo(layout(m));
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(section);
    document.fonts?.ready.then(run).catch(() => {});
    return () => ro.disconnect();
  }, []);

  // Reduced motion, visibility and tab state decide whether anything animates.
  useEffect(() => {
    const section = rootRef.current?.closest("section");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const update = () => {
      setReduce(mq.matches);
      setRunning(inView && !document.hidden && !mq.matches);
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      update();
    });
    if (section) io.observe(section);
    mq.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      io.disconnect();
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const nodeIds = geo?.nodes.map((n) => n.id).join(",") ?? "";

  // Idle drift: ±5px, 9-13s loops, random phase. Paused (not reset) when not running.
  const drift = useRef<AnimationPlaybackControls[]>([]);
  useEffect(() => {
    if (reduce || !nodeIds) return;
    const controls: AnimationPlaybackControls[] = [];
    for (const id of nodeIds.split(",") as EngineId[]) {
      const el = nodeRefs.current[id];
      if (!el) continue;
      const duration = 9 + Math.random() * 4;
      const ax = 2 + Math.random() * 3;
      const c = animate(el, { x: [0, ax, 0, -ax, 0], y: [0, -5, 0, 5, 0] }, { duration, repeat: Infinity, ease: "easeInOut" });
      c.time = Math.random() * duration;
      controls.push(c);
    }
    drift.current = controls;
    return () => controls.forEach((c) => c.stop());
  }, [nodeIds, reduce]);

  useEffect(() => {
    drift.current.forEach((c) => (running ? c.play() : c.pause()));
  }, [running, nodeIds]);

  const glowCta = useCallback(() => {
    const cta = rootRef.current?.closest("section")?.querySelector<HTMLElement>("#hero-cta a");
    if (!cta?.animate) return;
    const base = getComputedStyle(cta).boxShadow;
    const glow = `${base === "none" ? "" : `${base}, `}0 0 0 6px rgba(139,124,246,0.14), 0 0 30px 2px rgba(192,132,252,0.45)`;
    cta.animate([{ boxShadow: base }, { boxShadow: glow }, { boxShadow: base }], { duration: 600, easing: "ease-in-out" });
  }, []);

  // Pulse cycle: one engine at a time, in order, every TURN_MS.
  useEffect(() => {
    if (!running || !nodeIds) return;
    const ids = nodeIds.split(",") as EngineId[];
    const timers: number[] = [];
    let travel: AnimationPlaybackControls | undefined;
    let turn = 0;
    const dot = dotRef.current;

    const fire = () => {
      const id = ids[turn++ % ids.length];
      const path = curveRefs.current[id];
      setLit(id);
      timers.push(window.setTimeout(() => setLit((cur) => (cur === id ? null : cur)), LIT_MS));
      if (path && dot) {
        const len = path.getTotalLength();
        travel = animate(0, 1, {
          duration: TRAVEL_S,
          ease: [0.45, 0, 0.25, 1],
          onUpdate: (p) => {
            const q = path.getPointAtLength(p * len);
            dot.setAttribute("cx", q.x.toFixed(1));
            dot.setAttribute("cy", q.y.toFixed(1));
            dot.style.opacity = String(Math.min(1, p * 8, (1 - p) * 8 + 0.15));
          },
          onComplete: () => {
            dot.style.opacity = "0";
            glowCta();
          },
        });
      }
      timers.push(window.setTimeout(fire, TURN_MS));
    };
    timers.push(window.setTimeout(fire, 700));

    return () => {
      timers.forEach(clearTimeout);
      travel?.stop();
      if (dot) dot.style.opacity = "0";
      setLit(null);
    };
  }, [running, nodeIds, glowCta]);

  const restOpacity = reduce ? "opacity-[0.85]" : "opacity-[0.65]";

  return (
    <div ref={rootRef} className="contents">
      {geo && (
        <>
          <svg
            aria-hidden="true"
            width={geo.w}
            height={geo.h}
            className="aen-in pointer-events-none absolute left-0 top-0 -z-[1]"
            fill="none"
          >
            <defs>
              <linearGradient id="aen-dot" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8B7CF6" />
                <stop offset="100%" stopColor="#F0ABFC" />
              </linearGradient>
            </defs>
            {geo.links.map((d, i) => (
              <path key={i} d={d} stroke="rgba(15,23,42,0.06)" strokeWidth={1} />
            ))}
            {geo.nodes.map((n) => {
              const on = lit === n.id || hover === n.id;
              return (
                <path
                  key={n.id}
                  ref={(el) => {
                    curveRefs.current[n.id] = el;
                  }}
                  d={geo.curves[n.id]}
                  stroke={on ? "rgba(139,124,246,0.4)" : "rgba(15,23,42,0.10)"}
                  strokeWidth={1}
                  strokeLinecap="round"
                  className="transition-[stroke] duration-500"
                />
              );
            })}
            <circle ref={dotRef} r={3} cx={-10} cy={-10} fill="url(#aen-dot)" style={{ opacity: 0 }} />
          </svg>

          <ul aria-label={site.hero.network.label} className="aen-in pointer-events-none absolute left-0 top-0 z-[1] m-0 list-none p-0">
            {geo.nodes.map((n) => {
              const on = lit === n.id || hover === n.id;
              return (
                <li
                  key={n.id}
                  tabIndex={0}
                  aria-label={n.name}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover((h) => (h === n.id ? null : h))}
                  onFocus={() => setHover(n.id)}
                  onBlur={() => setHover((h) => (h === n.id ? null : h))}
                  className="pointer-events-auto absolute h-14 w-14 rounded-full"
                  style={{ left: n.x - R, top: n.y - R }}
                >
                  <div
                    ref={(el) => {
                      nodeRefs.current[n.id] = el;
                    }}
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(15,23,42,0.06)] bg-white/72 backdrop-blur-md transition-shadow duration-500",
                      on
                        ? "shadow-[0_0_0_4px_rgba(139,124,246,0.14),0_0_28px_2px_rgba(192,132,252,0.45),0_6px_20px_-8px_rgba(15,23,42,0.18)]"
                        : "shadow-[0_6px_20px_-8px_rgba(15,23,42,0.18)]",
                    )}
                  >
                    <Image
                      src={n.logo}
                      alt=""
                      width={28}
                      height={28}
                      className={cn("h-7 w-7 object-contain transition-[filter,opacity] duration-500", on ? "opacity-100 grayscale-0" : cn("grayscale", restOpacity))}
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[12px] font-medium text-white shadow-[0_4px_12px_-4px_rgba(15,23,42,0.3)] transition-opacity duration-200",
                      hover === n.id ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {n.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
