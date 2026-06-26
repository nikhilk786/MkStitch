"use client";

import { useActionState } from "react";
import {
  adminLoginAction,
  type AdminLoginState,
} from "@/app/admin/login/actions";

const initialState: AdminLoginState = {};

export function AdminLoginForm({
  unauthorized,
}: {
  unauthorized: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    adminLoginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      {unauthorized ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          Please sign in with an administrator account.
        </div>
      ) : null}

      {state.error ? (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="admin-email" className="text-sm font-semibold text-[#694E4E]">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-2xl border border-[#694E4E] bg-white px-4 text-sm text-[#694E4E] outline-none transition focus:border-[#694E4E] focus:ring-4 focus:ring-[#FFCEE3]/15"
          placeholder="admin@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="text-sm font-semibold text-[#694E4E]"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-12 w-full rounded-2xl border border-[#694E4E] bg-white px-4 text-sm text-[#694E4E] outline-none transition focus:border-[#694E4E] focus:ring-4 focus:ring-[#FFCEE3]/15"
          placeholder="Your password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#694E4E] to-[#694E4E] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Login to admin"}
      </button>
    </form>
  );
}
