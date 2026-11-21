import { cn } from "@/lib/cn";

/**
 * Brand mark: "OG" where the O is an almond eye with a
 * four-point spark pupil in the purple-pink gradient.
 * Each instance gets its own gradient id to keep the DOM valid.
 */
function SparkGradient({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8B7CF6" />
        <stop offset="50%" stopColor="#C084FC" />
        <stop offset="100%" stopColor="#F0ABFC" />
      </linearGradient>
    </defs>
  );
}

function EyeO({ gradId }: { gradId: string }) {
  return (
    <>
      <path
        d="M2.5 16C8 7.2 24 7.2 29.5 16C24 24.8 8 24.8 2.5 16Z"
        fill="none"
        stroke="#0F172A"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 9.2C16.75 13.6 18.4 15.25 22.8 16C18.4 16.75 16.75 18.4 16 22.8C15.25 18.4 13.6 16.75 9.2 16C13.6 15.25 15.25 13.6 16 9.2Z"
        fill={`url(#${gradId})`}
      />
    </>
  );
}

/** Compact icon variant: just the eye-O. */
export function LogoMark({ className, id = "og-mark" }: { className?: string; id?: string }) {
  const gradId = `${id}-grad`;
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7", className)}>
      <SparkGradient id={gradId} />
      <EyeO gradId={gradId} />
    </svg>
  );
}

/** Full "OG" mark. */
export function LogoOG({ className, id = "og-full" }: { className?: string; id?: string }) {
  const gradId = `${id}-grad`;
  return (
    <svg viewBox="0 0 62 32" aria-hidden="true" className={cn("h-7 w-auto", className)}>
      <SparkGradient id={gradId} />
      <EyeO gradId={gradId} />
      <path
        d="M55.07 8.93A10 10 0 1 0 58 16H49"
        fill="none"
        stroke="#0F172A"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  id = "og-logo",
  withWordmark = true,
}: {
  className?: string;
  id?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoOG id={id} className="h-6" />
      {withWordmark && (
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">The OG Company</span>
      )}
    </span>
  );
}
