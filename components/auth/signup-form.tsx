"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction, type AuthFormState } from "@/app/auth-actions";

const initialState: AuthFormState = {};

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  

  return (
    <form action={formAction} className="mt-8 space-y-5 text-[#5C4F4A]">
      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="mt-2 h-12 w-full rounded-full border border-[#978F66]/22 bg-[#fbf8ef] px-5 text-sm outline-none transition focus:border-[#978F66] focus:ring-4 focus:ring-[#E4D6A9]/30"
          placeholder="Your name"
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
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-full border border-[#978F66]/22 bg-[#fbf8ef] px-5 text-sm outline-none transition focus:border-[#978F66] focus:ring-4 focus:ring-[#E4D6A9]/30"
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
          autoComplete="new-password"
          minLength={8}
          required
          className="mt-2 h-12 w-full rounded-full border border-[#978F66]/22 bg-[#fbf8ef] px-5 text-sm outline-none transition focus:border-[#978F66] focus:ring-4 focus:ring-[#E4D6A9]/30"
          placeholder="Minimum 8 characters"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-full bg-[#5C4F4A] px-6 text-sm font-semibold text-white shadow-lg shadow-[#5C4F4A]/15 transition hover:-translate-y-0.5 hover:bg-[#978F66] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-[#5C4F4A]/65">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#978F66]">
          Login
        </Link>
      </p>
    </form>
  );
}
