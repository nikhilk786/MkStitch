"use client";

import { useId, useActionState } from "react";
import {
  subscribeNewsletterAction,
  type EmailActionState,
} from "@/app/email-actions";

const initialState: EmailActionState = {
  success: false,
  message: "",
};

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [state, formAction, isPending] = useActionState(
    subscribeNewsletterAction,
    initialState,
  );

  return (
    <form action={formAction} className={compact ? "mt-5" : "flex flex-col gap-3 sm:flex-row"}>
      <div className={compact ? "flex overflow-hidden rounded-full border border-[#978F66]/25 bg-[#fffdf7]/55 p-1" : "contents"}>
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          maxLength={255}
          placeholder="Email address"
          className={
            compact
              ? "min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[#5C4F4A]/60"
              : "h-13 flex-1 rounded-full border border-[#978F66]/25 bg-[#fffdf7]/75 px-5 text-sm text-[#5C4F4A] outline-none placeholder:text-[#5C4F4A]/55 focus:border-[#978F66]"
          }
        />
        <button
          type="submit"
          disabled={isPending}
          className={
            compact
              ? "rounded-full bg-[#978F66] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#5C4F4A] disabled:cursor-wait disabled:opacity-70"
              : "h-13 rounded-full bg-[#5C4F4A] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#978F66] disabled:cursor-wait disabled:opacity-70"
          }
        >
          {isPending ? "Joining..." : compact ? "Join" : "Join the list"}
        </button>
      </div>

      {state.message ? (
        <div
          role="status"
          className={`mt-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
            state.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </div>
      ) : null}
    </form>
  );
}
