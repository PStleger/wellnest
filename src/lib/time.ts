import "server-only";

import { cookies } from "next/headers";

function isValidTimeZone(zone: string) {
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: zone });
    return true;
  } catch {
    return false;
  }
}

/** The visitor's time zone, set by the inline boot script in the root layout. */
export async function getTimeZone() {
  const zone = (await cookies()).get("tz")?.value;
  const decoded = zone ? decodeURIComponent(zone) : "";
  return decoded && isValidTimeZone(decoded) ? decoded : "UTC";
}

export type DateFormatter = ReturnType<typeof createFormatter>;

export function createFormatter(timeZone: string) {
  const make = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone, ...options });

  const dayKeyFormat = make({ year: "numeric", month: "2-digit", day: "2-digit" });
  const hourFormat = make({ hour: "numeric", hourCycle: "h23" });

  return {
    timeZone,
    /** "Mon 21 Sept" */
    day: (date: Date) => make({ weekday: "short", day: "numeric", month: "short" }).format(date),
    /** "Monday 21 September" */
    longDay: (date: Date) => make({ weekday: "long", day: "numeric", month: "long" }).format(date),
    /** "21 September 2026" */
    date: (date: Date) => make({ day: "numeric", month: "long", year: "numeric" }).format(date),
    /** "September 2026" */
    month: (date: Date) => make({ month: "long", year: "numeric" }).format(date),
    /** "14:05" */
    time: (date: Date) => make({ hour: "2-digit", minute: "2-digit" }).format(date),
    /** "21" */
    dayOfMonth: (date: Date) => make({ day: "numeric" }).format(date),
    /** "Mon" */
    weekday: (date: Date) => make({ weekday: "short" }).format(date),
    /** Stable per-day key in the visitor's zone, e.g. "21/09/2026". */
    dayKey: (date: Date) => dayKeyFormat.format(date),
    hour: (date: Date) => Number(hourFormat.format(date)),
  };
}

export function greeting(hour: number) {
  if (hour < 5) return "Still up";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
