import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Static logo row shown under the hero CTA below 1024px (no lines, no motion). */
export function EngineLogoRow({ className }: { className?: string }) {
  const n = site.hero.network;
  return (
    <div className={cn("flex flex-col items-center gap-2.5", className)}>
      <ul aria-label={n.label} className="flex items-center gap-4">
        {n.engines.map((e) => (
          <li key={e.id}>
            <Image
              src={`/logos/${e.id}.svg`}
              alt={e.name}
              width={28}
              height={28}
              className="h-7 w-7 opacity-70 grayscale"
            />
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-subtle">{n.caption}</p>
    </div>
  );
}
