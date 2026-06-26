import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { isAdmin } from "@/lib/admin/authorization";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  if (!(await isAdmin())) {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="min-h-full bg-[#fff7fa] text-[#38243c]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <AdminSidebar email={session.user.email} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
