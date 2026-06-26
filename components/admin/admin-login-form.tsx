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
        <label htmlFor="admin-email" className="text-sm font-semibold text-[#38243c]">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-2xl border border-[#ead8e6] bg-white px-4 text-sm text-[#38243c] outline-none transition focus:border-[#dd7bdf] focus:ring-4 focus:ring-[#f9b2d7]/15"
          placeholder="admin@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="text-sm font-semibold text-[#38243c]"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-12 w-full rounded-2xl border border-[#ead8e6] bg-white px-4 text-sm text-[#38243c] outline-none transition focus:border-[#dd7bdf] focus:ring-4 focus:ring-[#f9b2d7]/15"
          placeholder="Your password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-12 w-full rounded-2xl bg-gradient-to-r from-[#6f3473] to-[#a44fa7] px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Login to admin"}
      </button>
    </form>
  );
}
