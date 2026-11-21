import {
  Search,
  Wrench,
  FileText,
  Users,
  RefreshCw,
  ChartLine,
  CalendarCheck,
  KeyRound,
  CircleCheck,
  ShieldCheck,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "@/content/site";

const map: Record<IconName, ComponentType<LucideProps>> = {
  search: Search,
  wrench: Wrench,
  "file-text": FileText,
  users: Users,
  refresh: RefreshCw,
  chart: ChartLine,
  calendar: CalendarCheck,
  key: KeyRound,
  "check-circle": CircleCheck,
  shield: ShieldCheck,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" strokeWidth={1.75} {...props} />;
}

/** lucide no longer ships brand icons, so LinkedIn is inlined. */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  );
}
