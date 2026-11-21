import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return <As className={cn("glass rounded-[24px]", className)}>{children}</As>;
}
