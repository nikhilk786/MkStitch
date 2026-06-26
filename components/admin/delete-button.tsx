"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-[#f1c4d2] px-3 py-1.5 text-xs font-semibold text-[#a33e5e] transition-colors hover:bg-[#fff0f4] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export function DeleteButton({
  action,
  itemName,
}: {
  action: () => Promise<void>;
  itemName: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Delete "${itemName}"? This action cannot be undone.`,
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <SubmitButton />
    </form>
  );
}
