"use client";

import { m, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { EASE } from "@/lib/cn";

type Pt = { x: number; y: number };
type Variant = "wide" | "compact";

const DIMS: Record<Variant, { W: number; H: number; pad: { top: number; right: number; bottom: number; left: number }; font: number }> = {
  wide: { W: 800, H: 300, pad: { top: 36, right: 16, bottom: 36, left: 16 }, font: 12 },
  compact: { W: 360, H: 240, pad: { top: 20, right: 10, bottom: 30, left: 10 }, font: 13 },
};

/** Catmull-Rom → cubic Bézier for a smooth line through every point. */
function smoothPath(pts: Pt[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

function ChartSvg({ variant, label }: { variant: Variant; label?: string }) {
  const { series, milestones } = site.origin.chart;
  const reduce = useReducedMotion();
  const { W, H, pad, font } = DIMS[variant];
  const compact = variant === "compact";
  const max = Math.max(...series.map((s) => s.value)) * 1.08;
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const base = pad.top + innerH;
  const pts: Pt[] = series.map((s, i) => ({
    x: pad.left + (i / (series.length - 1)) * innerW,
    y: base - (s.value / max) * innerH,
  }));
  const line = smoothPath(pts);
  const area = `${line} L${pts[pts.length - 1].x},${base} L${pts[0].x},${base} Z`;
  const view = { once: true, amount: 0.4 } as const;
  const id = `gc-${variant}`;
  const labelStep = compact ? 4 : 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B7CF6" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#F0ABFC" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line key={f} x1={pad.left} x2={W - pad.right} y1={base - innerH * f} y2={base - innerH * f} stroke="rgba(15,23,42,0.06)" strokeDasharray="3 5" />
      ))}
      <line x1={pad.left} x2={W - pad.right} y1={base} y2={base} stroke="rgba(15,23,42,0.1)" />

      <m.path
        d={area}
        fill={`url(#${id}-fill)`}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={view}
        transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
      />
      <m.path
        d={line}
        fill="none"
        stroke={`url(#${id}-stroke)`}
        strokeWidth={3}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={view}
        transition={{ duration: 1.8, ease: EASE }}
      />

      {milestones.map((ms, i) => {
        const p = pts[ms.index];
        const labelW = ms.label.length * 7.4 + 20;
        const lx = Math.min(Math.max(p.x - labelW / 2, pad.left), W - pad.right - labelW);
        return (
          <m.g
            key={ms.label}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.5, delay: 0.5 + (ms.index / series.length) * 1.4 + i * 0.05, ease: EASE }}
          >
            {compact ? (
              <>
                <circle cx={p.x} cy={p.y} r={11} fill="#0F172A" stroke="#fff" strokeWidth={2.5} />
                <text x={p.x} y={p.y + 4.5} textAnchor="middle" fontSize={12} fontWeight={600} fill="#fff">
                  {i + 1}
                </text>
              </>
            ) : (
              <>
                <line x1={p.x} x2={p.x} y1={p.y - 10} y2={p.y - 26} stroke="rgba(15,23,42,0.25)" />
                <circle cx={p.x} cy={p.y} r={6} fill="#fff" stroke="#8B7CF6" strokeWidth={2.5} />
                <rect x={lx} y={p.y - 50} width={labelW} height={24} rx={12} fill="#0F172A" />
                <text x={lx + labelW / 2} y={p.y - 34} textAnchor="middle" fontSize={font} fontWeight={500} fill="#fff">
                  {ms.label}
                </text>
              </>
            )}
          </m.g>
        );
      })}

      {series.map((s, i) =>
        i % labelStep === 0 || i === series.length - 1 ? (
          <text
            key={s.month}
            x={pts[i].x}
            y={H - 8}
            textAnchor={i === 0 ? "start" : i === series.length - 1 ? "end" : "middle"}
            fontSize={font}
            fill="#64748B"
          >
            {s.month}
          </text>
        ) : null,
      )}
    </svg>
  );
}

export function GrowthChart() {
  const { series, milestones, title } = site.origin.chart;
  const first = series[0];
  const last = series[series.length - 1];
  const summary = `${title}: grew from ${first.value}K in ${first.month} to ${last.value}K in ${last.month}. Milestones: ${milestones
    .map((ms) => `${ms.label} (${series[ms.index].month})`)
    .join(", ")}.`;

  return (
    <figure className="glass rounded-[24px] p-5 sm:p-8">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <figcaption className="text-[15px] font-medium text-ink">{title}</figcaption>
        <span className="text-[13px] text-subtle">
          {first.month} – {last.month}
        </span>
      </div>

      <div className="hidden sm:block">
        <ChartSvg variant="wide" label={summary} />
      </div>

      <div className="sm:hidden">
        <ChartSvg variant="compact" label={summary} />
        <ol className="mt-4 flex flex-col gap-2">
          {milestones.map((ms, i) => (
            <li key={ms.label} className="flex items-center gap-2.5 text-[14px] text-ink">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              {ms.label}
              <span className="text-subtle">· {series[ms.index].month}</span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
