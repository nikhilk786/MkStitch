"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthFormState } from "@/app/auth-actions";

const initialState: AuthFormState = {};

export function LoginForm({
  registered,
}: {
  registered: boolean;
}) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5 text-[#694E4E]">
      {registered ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Account created. Ab login kar sakte ho.
        </div>
      ) : null}

      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-full border border-[#694E4E]/22 bg-[#F5F5F5] px-5 text-sm outline-none transition focus:border-[#694E4E] focus:ring-4 focus:ring-[#FFCEE3]/30"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-semibold"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-12 w-full rounded-full border border-[#694E4E]/22 bg-[#F5F5F5] px-5 text-sm outline-none transition focus:border-[#694E4E] focus:ring-4 focus:ring-[#FFCEE3]/30"
          placeholder="Your password"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-full bg-[#694E4E] px-6 text-sm font-semibold text-white shadow-lg shadow-[#694E4E]/15 transition hover:-translate-y-0.5 hover:bg-[#694E4E] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-sm text-[#694E4E]/65">
        New to MKSTITCH?{" "}
        <Link href="/signup" className="font-semibold text-[#694E4E]">
          Create account
        </Link>
      </p>
    </form>
  );
}
