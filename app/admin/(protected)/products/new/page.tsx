import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { createProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export default async function NewProductPage() {
  const categoryOptions = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.name));

  return (
    <main>
      <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
        Products
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-bold">
        Add product
      </h1>
      <p className="mt-3 text-[#694E4E]">
        Add a product to the database-backed catalog.
      </p>

      {categoryOptions.length ? (
        <ProductForm
          action={createProductAction}
          categories={categoryOptions}
          submitLabel="Create product"
        />
      ) : (
        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
          <h2 className="font-semibold">Create an active category first</h2>
          <p className="mt-2 text-sm">
            Each product must reference an active category.
          </p>
          <Link
            href="/admin/categories/new"
            className="mt-5 inline-flex rounded-full bg-amber-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Add category
          </Link>
        </div>
      )}
    </main>
  );
}
