"use server";

import { AuthError } from "next-auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export type AdminLoginState = {
  error?: string;
};

export async function adminLoginAction(
  _state: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email =
    typeof emailValue === "string" ? emailValue.toLowerCase().trim() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const [adminUser] = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (adminUser?.role !== "admin") {
      return { error: "Invalid admin email or password." };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid admin email or password." };
    }

    console.error("Admin login failed", error);
    return { error: "Admin login is currently unavailable. Please try again." };
  }

  redirect("/admin");
}
