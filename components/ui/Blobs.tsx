import { cn } from "@/lib/cn";

/** Large blurred, slowly drifting colour fields. Purely decorative. */
export function Blobs({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "origin" | "cta";
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {variant === "hero" && (
        <>
          <div className="blob blob-a left-[-180px] top-[-140px] h-[640px] w-[640px] bg-purple opacity-40" />
          <div className="blob blob-b right-[-200px] top-[40px] h-[580px] w-[580px] bg-pink opacity-45" />
          <div className="blob blob-c left-[30%] top-[420px] h-[520px] w-[720px] bg-blue opacity-35" />
        </>
      )}
      {variant === "origin" && (
        <>
          <div className="blob blob-b left-[-220px] top-[10%] h-[620px] w-[620px] bg-violet opacity-35" />
          <div className="blob blob-a right-[-200px] bottom-[5%] h-[560px] w-[560px] bg-blue opacity-40" />
        </>
      )}
      {variant === "cta" && (
        <>
          <div className="blob blob-a left-[-120px] top-[-160px] h-[520px] w-[520px] bg-purple opacity-50" />
          <div className="blob blob-b right-[-140px] bottom-[-200px] h-[560px] w-[560px] bg-pink opacity-50" />
          <div className="blob blob-c left-[35%] top-[20%] h-[420px] w-[520px] bg-blue opacity-40" />
        </>
      )}
    </div>
  );
}
