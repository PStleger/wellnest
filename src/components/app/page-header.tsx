import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="mb-2 text-sm font-semibold text-primary">{eyebrow}</p> : null}
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {description ? <p className="mt-3 text-lg text-ink-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}

export function SectionHeader({ id, title, action }: { id: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 id={id} className="text-2xl sm:text-3xl">
        {title}
      </h2>
      {action}
    </div>
  );
}

export function EmptyState({
  title,
  body,
  action,
  art,
}: {
  title: string;
  body: ReactNode;
  action?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-(--radius-card) border border-dashed border-line-strong px-6 py-12 text-center">
      {art}
      <h3 className="mt-4 text-2xl">{title}</h3>
      <p className="mt-2 max-w-md text-ink-muted">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("animate-pulse rounded-3xl bg-surface-2", className)} />;
}
