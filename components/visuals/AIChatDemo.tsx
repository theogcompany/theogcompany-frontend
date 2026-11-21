"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { BadgeCheck, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { cn, EASE } from "@/lib/cn";

type Script = (typeof site.chatDemo.scripts)[number];
type Token = { text: string; highlight?: boolean };
type Phase = "typing" | "thinking" | "streaming" | "sources" | "hold";

const CHAR_MS = 35;
const WORD_MS = 55;
const THINK_MS = 1000;

function tokenize(s: Script): Token[] {
  const words = (str: string) => str.match(/\S+\s*/g) ?? [];
  const lead = s.answerBefore.match(/^\s*/)?.[0] ?? "";
  return [
    ...(lead ? [{ text: lead }] : []),
    ...words(s.answerBefore).map((text) => ({ text })),
    { text: s.highlight, highlight: true },
    ...words(s.answerAfter).map((text) => ({ text })),
  ];
}

function Favicon({ domain }: { domain: string }) {
  const letter = domain[0]?.toUpperCase() ?? "•";
  const hue: Record<string, string> = {
    o: "bg-gradient-accent text-white",
    r: "bg-[#FF4500] text-white",
    q: "bg-[#B92B27] text-white",
  };
  return (
    <span
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded-[5px] text-[9px] font-bold",
        hue[domain[0]] ?? "bg-ink text-white",
      )}
    >
      {letter}
    </span>
  );
}

export function AIChatDemo() {
  const scripts = site.chatDemo.scripts;
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [chars, setChars] = useState(0);
  const [words, setWords] = useState(0);

  const script = scripts[idx];
  const tokens = useMemo(() => tokenize(script), [script]);

  useEffect(() => {
    if (reduce) {
      setChars(script.question.length);
      setWords(tokens.length);
      setPhase("hold");
      return;
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    setPhase("typing");
    setChars(0);
    setWords(0);

    let t = 400;
    for (let c = 1; c <= script.question.length; c++) at((t += CHAR_MS), () => setChars(c));
    at((t += 250), () => setPhase("thinking"));
    at((t += THINK_MS), () => setPhase("streaming"));
    for (let w = 1; w <= tokens.length; w++) at((t += WORD_MS), () => setWords(w));
    at((t += 300), () => setPhase("sources"));
    const end = Math.max(site.chatDemo.loopMs, t + 2600);
    at(end, () => setIdx((i) => (i + 1) % scripts.length));

    return () => timers.forEach(clearTimeout);
  }, [idx, reduce, script, tokens, scripts.length]);

  const showAnswer = phase === "streaming" || phase === "sources" || phase === "hold";
  const showSources = phase === "sources" || phase === "hold";
  const highlightShown = tokens.findIndex((t) => t.highlight) < words;

  return (
    <figure className="relative mx-auto w-full max-w-[760px]">
      <figcaption className="sr-only">
        Example of an AI assistant answer. Question: {scripts[0].question} Answer: {scripts[0].answerBefore}
        {scripts[0].highlight}
        {scripts[0].answerAfter}
      </figcaption>

      <BrowserFrame title={site.chatDemo.windowTitle} bodyClassName="p-5 sm:p-7" className="text-left">
        <div aria-hidden="true" className="flex h-[312px] flex-col gap-5 sm:h-[296px]">
          {/* User bubble */}
          <div className="flex justify-end">
            <div className="max-w-[88%] rounded-[18px] rounded-br-md bg-ink px-4 py-2.5 text-[15px] leading-snug text-white sm:text-[16px]">
              {script.question.slice(0, chars)}
              {phase === "typing" && <span className="caret opacity-80" />}
              {chars === 0 && <span className="invisible">.</span>}
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
                    className="flex flex-col gap-2 pt-1.5"
                  >
                    <div className="thinking-bar h-3 w-[78%] rounded-full" />
                    <div className="thinking-bar h-3 w-[56%] rounded-full" />
                  </m.div>
                )}
              </AnimatePresence>

              {showAnswer && (
                <p className="text-[15px] leading-[1.65] text-ink/85 sm:text-[16px]">
                  {tokens.slice(0, words).map((tok, i) =>
                    tok.highlight ? (
                      <span key={i} className="relative inline-flex items-baseline gap-1.5 whitespace-nowrap">
                        <span className="text-gradient font-semibold [filter:drop-shadow(0_0_10px_rgba(192,132,252,0.55))]">
                          {tok.text}
                        </span>
                        <m.span
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="inline-flex translate-y-[-1px] items-center gap-1 rounded-full border border-violet/40 bg-violet/10 px-2 py-0.5 text-[11px] font-medium text-accent"
                        >
                          <BadgeCheck className="h-3 w-3" strokeWidth={2} />
                          {site.chatDemo.badge}
                        </m.span>{" "}
                      </span>
                    ) : (
                      <m.span
                        key={i}
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        {tok.text}
                      </m.span>
                    ),
                  )}
                  {phase === "streaming" && !highlightShown && <span className="caret text-violet" />}
                </p>
              )}

              <AnimatePresence>
                {showSources && (
                  <m.div
                    key={`src-${idx}`}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="mt-4 flex flex-wrap items-center gap-2"
                  >
                    <span className="mr-1 text-[12px] font-medium text-subtle">{site.chatDemo.sourcesLabel}</span>
                    {script.sources.map((d, i) => (
                      <m.span
                        key={d}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 * i, duration: 0.4, ease: EASE }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white/80 py-1 pl-1.5 pr-2.5 text-[12px] font-medium text-ink"
                      >
                        <Favicon domain={d} />
                        {d}
                      </m.span>
                    ))}
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
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === idx ? "w-5 bg-ink/60" : "w-1.5 bg-ink/15",
            )}
          />
        ))}
      </div>
    </figure>
  );
}
