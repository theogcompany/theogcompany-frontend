"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** "Search then / Search now" segmented control. Both panels stay in the DOM (crawlable). */
export function ShiftToggle() {
  const t = site.shift.toggle;
  const [mode, setMode] = useState<"then" | "now">("now");

  return (
    <>
      <div className="flex flex-col items-center">
        <div role="group" aria-label="Compare search results" className="glass inline-flex rounded-full p-1 shadow-none">
          {(["then", "now"] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={mode === k}
              onClick={() => setMode(k)}
              className={cn(
                "relative rounded-full px-5 py-2 text-[14px] font-medium transition-colors duration-300",
                mode === k ? "bg-ink text-white" : "text-body hover:text-ink",
              )}
            >
              {k === "then" ? t.thenLabel : t.nowLabel}
            </button>
          ))}
        </div>
        <p className="mt-4 min-h-6 text-center text-[15px] text-body" aria-live="polite">
          {mode === "then" ? t.thenCaption : t.nowCaption}
        </p>
      </div>

      <div className="glass mt-6 overflow-hidden rounded-[24px] p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-2.5 rounded-full border border-line-strong bg-white/80 px-4 py-2.5 text-[14px] text-ink">
          <Search className="h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
          <span className="truncate">{t.query}</span>
        </div>

        <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
          <div
            aria-hidden={mode !== "then"}
            className={cn(
              "flex flex-col gap-1.5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mode === "then" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
            )}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-1 py-0.5">
                <span className="h-5 w-5 shrink-0 rounded-full bg-ink/[0.07]" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <span className="h-2 rounded-full bg-[#93C5FD]/70" style={{ width: `${70 - ((i * 13) % 30)}%` }} />
                  <span className="h-1.5 rounded-full bg-ink/[0.07]" style={{ width: `${88 - ((i * 7) % 20)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div
            aria-hidden={mode !== "now"}
            className={cn(
              "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              mode === "now" ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
            )}
          >
            <div className="rounded-2xl border border-line-strong bg-white/85 p-5">
              <p className="mb-4 flex items-center gap-2 text-[13px] font-medium text-ink">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {t.aiLabel}
              </p>
              <p className="text-[15px] text-body">{t.aiAnswerIntro}</p>
              <ol className="mt-4 flex flex-col gap-3">
                {t.brands.map((b, i) => (
                  <li key={b.name} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-snug">
                      <strong className="font-semibold text-ink">{b.name}</strong>
                      <span className="text-body">: {b.note}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-4 flex flex-col gap-2.5 opacity-40" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 rounded-full bg-ink/[0.08]" style={{ width: `${60 - i * 12}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
