import Image from "next/image";
import { cn } from "@/lib/cn";

/** Wordmark viewBox is 1252 × 411 (from the traced brand logo in app/icon.svg). */
const RATIO = 1252 / 411;

/**
 * Brand wordmark: "THE OG COMPANY" in the company's serif, navy on transparent.
 * Source: public/brand/the-og-company.svg. Pass `alt=""` when the parent link
 * already has an accessible name.
 */
export function Logo({
  className,
  height = 36,
  alt = "The OG Company",
  priority = false,
}: {
  className?: string;
  height?: number;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/the-og-company.svg"
      alt={alt}
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={cn("block w-auto select-none", className)}
      style={{ height }}
    />
  );
}
