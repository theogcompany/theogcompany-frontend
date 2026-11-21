"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { BadgeCheck, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { cn, EASE } from "@/lib/cn";

/*
 * Signature hero visual. Performance notes:
 * - The question "types" by writing the DOM text node directly (no React render per char).
 * - The answer renders once; each word fades in via a staggered CSS animation-delay.
 * - React re-renders only on phase changes (a handful per loop).
 * - The demo starts after window load + idle, so it never competes with hydration/LCP.
 */

type Script = (typeof site.chatDemo.scripts)[number];
type Token = { text: string; highlight?: boolean };
type Phase = "typing" | "thinking" | "answer";

const CHAR_MS = 35;
const WORD_MS = 55;
const THINK_MS = 1000;

function tokenize(s: Script): Token[] {
  const words = (str: string) => str.match(/\S+\s*/g) ?? [];
  return [
    ...words(s.answerBefore).map((text) => ({ text })),
    { text: s.highlight, highlight: true },
    ...words(s.answerAfter).map((text) => ({ text })),
  ];
}

function Favicon({ domain }: { domain: string }) {
  const hue: Record<string, string> = {
    o: "bg-gradient-accent text-white",
    r: "bg-[#FF4500] text-white",
    q: "bg-[#B92B27] text-white",
  };
  return (
    <span className={cn("flex h-4 w-4 items-center justify-center rounded-[5px] text-[9px] font-bold", hue[domain[0]] ?? "bg-ink text-white")}>
      {domain[0]?.toUpperCase()}
    </span>
  );
}

function useStartWhenIdle() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idleId: number | undefined;
    let timer: number | undefined;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const go = () => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
      else timer = window.setTimeout(() => setReady(true), 300);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);
  return ready;
}

export function AIChatDemo() {
  const scripts = site.chatDemo.scripts;
  const reduce = useReducedMotion();
  const ready = useStartWhenIdle();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const qRef = useRef<HTMLSpanElement>(null);

  const script = scripts[idx];
  const tokens = useMemo(() => tokenize(script), [script]);
  const answerMs = tokens.length * WORD_MS;

  useEffect(() => {
    const q = qRef.current;
    if (!ready || !q) return;
    if (reduce) {
      q.textContent = script.question;
      setPhase("answer");
      return;
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    setPhase("typing");
    q.textContent = "";
    let t = 300;
    for (let c = 1; c <= script.question.length; c++) {
      at((t += CHAR_MS), () => {
        q.textContent = script.question.slice(0, c);
      });
    }
    at((t += 250), () => setPhase("thinking"));
    at((t += THINK_MS), () => setPhase("answer"));
    const end = Math.max(site.chatDemo.loopMs, t + answerMs + 3000);
    at(end, () => setIdx((i) => (i + 1) % scripts.length));
    return () => timers.forEach(clearTimeout);
  }, [ready, idx, reduce, script, answerMs, scripts.length]);

  const highlightAt = tokens.findIndex((tk) => tk.highlight);
  const sourcesDelay = answerMs + 250;

  return (
    <figure className="relative mx-auto w-full max-w-[760px]">
      <figcaption className="sr-only">
        Example of an AI assistant answer. Question: {scripts[0].question} Answer: {scripts[0].answerBefore}
        {scripts[0].highlight}
        {scripts[0].answerAfter}
      </figcaption>

      <BrowserFrame title={site.chatDemo.windowTitle} bodyClassName="p-5 sm:p-7" className="text-left">
        <div aria-hidden="true" className="flex h-[312px] flex-col gap-5 [contain:strict] sm:h-[296px]">
          {/* User bubble */}
          <div className="flex justify-end">
            <div className="min-h-[44px] max-w-[88%] rounded-[18px] rounded-br-md bg-ink px-4 py-2.5 text-[15px] leading-snug text-white sm:text-[16px]">
              <span ref={qRef} />
              {phase === "typing" && <span className="caret opacity-80" />}
            </div>
          </div>

          {/* Assistant */}
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white">
              <Sparkles className="h-3.5 w-3.5 text-ink" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {phase === "thinking" && (
                  <m.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-2 pt-1.5"
                  >
                    <div className="thinking-bar h-3 w-[78%] rounded-full" />
                    <div className="thinking-bar h-3 w-[56%] rounded-full" />
                  </m.div>
                )}
                {phase === "answer" && (
                  <m.div
                    key={`answer-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p className="text-[15px] leading-[1.65] text-ink/85 sm:text-[16px]">
                      {tokens.map((tok, i) =>
                        tok.highlight ? (
                          <span key={i} className="word-in relative inline-flex items-baseline gap-1.5 whitespace-nowrap" style={{ animationDelay: `${i * WORD_MS}ms` }}>
                            <span className="text-gradient font-semibold [filter:drop-shadow(0_0_10px_rgba(192,132,252,0.55))]">{tok.text}</span>
                            <span
                              className="rise-in inline-flex translate-y-[-1px] items-center gap-1 rounded-full border border-violet/40 bg-violet/10 px-2 py-0.5 text-[11px] font-medium text-accent"
                              style={{ animationDelay: `${highlightAt * WORD_MS + 150}ms` }}
                            >
                              <BadgeCheck className="h-3 w-3" strokeWidth={2} />
                              {site.chatDemo.badge}
                            </span>{" "}
                          </span>
                        ) : (
                          <span key={i} className="word-in" style={{ animationDelay: `${i * WORD_MS}ms` }}>
                            {tok.text}
                          </span>
                        ),
                      )}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="rise-in mr-1 text-[12px] font-medium text-subtle" style={{ animationDelay: `${sourcesDelay}ms` }}>
                        {site.chatDemo.sourcesLabel}
                      </span>
                      {script.sources.map((d, i) => (
                        <span
                          key={d}
                          className="rise-in inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white/80 py-1 pl-1.5 pr-2.5 text-[12px] font-medium text-ink"
                          style={{ animationDelay: `${sourcesDelay + 80 * (i + 1)}ms` }}
                        >
                          <Favicon domain={d} />
                          {d}
                        </span>
                      ))}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </BrowserFrame>

      {/* Progress dots for the script loop */}
      <div aria-hidden="true" className="mt-4 flex justify-center gap-1.5">
        {scripts.map((_, i) => (
          <span key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === idx ? "w-5 bg-ink/60" : "w-1.5 bg-ink/15")} />
        ))}
      </div>
    </figure>
  );
}
