import { cn } from "@/lib/cn";

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] leading-none font-medium text-ink shadow-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
