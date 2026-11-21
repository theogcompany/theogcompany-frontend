import { cn } from "@/lib/cn";

type BlobSpec = { className: string; color: string };

const SETS: Record<"hero" | "origin" | "cta", BlobSpec[]> = {
  hero: [
    { className: "blob-a left-[-220px] top-[-200px] h-[760px] w-[760px] opacity-50", color: "var(--purple)" },
    { className: "blob-b right-[-240px] top-[-20px] h-[700px] w-[700px] opacity-55", color: "var(--pink)" },
    { className: "blob-c left-[25%] top-[360px] h-[640px] w-[860px] opacity-45", color: "var(--blue)" },
  ],
  origin: [
    { className: "blob-b left-[-260px] top-[5%] h-[760px] w-[760px] opacity-40", color: "var(--violet)" },
    { className: "blob-a right-[-240px] bottom-[0%] h-[700px] w-[700px] opacity-45", color: "var(--blue)" },
  ],
  cta: [
    { className: "blob-a left-[-160px] top-[-220px] h-[640px] w-[640px] opacity-60", color: "var(--purple)" },
    { className: "blob-b right-[-180px] bottom-[-260px] h-[700px] w-[700px] opacity-60", color: "var(--pink)" },
    { className: "blob-c left-[30%] top-[10%] h-[520px] w-[640px] opacity-50", color: "var(--blue)" },
  ],
};

/** Large soft, slowly drifting colour fields. Purely decorative. */
export function Blobs({ variant = "hero", className }: { variant?: keyof typeof SETS; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {SETS[variant].map((b, i) => (
        <div key={i} className={cn("blob", b.className)} style={{ "--blob": b.color } as React.CSSProperties} />
      ))}
    </div>
  );
}
