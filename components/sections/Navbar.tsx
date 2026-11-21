"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-[var(--surface)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="rounded-lg" aria-label={`${site.name}, back to top`}>
          <Logo id="nav-logo" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-body transition-colors hover:bg-ink/[0.04] hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <BookCallButton size="sm" className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.05] md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-bg/95 px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-6 backdrop-blur-xl transition-[opacity,transform] duration-300 md:hidden",
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {site.nav.map((l) => (
            <li key={l.href} className="border-b border-line-strong">
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-5 text-[24px] font-semibold tracking-[-0.02em] text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto" onClick={() => setMenuOpen(false)}>
          <BookCallButton size="lg" fullWidth />
        </div>
      </div>
    </header>
  );
}
