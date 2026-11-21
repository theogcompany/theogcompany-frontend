"use client";

import { m, useReducedMotion } from "framer-motion";
import { MessageSquare, RefreshCw } from "lucide-react";
import { site } from "@/content/site";
import { cn, EASE } from "@/lib/cn";

const mv = site.services.microVisuals;
const view = { once: true, amount: 0.5 } as const;

function Bars() {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">{mv.barsLabel}</p>
      {mv.bars.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className={cn("w-16 shrink-0 text-[12px]", "you" in b && b.you ? "font-semibold text-ink" : "text-subtle")}>
            {b.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.05]">
            <m.div
              className={cn("h-full rounded-full", "you" in b && b.you ? "bg-ink" : "bg-slate-300")}
              style={{ width: `${b.value}%`, transformOrigin: "left" }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={view}
              transition={{ duration: 0.9, delay: 0.1 * i, ease: EASE }}
            />
          </div>
          <span className="w-8 text-right text-[12px] tabular-nums text-subtle">{b.value}</span>
        </div>
      ))}
    </div>
  );
}

function Code() {
  return (
    <pre className="overflow-hidden rounded-xl border border-line bg-ink px-4 py-3 font-mono text-[11.5px] leading-[1.65] text-slate-300">
      <code>
        {mv.code.split("\n").map((ln, i, arr) => (
          <span key={i} className="block">
            {ln
              .split(/("[^"]*")/g)
              .map((part, j) =>
                part.startsWith('"') ? (
                  <span key={j} className={part.startsWith('"@') ? "text-violet" : "text-pink"}>
                    {part}
                  </span>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )}
            {i === arr.length - 1 && <span className="caret text-white" />}
          </span>
        ))}
      </code>
    </pre>
  );
}

function Article() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-xl border border-line bg-white/80 p-4">
      <div className="mb-3 flex gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-10 rounded-full bg-ink/10" />
        <span className="h-1.5 w-6 rounded-full bg-ink/10" />
      </div>
      <p className="text-[14px] font-semibold leading-snug text-ink">{mv.article.title}</p>
      <m.p
        className="relative mt-3 rounded-lg border-l-2 border-violet bg-violet/10 px-3 py-2 text-[13px] leading-relaxed text-ink/85"
        initial={reduce ? false : { backgroundColor: "rgba(192,132,252,0)" }}
        whileInView={{ backgroundColor: "rgba(192,132,252,0.12)" }}
        viewport={view}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {mv.article.answer}
      </m.p>
      <div className="mt-3 space-y-2" aria-hidden="true">
        <span className="block h-1.5 w-full rounded-full bg-ink/[0.06]" />
        <span className="block h-1.5 w-[92%] rounded-full bg-ink/[0.06]" />
        <span className="block h-1.5 w-[80%] rounded-full bg-ink/[0.06]" />
        <span className="block h-1.5 w-[86%] rounded-full bg-ink/[0.06]" />
      </div>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-2 py-0.5 text-[11px] font-medium text-subtle">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {mv.articleBadge}
      </span>
    </div>
  );
}

function Threads() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex flex-col gap-2">
      {mv.threads.map((t, i) => (
        <m.span
          key={t}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-white/85 px-3 py-1.5 text-[12px] text-ink shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          style={{ marginLeft: `${i * 14}px` }}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={view}
          transition={{ duration: 0.5, delay: 0.12 * i, ease: EASE }}
        >
          <MessageSquare className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />
          {t}
        </m.span>
      ))}
    </div>
  );
}

function Ring() {
  const reduce = useReducedMotion();
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(15,23,42,0.07)" strokeWidth="5" />
          <m.circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="#0F172A"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={reduce ? false : { strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * 0.28 }}
            viewport={view}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ strokeDashoffset: c * 0.28 }}
          />
        </svg>
        <RefreshCw
          className="absolute inset-0 m-auto h-4 w-4 text-ink [animation:spin-slow_6s_linear_infinite]"
          aria-hidden="true"
        />
      </div>
      <div className="text-[12px] leading-snug text-subtle">
        <span className="block text-[13px] font-medium text-ink">{mv.ringTitle}</span>
        {mv.ringSub}
      </div>
    </div>
  );
}

function Sparkline() {
  const reduce = useReducedMotion();
  const vals = mv.sparkline;
  const W = 240;
  const H = 56;
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const pts = vals.map((v, i) => [(i / (vals.length - 1)) * W, H - 4 - ((v - min) / (max - min)) * (H - 8)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <div className="flex min-w-0 items-end gap-5">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">{mv.sparkLabel}</p>
        <p className="mt-1 text-[26px] font-semibold tracking-[-0.02em] text-ink tabular-nums">{mv.sparkValue}</p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-14 min-w-0 flex-1 max-w-[260px] overflow-visible" aria-hidden="true">
        <m.path
          d={d}
          fill="none"
          stroke="#0F172A"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={view}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <circle cx={last[0]} cy={last[1]} r={3.5} fill="#0F172A" />
      </svg>
    </div>
  );
}

const visuals = {
  bars: Bars,
  code: Code,
  article: Article,
  threads: Threads,
  ring: Ring,
  sparkline: Sparkline,
} as const;

export type MicroVisualKey = keyof typeof visuals;

export function MicroVisual({ kind }: { kind: MicroVisualKey }) {
  const C = visuals[kind];
  return <C />;
}
