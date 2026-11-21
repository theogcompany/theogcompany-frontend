"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Modal } from "@/components/ui/Modal";

/* eslint-disable @typescript-eslint/no-explicit-any */
type CalFn = ((...args: any[]) => void) & { ns: Record<string, any>; q?: unknown[]; loaded?: boolean };
declare global {
  interface Window {
    Cal?: CalFn;
  }
}

const EMBED_SRC = "https://app.cal.com/embed/embed.js";
const NS = "ogc";
const ELEMENT_ID = "ogc-cal-inline";
const TIMEOUT_MS = 12000;

/** Official Cal.com loader snippet, typed. Queues calls until embed.js loads. */
function ensureCal(onScriptError: () => void): CalFn {
  const w = window;
  if (!w.Cal) {
    const push = (api: { q: unknown[] }, args: unknown) => api.q.push(args);
    const cal = function (...args: any[]) {
      const c = w.Cal!;
      if (!c.loaded) {
        c.ns = {};
        c.q = c.q || [];
        const s = document.createElement("script");
        s.src = EMBED_SRC;
        s.async = true;
        s.onerror = onScriptError;
        document.head.appendChild(s);
        c.loaded = true;
      }
      if (args[0] === "init") {
        const api: any = function (...a: unknown[]) {
          push(api, a);
        };
        api.q = [];
        const namespace = args[1];
        if (typeof namespace === "string") {
          c.ns[namespace] = c.ns[namespace] || api;
          push(c.ns[namespace], args);
          push(c as any, ["initNamespace", namespace]);
        } else push(c as any, args);
        return;
      }
      push(c as any, args);
    } as CalFn;
    cal.ns = {};
    cal.q = [];
    w.Cal = cal;
  }
  return w.Cal;
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const started = useRef(false);
  const bookingUrl = `https://cal.com/${site.booking.calLink}`;

  useEffect(() => {
    if (!open || started.current) return;
    started.current = true;

    const fail = () => setStatus((s) => (s === "ready" ? s : "failed"));
    const timer = window.setTimeout(fail, TIMEOUT_MS);

    try {
      const Cal = ensureCal(fail);
      Cal("init", NS, { origin: "https://app.cal.com" });
      const api = Cal.ns[NS];
      api("inline", {
        elementOrSelector: `#${ELEMENT_ID}`,
        calLink: site.booking.calLink,
        config: { layout: "month_view", theme: "light" },
      });
      api("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
      api("on", {
        action: "linkReady",
        callback: () => {
          window.clearTimeout(timer);
          setStatus("ready");
        },
      });
      api("on", {
        action: "linkFailed",
        callback: () => {
          window.clearTimeout(timer);
          setStatus("failed");
        },
      });
    } catch {
      fail();
    }
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} titleId="booking-title">
      <div className="border-b border-line px-6 pb-4 pt-6 pr-16 md:px-8">
        <h2 id="booking-title" className="text-[22px] font-semibold tracking-[-0.02em] text-ink">
          {site.booking.modalTitle}
        </h2>
        <p className="mt-1 text-[15px] text-body">{site.booking.modalSubtitle}</p>
      </div>

      <div className="relative min-h-[520px] flex-1 overflow-auto">
        {status === "loading" && (
          <div className="absolute inset-0 flex flex-col gap-3 p-6 md:p-8" aria-hidden="true">
            <div className="thinking-bar h-6 w-1/3 rounded-lg" />
            <div className="thinking-bar h-[380px] w-full rounded-2xl" />
          </div>
        )}
        {status === "failed" ? (
          <div className="flex min-h-[520px] flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="max-w-[420px] text-[16px] text-body">
              The scheduler didn&apos;t load here. You can book directly on our booking page.
            </p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[16px] font-medium text-accent underline-offset-4 hover:underline"
            >
              {site.booking.fallbackLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div id={ELEMENT_ID} className="h-full min-h-[520px] w-full" />
        )}
      </div>
    </Modal>
  );
}
