"use client";

import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useBooking } from "./BookingProvider";

const sizes = {
  sm: "h-9 px-4 text-[14px] gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-14 px-7 text-[16px] gap-2.5",
} as const;

/**
 * THE only call to action on the page. Every instance opens the booking modal.
 * Renders a real link to the booking page so it still works without JS.
 */
export function BookCallButton({
  size = "md",
  className,
  fullWidth = false,
}: {
  size?: keyof typeof sizes;
  className?: string;
  fullWidth?: boolean;
}) {
  const { open } = useBooking();
  const href = `https://cal.com/${site.booking.calLink}`;

  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        open();
      }}
      aria-haspopup="dialog"
      className={cn(
        "shimmer group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-cta font-medium text-cta-text",
        "shadow-[0_1px_2px_rgba(15,23,42,0.2),0_8px_24px_-6px_rgba(15,23,42,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]",
        "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(15,23,42,0.2),0_14px_32px_-8px_rgba(15,23,42,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]",
        "active:translate-y-0 motion-reduce:hover:translate-y-0",
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      <span className="relative">{site.booking.label}</span>
      <ArrowRight
        aria-hidden="true"
        className="relative h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
      />
    </a>
  );
}
