import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageHeader, Skeleton } from "@/components/app/page-header";
import { EntryForm } from "@/components/journal/entry-form";
import { PageTransition } from "@/components/motion/page-transition";
import { getJournalEntry } from "@/lib/data/journal";

import { updateEntry } from "../../actions";

export const metadata: Metadata = { title: "Edit entry" };

export default function EditEntryPage({ params }: PageProps<"/journal/[id]/edit">) {
  return (
    <PageTransition>
      <PageHeader title="Edit entry" />
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Edit params={params} />
      </Suspense>
    </PageTransition>
  );
}

async function Edit({ params }: { params: PageProps<"/journal/[id]/edit">["params"] }) {
  const { id } = await params;
  const entry = await getJournalEntry(id);
  if (!entry) notFound();

  return (
    <EntryForm
      action={updateEntry.bind(null, entry.id)}
      defaults={{ title: entry.title, body: entry.body, prompt: entry.prompt }}
      submitLabel="Save changes"
      showPrompts={false}
    />
  );
}
