import Image from "next/image";
import { Check, Minus, X } from "lucide-react";
import { site, type Cell } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { LinkedInIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

function CellValue({ value, highlight }: { value: Cell; highlight: boolean }) {
  if (value === "yes")
    return (
      <span className={cn("inline-flex h-7 w-7 items-center justify-center rounded-full", highlight ? "bg-ink text-white" : "bg-ink/[0.06] text-ink")}>
        <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-subtle">
        <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span className="sr-only">No</span>
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex items-center gap-1.5 text-[14px] text-subtle">
        <Minus className="h-4 w-4" aria-hidden="true" />
        Partial
      </span>
    );
  return <span className={cn("text-[14px]", highlight ? "font-semibold text-ink" : "text-body")}>{value}</span>;
}

export function WhyUs() {
  const w = site.whyUs;
  const f = w.founder;
  return (
    <Section id={w.id} eyebrow={w.eyebrow} title={w.title}>
      <Reveal className="mt-14 md:mt-16">
        <RevealItem>
          <div className="glass overflow-x-auto rounded-[24px]">
            <div className="relative min-w-[680px]">
              {/* Highlighted column: subtle gradient border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 left-[40%] top-2 w-[20%] rounded-[20px] bg-white/80 p-px shadow-card [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#8B7CF6,#C084FC,#F0ABFC)_border-box] [border:1.5px_solid_transparent]"
              />
              <table className="relative w-full table-fixed text-left">
                <caption className="sr-only">Comparison of The OG Company, a typical agency and DIY tools</caption>
                <colgroup>
                  <col className="w-[40%]" />
                  <col className="w-[20%]" />
                  <col className="w-[20%]" />
                  <col className="w-[20%]" />
                </colgroup>
                <thead>
                  <tr>
                    <td className="px-6 py-5" />
                    {w.columns.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={cn("px-4 py-5 text-center text-[15px] font-semibold", i === 0 ? "text-ink" : "text-body")}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {w.rows.map((r) => (
                    <tr key={r.label} className="border-t border-line-strong">
                      <th scope="row" className="px-6 py-4 text-[15px] font-normal leading-snug text-ink/85">
                        {r.label}
                      </th>
                      {r.cells.map((c, i) => (
                        <td key={i} className="px-4 py-4 text-center">
                          <CellValue value={c} highlight={i === 0} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </RevealItem>

        <RevealItem className="mt-8">
          <div className="glass flex flex-col items-start gap-5 rounded-[24px] p-6 sm:flex-row sm:items-center md:p-7">
            <Image
              src={f.photo}
              alt={`Portrait of ${f.name}, ${f.role} of ${site.name}`}
              width={160}
              height={160}
              loading="lazy"
              className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-white"
            />
            <div className="flex-1">
              <p className="text-[18px] font-semibold text-ink">
                {f.name} <span className="font-normal text-subtle">· {f.role}</span>
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-body">{f.bio}</p>
            </div>
            <a
              href={f.linkedin}
              target="_blank"
              rel="noopener"
              aria-label={`${f.name} on LinkedIn (opens in a new tab)`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          </div>
        </RevealItem>
      </Reveal>
    </Section>
  );
}
