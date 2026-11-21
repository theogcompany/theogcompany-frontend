"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/cn";

type Tag = "div" | "ul" | "ol" | "li" | "header";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const itemStatic: Variants = { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };

/** Stagger container: fades children up once, at 20% in view. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const M = m[as];
  return (
    <M
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const reduce = useReducedMotion();
  const M = m[as];
  return (
    <M className={className} variants={reduce ? itemStatic : itemMotion}>
      {children}
    </M>
  );
}
