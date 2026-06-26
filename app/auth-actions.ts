"use server";

import { AuthError } from "next-auth";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { assertDatabaseUrl, db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export type AuthFormState = {
  error?: string;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getFriendlyDatabaseError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (
    error instanceof Error &&
    (error.message.includes("DATABASE_URL is required") ||
      error.message.includes("DATABASE_URL is not a valid"))
  ) {
    return "DATABASE_URL missing ya invalid hai. .env.local me correct Supabase Postgres URL add karein.";
  }

  if (message.includes("password authentication failed")) {
    return "Database password galat lag raha hai. Supabase DATABASE_URL me correct, URL-encoded database password use karein.";
  }

  if (message.includes('database "postgres" does not exist')) {
    return "DATABASE_URL ke end me database name galat hai. Supabase URL me database usually /postgres hota hai.";
  }

  if (message.includes("relation") && message.includes("users")) {
    return "Supabase me users table missing hai. Terminal me npm run db:push chalayein.";
  }

  if (message.includes("ssl") || message.includes("no pg_hba.conf entry")) {
    return "Supabase connection SSL maang raha hai. DATABASE_URL ke end me ?sslmode=require add karein.";
  }

  if (
    message.includes("timeout") ||
    message.includes("econnrefused") ||
    message.includes("enotfound")
  ) {
    return "Database server unreachable. Supabase project active and DATABASE_URL host/port correct hain ye check karein.";
  }

  return "Database se connect nahi ho pa raha. DATABASE_URL aur Supabase connection settings check karein.";
}

export async function signupAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email").toLowerCase();
  const password = getStringValue(formData, "password");

  if (name.length < 2) {
    return { error: "Name kam se kam 2 characters ka hona chahiye." };
  }

  if (!email || !email.includes("@")) {
    return { error: "Please valid email address enter karein." };
  }

  if (password.length < 8) {
    return { error: "Password kam se kam 8 characters ka hona chahiye." };
  }

  try {
    assertDatabaseUrl();

    const [existingUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return { error: "Is email se account already bana hua hai." };
    }

    const hashedPassword = await hash(password, 12);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return { error: getFriendlyDatabaseError(error) };
  }

  redirect("/login?registered=1");
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = getStringValue(formData, "email").toLowerCase();
  const password = getStringValue(formData, "password");

  if (!email || !password) {
    return { error: "Email aur password dono required hain." };
  }

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: "/dashboard",
    });

    if (typeof result === "string") {
      const resultUrl = new URL(result, "http://localhost");

      if (resultUrl.searchParams.has("error")) {
        return { error: "Email ya password galat hai." };
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CallbackRouteError") {
        return { error: getFriendlyDatabaseError(error.cause?.err ?? error) };
      }

      return { error: "Email ya password galat hai." };
    }

    throw error;
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await signOut({
    redirect: false,
    redirectTo: "/",
  });

  redirect("/");
}
