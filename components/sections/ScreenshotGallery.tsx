"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { site } from "@/content/site";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

type Shot = (typeof site.origin.screenshots)[number];

function Lightbox({ shot, onClose }: { shot: Shot | null; onClose: () => void }) {
  useEffect(() => {
    if (!shot) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault(); // single focusable control: keep focus on the close button
        document.getElementById("lightbox-close")?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.getElementById("lightbox-close")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      returnTo?.focus?.();
    };
  }, [shot, onClose]);

  if (!shot) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.caption}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
    >
      <button
        id="lightbox-close"
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <figure className="max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
        <Image src={shot.src} alt={shot.alt} width={1200} height={800} className="h-auto max-h-[80vh] w-auto rounded-2xl shadow-float" />
        <figcaption className="mt-3 text-center text-[14px] text-white/90">{shot.caption}</figcaption>
      </figure>
    </div>
  );
}

/** Screenshot strip with hover lift and an in-house lightbox. */
export function ScreenshotGallery() {
  const [active, setActive] = useState<Shot | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {site.origin.screenshots.map((shot) => (
          <li key={shot.src}>
            <button
              type="button"
              onClick={() => setActive(shot)}
              aria-label={`Enlarge: ${shot.caption}`}
              className="group block w-full rounded-[20px] text-left"
            >
              <BrowserFrame className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.02] motion-reduce:group-hover:transform-none">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="block h-auto w-full"
                />
              </BrowserFrame>
            </button>
            <p className="mt-3 text-[14px] text-subtle">{shot.caption}</p>
          </li>
        ))}
      </ul>
      <Lightbox shot={active} onClose={close} />
    </>
  );
}
