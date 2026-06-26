"use client";

import { logoutAction } from "@/app/auth-actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-full border border-[#694E4E]/20 bg-[#FFFFFF]/45 px-4 text-sm font-semibold text-[#694E4E] transition hover:border-[#694E4E]/45 hover:text-[#694E4E]"
      >
        Logout
      </button>
    </form>
  );
}
