"use client";

import { logoutAction } from "@/app/auth-actions";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center rounded-full border border-[#978F66]/20 bg-[#fffdf7]/45 px-4 text-sm font-semibold text-[#5C4F4A] transition hover:border-[#978F66]/45 hover:text-[#978F66]"
      >
        Logout
      </button>
    </form>
  );
}
