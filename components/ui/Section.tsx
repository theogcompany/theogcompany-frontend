import { cn } from "@/lib/cn";
import { Pill } from "./Pill";
import { Reveal, RevealItem } from "./Reveal";

export function Section({
  id,
  eyebrow,
  title,
  sub,
  children,
  className,
  headerClassName,
  align = "center",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "center" | "left";
}) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={cn("relative section-y", className)}>
      <div className="container-page">
        <Reveal
          as="header"
          className={cn(
            "flex flex-col gap-5",
            align === "center" ? "mx-auto max-w-[760px] items-center text-center" : "max-w-[720px]",
            headerClassName,
          )}
        >
          {eyebrow && (
            <RevealItem>
              <Pill>{eyebrow}</Pill>
            </RevealItem>
          )}
          <RevealItem>
            <h2 id={titleId} className="text-h2">
              {title}
            </h2>
          </RevealItem>
          {sub && (
            <RevealItem>
              <p className="max-w-[620px] text-[18px] leading-relaxed text-body">{sub}</p>
            </RevealItem>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
