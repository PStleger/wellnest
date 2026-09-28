import Link from "next/link";

import type { CalendarDay } from "@/lib/somatic/insights";
import { describeSensation } from "@/lib/somatic/describe";
import type { DateFormatter } from "@/lib/time";
import { cn } from "@/lib/utils";

import { SensationOrb } from "./check-in-item";

/** One orb per day: the most recent feeling that day, or an empty ring. */
export function WeekStrip({ days, format }: { days: CalendarDay[]; format: DateFormatter }) {
  return (
    <ol className="grid grid-cols-7 gap-2 sm:gap-4">
      {days.map((day, index) => {
        const latest = day.checkIns.at(-1);
        const isToday = index === days.length - 1;
        return (
          <li key={day.key} className="flex flex-col items-center gap-2 text-center">
            {latest ? (
              <Link href={`/check-ins/${latest.id}`} className="rounded-full">
                <SensationOrb
                  sensation={latest.sensation}
                  className="size-11 sm:size-14"
                  label={`${format.longDay(day.date)}: ${describeSensation(latest.sensation)}`}
                />
              </Link>
            ) : (
              <span
                className="size-11 rounded-full border-2 border-dashed border-line-strong sm:size-14"
                role="img"
                aria-label={`${format.longDay(day.date)}: no check-in`}
              />
            )}
            <span className={cn("text-xs sm:text-sm", isToday ? "font-semibold text-ink" : "text-ink-muted")}>
              {isToday ? "Today" : format.weekday(day.date)}
            </span>
            {day.checkIns.length > 1 ? (
              <span className="-mt-1.5 text-xs text-ink-muted">+{day.checkIns.length - 1}</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
