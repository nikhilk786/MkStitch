import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  const { registered } = await searchParams;

  return (
    <main className="relative overflow-hidden bg-[#fbf8ef] text-[#5C4F4A]">
      <div className="boutique-gradient absolute inset-0 opacity-35" />
      <section className="relative mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#978F66]">
            Welcome back to the boutique
          </p>
          <h1 className="mt-4 font-editorial text-5xl font-semibold leading-tight">
            Your beautiful wardrobe is waiting.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8">
            Sign in to revisit your saved styles, shopping bag, and account
            details in one elegant space.
          </p>
        </div>

        <div className="boutique-shadow rounded-[2rem] border border-[#978F66]/18 bg-[#fffdf7]/85 p-6 backdrop-blur sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#978F66]">Member access</p>
          <h2 className="mt-2 font-editorial text-3xl font-semibold">Sign in</h2>
          <LoginForm registered={registered === "1"} />
        </div>
      </section>
    </main>
  );
}
