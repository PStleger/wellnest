"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useOptimistic, useTransition } from "react";

import { toggleBookmark } from "@/app/bookmark-actions";
import { buttonStyles } from "@/components/ui/button";

export function BookmarkButton({
  slug,
  saved,
  compact,
}: {
  slug: string;
  saved: boolean;
  compact?: boolean;
}) {
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(saved);
  const [, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-pressed={optimisticSaved}
      onClick={() =>
        startTransition(async () => {
          setOptimisticSaved(!optimisticSaved);
          await toggleBookmark(slug, !optimisticSaved);
        })
      }
      className={buttonStyles({
        variant: optimisticSaved ? "soft" : "secondary",
        size: compact ? "sm" : "md",
      })}
    >
      {optimisticSaved ? (
        <BookmarkCheck className="size-4" aria-hidden="true" />
      ) : (
        <Bookmark className="size-4" aria-hidden="true" />
      )}
      {optimisticSaved ? "Saved" : "Save for later"}
    </button>
  );
}
