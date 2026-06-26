"use client";

import { useActionState } from "react";
import {
  sendContactEmailAction,
  type EmailActionState,
} from "@/app/email-actions";

const initialState: EmailActionState = {
  success: false,
  message: "",
};

const inputClass =
  "mt-2 h-12 w-full rounded-full border border-[#694E4E]/22 bg-[#F5F5F5] px-4 text-sm outline-none transition focus:border-[#694E4E]";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactEmailAction,
    initialState,
  );

  return (
    <form action={formAction} className="boutique-shadow rounded-[2rem] border border-[#694E4E]/18 bg-[#FFFFFF] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={120}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="phone" className="text-sm font-semibold">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          maxLength={40}
          className={inputClass}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="subject" className="text-sm font-semibold">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          maxLength={160}
          className={inputClass}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={3000}
          className="mt-2 w-full resize-none rounded-2xl border border-[#694E4E]/22 bg-[#F5F5F5] px-4 py-3 text-sm outline-none transition focus:border-[#694E4E]"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-[#694E4E] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#694E4E] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>

      {state.message ? (
        <div
          role="status"
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-medium ${
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
