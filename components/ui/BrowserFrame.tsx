import { cn } from "@/lib/cn";

export function WindowDots() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
    </span>
  );
}

export function BrowserFrame({
  title,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("glass overflow-hidden rounded-[20px] shadow-float", className)}>
      <div className="flex h-10 items-center gap-3 border-b border-line bg-white/50 px-4">
        <WindowDots />
        {title && <span className="mx-auto truncate pr-10 text-[12px] font-medium text-subtle">{title}</span>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
