"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { cn, EASE } from "@/lib/cn";

/**
 * Renders the final value on the server (crawlable, no-JS safe),
 * then counts up once when scrolled into view.
 */
export function StatCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const armed = useRef(false);

  // Arm: reset to 0 on mount, but only if the counter starts below the fold.
  useEffect(() => {
    const node = ref.current;
    if (reduce || !node) return;
    if (node.getBoundingClientRect().top > window.innerHeight) {
      node.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
      armed.current = true;
    }
  }, [reduce, prefix, suffix, decimals]);

  useEffect(() => {
    const node = ref.current;
    if (!inView || !armed.current || !node) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${prefix}${value.toFixed(decimals)}${suffix}`}
    </span>
  );
}
