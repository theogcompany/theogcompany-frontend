import { Mail } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { LinkedInIcon } from "@/components/ui/Icons";

export function Footer() {
  const f = site.footer;
  return (
    <footer className="cv-auto border-t border-line-strong pb-28 pt-14 md:pb-14 [contain-intrinsic-size:auto_320px]">
      <div className="container-page flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <a href="#top" className="w-fit rounded-lg" aria-label={`${site.name}, back to top`}>
            <Logo id="footer-logo" />
          </a>
          <p className="text-[15px] text-body">{f.line}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8">
            {f.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-body transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 text-[15px] text-body transition-colors hover:text-ink"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-[15px] text-body transition-colors hover:text-ink"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <div className="container-page mt-12">
        <p className="text-[13px] text-subtle">{f.copyright}</p>
        <p className="mt-2 max-w-[720px] text-[12px] leading-relaxed text-subtle">{f.trademarks}</p>
      </div>
    </footer>
  );
}
