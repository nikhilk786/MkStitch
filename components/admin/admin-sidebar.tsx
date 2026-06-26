"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogoutAction } from "@/app/admin/actions";

const navigation = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/products/bulk-upload", label: "Bulk Upload Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/categories/bulk-upload", label: "Bulk Upload Categories" },
  { href: "/admin/profile", label: "Profile" },
];

export function AdminSidebar({
  email,
}: {
  email?: string | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="boutique-shadow h-fit rounded-[2rem] bg-[#38243c] p-5 text-white lg:sticky lg:top-28">
      <div className="flex items-start justify-between gap-4 lg:block">
        <div>
          <Link
            href="/admin"
            className="font-editorial text-xl font-bold"
          >
            Boutique Admin
          </Link>
          <p className="mt-2 max-w-52 truncate text-xs text-[#cdb9cf]">
            {email ?? "Administrator"}
          </p>
        </div>
        <span className="rounded-full bg-[#f9b2d7]/15 px-3 py-1 text-[10px] font-semibold tracking-wider text-[#f9b2d7] uppercase lg:mt-4 lg:inline-flex">
          Admin
        </span>
      </div>

      <nav
        className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1"
        aria-label="Admin navigation"
      >
        {navigation.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-[#f9b2d7] to-[#b5baff] text-[#38243c]"
                  : "text-[#e8d7e9] hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-300 transition-colors hover:bg-red-400/10 hover:text-red-200"
          >
            Logout
          </button>
        </form>
      </nav>
    </aside>
  );
}
