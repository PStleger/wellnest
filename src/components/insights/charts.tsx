import Link from "next/link";
import type { ReactNode } from "react";

import { SensationOrb } from "@/components/app/check-in-item";
import type { CheckInRow } from "@/lib/db/schema";
import { describeSensation } from "@/lib/somatic/describe";
import type { CalendarDay } from "@/lib/somatic/insights";
import type { DateFormatter } from "@/lib/time";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Stat tile                                                           */
/* ------------------------------------------------------------------ */

export function StatTile({ label, value, detail }: { label: string; value: ReactNode; detail?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight">{value}</dd>
      {detail ? <dd className="mt-1 text-sm text-ink-muted">{detail}</dd> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tooltip (CSS only: shows on hover and keyboard focus)               */
/* ------------------------------------------------------------------ */

function Tip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 rounded-xl bg-ink px-3 py-2 text-xs whitespace-nowrap text-canvas shadow-lift group-hover:block group-focus-visible:block",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Colour calendar                                                     */
/* ------------------------------------------------------------------ */

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ColourCalendar({ days, format }: { days: CalendarDay[]; format: DateFormatter }) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-3" aria-hidden="true">
        {weekdays.map((day) => (
          <span key={day} className="pb-1 text-center text-xs font-medium text-ink-muted">
            {day}
          </span>
        ))}
      </div>
      <ol className="grid grid-cols-7 gap-1.5 sm:gap-3">
        {days.map((day, index) => {
          const latest = day.checkIns.at(-1);
          const isToday = index === days.length - 1;
          const label = `${format.longDay(day.date)}: ${
            latest
              ? `${day.checkIns.length} check-in${day.checkIns.length > 1 ? "s" : ""}, latest ${describeSensation(latest.sensation)}`
              : "no check-in"
          }`;
          const cell = (
            <>
              <span
                className={cn(
                  "absolute top-1.5 left-2 text-[0.7rem] text-ink-muted",
                  isToday && "font-bold text-ink",
                )}
              >
                {format.dayOfMonth(day.date)}
              </span>
              {latest ? <SensationOrb sensation={latest.sensation} className="size-[62%]" /> : null}
              {day.checkIns.length > 1 ? (
                <span className="absolute right-1.5 bottom-1 text-[0.65rem] font-semibold text-ink-muted">
                  +{day.checkIns.length - 1}
                </span>
              ) : null}
            </>
          );
          return (
            <li key={day.key}>
              {latest ? (
                <Link
                  href={`/check-ins/${latest.id}`}
                  aria-label={label}
                  className="group relative grid aspect-square place-items-center rounded-2xl bg-surface-2/60 transition hover:bg-surface-2"
                >
                  {cell}
                  <Tip>{format.day(day.date)}</Tip>
                </Link>
              ) : (
                <span
                  role="img"
                  aria-label={label}
                  className={cn(
                    "relative grid aspect-square place-items-center rounded-2xl border border-dashed border-line",
                    isToday && "border-solid border-line-strong",
                  )}
                >
                  {cell}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after dumbbell                                             */
/* ------------------------------------------------------------------ */

export function ShiftChart({ rows, format }: { rows: CheckInRow[]; format: DateFormatter }) {
  const paired = rows.filter((row) => row.after).toReversed();
  const y = (value: number) => `${100 - value * 10}%`;

  return (
    <figure>
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-chart-before" aria-hidden="true" /> Before
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-chart-after" aria-hidden="true" /> After staying with it
        </span>
      </div>

      <div className="flex gap-3">
        {/* y-axis */}
        <div
          className="relative h-56 w-5 shrink-0 text-right text-xs text-ink-muted tabular-nums"
          aria-hidden="true"
        >
          {[10, 5, 0].map((tick) => (
            <span key={tick} className="absolute right-0 -translate-y-1/2" style={{ top: y(tick) }}>
              {tick}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div className="relative h-56">
            {[10, 5, 0].map((tick) => (
              <span
                key={tick}
                aria-hidden="true"
                className="absolute inset-x-0 h-px bg-line"
                style={{ top: y(tick) }}
              />
            ))}
            <ol className="absolute inset-0 flex">
              {paired.map((row, index) => {
                const before = row.intensityBefore;
                const after = row.intensityAfter ?? before;
                const top = Math.max(before, after);
                const bottom = Math.min(before, after);
                const label = `${format.day(row.createdAt)}: ${before} before, ${after} after`;
                return (
                  <li
                    key={row.id}
                    className={cn("relative flex-1", index < paired.length - 8 && "max-sm:hidden")}
                  >
                    <Link
                      href={`/check-ins/${row.id}`}
                      aria-label={label}
                      className="group absolute inset-y-0 right-0.5 left-0.5 mx-auto max-w-10 min-w-6 rounded-full hover:bg-surface-2/70 focus-visible:bg-surface-2/70"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-line-strong"
                        style={{ top: y(top), bottom: `${bottom * 10}%` }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-before ring-2 ring-surface"
                        style={{ top: y(before) }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chart-after ring-2 ring-surface"
                        style={{ top: y(after) }}
                      />
                      <Tip>
                        {format.day(row.createdAt)} · {before} → {after}
                      </Tip>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="mt-2 flex justify-between text-xs text-ink-muted" aria-hidden="true">
            <span className="max-sm:hidden">{paired[0] ? format.day(paired[0].createdAt) : ""}</span>
            <span className="sm:hidden">
              {paired.at(-8)
                ? format.day(paired.at(-8)!.createdAt)
                : paired[0]
                  ? format.day(paired[0].createdAt)
                  : ""}
            </span>
            <span>{paired.at(-1) ? format.day(paired.at(-1)!.createdAt) : ""}</span>
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Intensity before and after each check-in, oldest first. A table follows.
      </figcaption>
      <details className="mt-5 text-sm">
        <summary className="inline-flex min-h-10 cursor-pointer items-center font-semibold text-primary">
          Show as a table
        </summary>
        <table className="mt-3 w-full text-left">
          <thead className="text-ink-muted">
            <tr>
              <th scope="col" className="py-2 font-medium">
                Date
              </th>
              <th scope="col" className="py-2 text-right font-medium">
                Before
              </th>
              <th scope="col" className="py-2 text-right font-medium">
                After
              </th>
              <th scope="col" className="py-2 text-right font-medium">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {paired.map((row) => {
              const change = (row.intensityAfter ?? row.intensityBefore) - row.intensityBefore;
              return (
                <tr key={row.id} className="border-t border-line">
                  <td className="py-2">{format.day(row.createdAt)}</td>
                  <td className="py-2 text-right">{row.intensityBefore}</td>
                  <td className="py-2 text-right">{row.intensityAfter}</td>
                  <td className="py-2 text-right">{change > 0 ? `+${change}` : change}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal bars (single series, value at the tip)                   */
/* ------------------------------------------------------------------ */

export function BarList({ items, unit }: { items: { label: string; value: number }[]; unit: string }) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.label}
          className="grid grid-cols-[7rem_1fr] items-center gap-3 text-sm sm:grid-cols-[8rem_1fr]"
        >
          <span className="block truncate text-ink first-letter:uppercase">{item.label}</span>
          <span className="flex items-center gap-2">
            <span
              className="h-4 rounded-r-[4px] bg-chart-after"
              style={{ width: `${(item.value / max) * 85}%`, minWidth: item.value ? "4px" : 0 }}
              aria-hidden="true"
            />
            <span className="text-ink-muted tabular-nums">
              {item.value}
              <span className="sr-only"> {unit}</span>
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
