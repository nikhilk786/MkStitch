import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { isAdmin } from "@/lib/admin/authorization";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) {
    redirect("/admin");
  }

  const query = await searchParams;

  return (
    <main className="relative flex min-h-[calc(100vh-10rem)] items-center justify-center overflow-hidden bg-[#F5F5F5] px-4 py-12 text-[#694E4E]">
      <div className="boutique-gradient absolute inset-0 opacity-35" />
      <section className="boutique-shadow relative w-full max-w-md rounded-[2.5rem] border border-white/80 bg-white/85 p-6 backdrop-blur sm:p-8">
        <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
          MKSTITCH Atelier
        </p>
        <h1 className="mt-3 font-editorial text-4xl font-bold">
          Boutique admin
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#694E4E]">
          Sign in with an account whose database role is set to admin.
        </p>
        <AdminLoginForm unauthorized={query.error === "unauthorized"} />
      </section>
    </main>
  );
}
