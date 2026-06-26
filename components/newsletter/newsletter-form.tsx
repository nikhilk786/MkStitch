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
      <div className={compact ? "flex overflow-hidden rounded-full border border-[#694E4E]/25 bg-[#FFFFFF]/55 p-1" : "contents"}>
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
              ? "min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[#694E4E]/60"
              : "h-13 flex-1 rounded-full border border-[#694E4E]/25 bg-[#FFFFFF]/75 px-5 text-sm text-[#694E4E] outline-none placeholder:text-[#694E4E]/55 focus:border-[#694E4E]"
          }
        />
        <button
          type="submit"
          disabled={isPending}
          className={
            compact
              ? "rounded-full bg-[#694E4E] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#694E4E] disabled:cursor-wait disabled:opacity-70"
              : "h-13 rounded-full bg-[#694E4E] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#694E4E] disabled:cursor-wait disabled:opacity-70"
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
