import { ArrowUpRight, Check, X } from "lucide-react";
import { site } from "@/content/site";
import { WindowDots } from "@/components/ui/BrowserFrame";
import { cn } from "@/lib/cn";

const LINE_COLORS = ["#8B7CF6", "#94A3B8", "#CBD5E1"];

function MultiLine() {
  const { lines, weeks, title } = site.tracking.dashboard.chart;
  const W = 520;
  const H = 150;
  const pad = 8;
  const max = Math.max(...lines.flatMap((l) => l.values)) * 1.15;
  const x = (i: number) => pad + (i / (weeks.length - 1)) * (W - pad * 2);
  const y = (v: number) => H - pad - (v / max) * (H - pad * 2);

  return (
    <div className="rounded-2xl border border-line bg-white/70 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[13px] font-medium text-ink">{title}</p>
        <ul className="flex flex-wrap gap-3">
          {lines.map((l, i) => (
            <li key={l.name} className="flex items-center gap-1.5 text-[11px] text-subtle">
              <span className="h-2 w-2 rounded-full" style={{ background: LINE_COLORS[i] }} />
              {l.name}
            </li>
          ))}
        </ul>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true">
        {[0.33, 0.66].map((f) => (
          <line key={f} x1={0} x2={W} y1={H * f} y2={H * f} stroke="rgba(15,23,42,0.06)" strokeDasharray="3 5" />
        ))}
        {[...lines].reverse().map((l, ri) => {
          const i = lines.length - 1 - ri;
          const d = l.values.map((v, j) => `${j ? "L" : "M"}${x(j).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
          return (
            <g key={l.name}>
              <path
                d={d}
                fill="none"
                stroke={LINE_COLORS[i]}
                strokeWidth={"you" in l && l.you ? 2.75 : 2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {"you" in l && l.you && (
                <circle cx={x(l.values.length - 1)} cy={y(l.values[l.values.length - 1])} r={4} fill="#8B7CF6" stroke="#fff" strokeWidth={2} />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function DashboardMock() {
  const d = site.tracking.dashboard;
  return (
    <figure className="glass overflow-hidden rounded-[24px] shadow-float">
      <figcaption className="sr-only">
        {d.label}: example AI visibility report with KPIs, share of AI answers versus two competitors, and tracked prompts per
        AI engine.
      </figcaption>
      <div className="flex h-11 items-center gap-3 border-b border-line bg-white/50 px-4">
        <WindowDots />
        <span className="truncate text-[12px] font-medium text-subtle">{d.client}</span>
        <span className="ml-auto rounded-full border border-line-strong bg-white px-2.5 py-0.5 text-[11px] font-medium text-subtle">
          {d.label}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-5">
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {d.kpis.map((k) => (
            <div key={k.label} className="rounded-2xl border border-line bg-white/70 p-3.5">
              <dt className="text-[12px] text-subtle">{k.label}</dt>
              <dd className="mt-1.5 flex flex-col items-start gap-0.5">
                <span className="text-[22px] font-semibold tracking-[-0.02em] text-ink tabular-nums">{k.value}</span>
                <span className="inline-flex items-center whitespace-nowrap text-[11px] font-medium text-emerald-700">
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  {k.delta}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <MultiLine />

        <div className="overflow-x-auto rounded-2xl border border-line bg-white/70">
          <table className="w-full min-w-[440px] text-left text-[12px]">
            <caption className="sr-only">Tracked prompts and whether you are named by each AI engine</caption>
            <thead>
              <tr className="border-b border-line text-subtle">
                <th scope="col" className="px-4 py-2.5 font-medium">
                  Tracked prompt
                </th>
                {d.engines.map((e) => (
                  <th key={e} scope="col" className="px-2 py-2.5 text-center font-medium">
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.prompts.map((p) => (
                <tr key={p.prompt} className="border-b border-line last:border-0">
                  <th scope="row" className="max-w-[220px] truncate px-4 py-2.5 font-normal text-ink">
                    {p.prompt}
                  </th>
                  {p.hits.map((hit, i) => (
                    <td key={i} className="px-2 py-2.5">
                      <span
                        className={cn(
                          "mx-auto flex h-5 w-5 items-center justify-center rounded-full",
                          hit ? "bg-emerald-500/12 text-emerald-700" : "bg-slate-500/10 text-slate-500",
                        )}
                      >
                        {hit ? <Check className="h-3 w-3" strokeWidth={2.5} /> : <X className="h-3 w-3" strokeWidth={2.5} />}
                        <span className="sr-only">{hit ? "Named" : "Not named"}</span>
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </figure>
  );
}
