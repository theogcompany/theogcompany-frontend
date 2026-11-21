import { MessageSquare, RefreshCw } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/*
 * Server-rendered micro visuals. Each sits in its own [data-reveal] node, so the
 * shared RevealObserver triggers its CSS transition (bars grow, lines draw) on view.
 */

const mv = site.services.microVisuals;

function Bars() {
  return (
    <div className="flex flex-col gap-2.5" data-reveal="">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">{mv.barsLabel}</p>
      {mv.bars.map((b, i) => {
        const you = "you" in b && b.you;
        return (
          <div key={b.label} className="flex items-center gap-3">
            <span className={cn("w-16 shrink-0 text-[12px]", you ? "font-semibold text-ink" : "text-subtle")}>{b.label}</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.05]">
              <div
                className={cn("anim-bar h-full rounded-full", you ? "bg-ink" : "bg-slate-300")}
                style={{ width: `${b.value}%`, transitionDelay: `${i * 100}ms` }}
              />
            </div>
            <span className="w-8 text-right text-[12px] tabular-nums text-subtle">{b.value}</span>
          </div>
        );
      })}
    </div>
  );
}

function Code() {
  return (
    <pre className="overflow-hidden rounded-xl border border-line bg-ink px-4 py-3 font-mono text-[11.5px] leading-[1.65] text-slate-300">
      <code>
        {mv.code.split("\n").map((ln, i, arr) => (
          <span key={i} className="block">
            {ln.split(/("[^"]*")/g).map((part, j) =>
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
  return (
    <div className="rounded-xl border border-line bg-white/80 p-4" data-reveal="">
      <div className="mb-3 flex gap-1.5" aria-hidden="true">
        <span className="h-1.5 w-10 rounded-full bg-ink/10" />
        <span className="h-1.5 w-6 rounded-full bg-ink/10" />
      </div>
      <p className="text-[14px] font-semibold leading-snug text-ink">{mv.article.title}</p>
      <p
        className="anim-fade mt-3 rounded-lg border-l-2 border-violet bg-violet/10 px-3 py-2 text-[13px] leading-relaxed text-ink/85"
        style={{ transitionDelay: "250ms" }}
      >
        {mv.article.answer}
      </p>
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
  return (
    <div className="relative flex flex-col gap-2" data-reveal="">
      {mv.threads.map((t, i) => (
        <span
          key={t}
          className="anim-fade inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-white/85 px-3 py-1.5 text-[12px] text-ink shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          style={{ marginLeft: `${i * 14}px`, transitionDelay: `${i * 120}ms` }}
        >
          <MessageSquare className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />
          {t}
        </span>
      ))}
    </div>
  );
}

function Ring() {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4" data-reveal="">
      <div className="relative h-16 w-16 shrink-0">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90" aria-hidden="true">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(15,23,42,0.07)" strokeWidth="5" />
          <circle
            className="anim-ring"
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="#0F172A"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            style={{ strokeDashoffset: c * 0.28, ["--ring-from" as string]: `${c}` }}
          />
        </svg>
        <RefreshCw className="absolute inset-0 m-auto h-4 w-4 text-ink [animation:spin-slow_6s_linear_infinite]" aria-hidden="true" />
      </div>
      <div className="text-[12px] leading-snug text-subtle">
        <span className="block text-[13px] font-medium text-ink">{mv.ringTitle}</span>
        {mv.ringSub}
      </div>
    </div>
  );
}

function Sparkline() {
  const vals = mv.sparkline;
  const W = 240;
  const H = 56;
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const pts = vals.map((v, i) => [(i / (vals.length - 1)) * W, H - 4 - ((v - min) / (max - min)) * (H - 8)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <div className="flex min-w-0 items-end gap-5" data-reveal="">
      <div className="shrink-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-subtle">{mv.sparkLabel}</p>
        <p className="mt-1 text-[26px] font-semibold tracking-[-0.02em] text-ink tabular-nums">{mv.sparkValue}</p>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-14 min-w-0 max-w-[260px] flex-1 overflow-visible" aria-hidden="true">
        <path className="anim-draw" pathLength={1} d={d} fill="none" stroke="#0F172A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
