import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";

export default async function AdminPage() {
  const session = await auth();
  const [
    [categoryCount],
    [productCount],
    [activeCategoryCount],
    [activeProductCount],
  ] = await Promise.all([
    db.select({ value: count() }).from(categories),
    db.select({ value: count() }).from(products),
    db
      .select({ value: count() })
      .from(categories)
      .where(eq(categories.isActive, true)),
    db
      .select({ value: count() })
      .from(products)
      .where(eq(products.isActive, true)),
  ]);

  const cards = [
    {
      label: "Products",
      value: "Manage",
      description: "Add, edit, and organize your product catalog.",
      href: "/admin/products",
    },
    {
      label: "Categories",
      value: "Manage",
      description: "Maintain the categories used across the catalog.",
      href: "/admin/categories",
    },
    {
      label: "Profile",
      value: session?.user?.name ?? "Admin",
      description: session?.user?.email ?? "View administrator details.",
      href: "/admin/profile",
    },
    {
      label: "Total Products",
      value: productCount.value,
      description: "All products stored in the database.",
      href: "/admin/products",
    },
    {
      label: "Total Categories",
      value: categoryCount.value,
      description: "All product categories in the database.",
      href: "/admin/categories",
    },
    {
      label: "Active Products",
      value: activeProductCount.value,
      description: "Products currently marked active.",
      href: "/admin/products",
    },
    {
      label: "Active Categories",
      value: activeCategoryCount.value,
      description: "Categories currently marked active.",
      href: "/admin/categories",
    },
  ];

  return (
    <main>
      <p className="text-xs font-bold tracking-[0.24em] text-[#a44fa7] uppercase">
        Boutique overview
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-bold">
        Collection administration
      </h1>
      <p className="mt-3 max-w-2xl text-[#765c79]">
        Manage the categories and products stored in your PostgreSQL database.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group boutique-shadow rounded-[2rem] border border-[#f0d9e8] bg-white p-6 transition hover:-translate-y-1 hover:border-[#e6b9dc]"
          >
            <p className="text-xs font-bold tracking-[0.15em] text-[#a44fa7] uppercase">{card.label}</p>
            <p className="mt-3 truncate font-editorial text-3xl font-bold">
              {card.value}
            </p>
            <p className="mt-3 min-h-10 text-sm leading-5 text-[#8f7691]">
              {card.description}
            </p>
            <p className="mt-5 text-sm font-semibold text-[#6f3473]">
              View details{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
