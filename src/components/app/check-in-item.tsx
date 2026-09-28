import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Orb } from "@/components/somatic/orb";
import type { CheckInRow } from "@/lib/db/schema";
import { describeSensation, describeShift } from "@/lib/somatic/describe";
import type { DateFormatter } from "@/lib/time";
import { cn } from "@/lib/utils";

export function SensationOrb({
  sensation,
  className,
  label,
}: {
  sensation: CheckInRow["before"];
  className?: string;
  label?: string;
}) {
  return (
    <Orb
      color={sensation.color}
      shape={sensation.shape}
      customPath={sensation.customPath}
      texture={sensation.texture}
      className={className}
      label={label}
    />
  );
}

export function CheckInItem({ row, format }: { row: CheckInRow; format: DateFormatter }) {
  const shift = describeShift(row.before, row.after);
  const eased = row.after && row.after.intensity < row.before.intensity;

  return (
    <li>
      <Link
        href={`/check-ins/${row.id}`}
        className="group flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft transition hover:border-line-strong hover:shadow-lift"
      >
        <div className="flex shrink-0 items-center -space-x-3">
          <SensationOrb sensation={row.before} className="size-14" />
          {row.after ? <SensationOrb sensation={row.after} className="size-10 self-end" /> : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">
            {row.feeling || describeSensation(row.before, { withIntensity: false })}
          </p>
          <p className="mt-0.5 text-sm text-ink-muted">
            <time dateTime={row.createdAt.toISOString()}>
              {format.day(row.createdAt)}, {format.time(row.createdAt)}
            </time>
            {" · "}
            <span className={cn(eased && "font-medium text-sage")}>{shift}</span>
          </p>
        </div>
        <ArrowRight
          className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
        <span className="sr-only">View check-in</span>
      </Link>
    </li>
  );
}
