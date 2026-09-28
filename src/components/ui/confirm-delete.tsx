"use client";

import { Trash2 } from "lucide-react";
import { useId, useRef } from "react";

import { Button } from "./button";
import { SubmitButton } from "./submit-button";

/** A destructive action behind a native modal dialog (focus trap, Esc and backdrop for free). */
export function ConfirmDelete({
  action,
  label,
  description,
  confirmLabel = "Delete",
}: {
  action: () => Promise<void>;
  label: string;
  description: string;
  confirmLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  return (
    <>
      <Button
        variant="ghost"
        className="text-danger hover:bg-danger-soft"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Trash2 className="size-4" aria-hidden="true" /> {label}
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-(--radius-card) border border-line bg-surface p-7 text-ink shadow-lift backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          // Clicking the backdrop closes the dialog.
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <h2 id={titleId} className="text-2xl">
          {label}?
        </h2>
        <p id={descriptionId} className="mt-2 text-ink-muted">
          {description}
        </p>
        <form action={action} className="mt-7 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={() => dialogRef.current?.close()} autoFocus>
            Cancel
          </Button>
          <SubmitButton variant="danger" pendingLabel="Deleting…">
            {confirmLabel}
          </SubmitButton>
        </form>
      </dialog>
    </>
  );
}
