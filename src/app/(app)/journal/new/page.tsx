import type { Metadata } from "next";
import { Suspense } from "react";

import { SensationOrb } from "@/components/app/check-in-item";
import { PageHeader, Skeleton } from "@/components/app/page-header";
import { EntryForm } from "@/components/journal/entry-form";
import { PageTransition } from "@/components/motion/page-transition";
import { getCheckIn } from "@/lib/data/check-ins";
import { describeSensation } from "@/lib/somatic/describe";

import { createEntry } from "../actions";

export const metadata: Metadata = { title: "New journal entry" };

export default function NewEntryPage({ searchParams }: PageProps<"/journal/new">) {
  return (
    <PageTransition>
      <PageHeader title="New entry" description="Write freely. Nobody else will read this." />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <NewEntry searchParams={searchParams} />
      </Suspense>
    </PageTransition>
  );
}

async function NewEntry({ searchParams }: { searchParams: PageProps<"/journal/new">["searchParams"] }) {
  const { checkIn: checkInId } = await searchParams;
  const checkIn = typeof checkInId === "string" ? await getCheckIn(checkInId) : null;
  const sensation = checkIn ? (checkIn.after ?? checkIn.before) : null;

  return (
    <div className="space-y-8">
      {checkIn && sensation ? (
        <div className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft">
          <SensationOrb sensation={sensation} className="size-14 shrink-0" />
          <p>
            <span className="block text-sm font-semibold text-primary">Writing about your check-in</span>
            <span className="text-ink-muted">{describeSensation(sensation)}</span>
          </p>
        </div>
      ) : null}
      <EntryForm action={createEntry} checkInId={checkIn?.id} />
    </div>
  );
}
