"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

/**
 * One-open-at-a-time accordion. Answers stay in the DOM when collapsed,
 * so the full text is present in the static HTML for crawlers.
 */
export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: readonly AccordionItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="glass divide-y divide-line-strong overflow-hidden rounded-[24px]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q-${i}`;
        const panelId = `${base}-a-${i}`;
        return (
          <div key={item.q}>
            <h3 className="m-0 text-[17px] md:text-[18px]">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 rounded-none px-6 py-5 text-left font-medium text-ink transition-colors hover:bg-white/50 md:px-8 md:py-6"
              >
                <span>{item.q}</span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/70 text-ink transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[720px] px-6 pb-6 text-[16px] leading-relaxed text-body md:px-8 md:pb-7 md:text-[17px]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
