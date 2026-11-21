import { createElement } from "react";

type Tag = "div" | "ul" | "ol" | "li" | "header";

/**
 * Progressive-enhancement reveal. Content is fully visible in the static HTML.
 * Only when JS is running (html.js) does CSS hide `.reveal-item`s; the single
 * <RevealObserver /> then fades them up (16px, 0.6s, stagger 0.08s) once in view.
 */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  return createElement(as, { className, "data-reveal": "" }, children);
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
  return createElement(as, { className: className ? `reveal-item ${className}` : "reveal-item" }, children);
}
