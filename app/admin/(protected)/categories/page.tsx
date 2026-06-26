import Link from "next/link";
import { asc } from "drizzle-orm";
import { AdminFeedback } from "@/components/admin/admin-feedback";
import { AdminThumbnail } from "@/components/admin/admin-thumbnail";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCategoryAction } from "@/app/admin/actions";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string | string[];
    error?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const rows = await db
    .select({
      id: categories.id,
      image: categories.image,
      name: categories.name,
      slug: categories.slug,
      isActive: categories.isActive,
      updatedAt: categories.updatedAt,
    })
    .from(categories)
    .orderBy(asc(categories.name));

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
            Catalog
          </p>
          <h1 className="mt-3 font-editorial text-4xl font-bold">
            Categories
          </h1>
          <p className="mt-3 text-[#694E4E]">
            Organize products into manageable storefront groups.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/categories/bulk-upload"
            className="inline-flex w-fit rounded-full border border-[#694E4E] px-5 py-3 text-sm font-semibold text-[#694E4E] transition-colors hover:bg-[#FFCEE3]"
          >
            CSV upload
          </Link>
          <Link
            href="/admin/categories/new"
            className="inline-flex w-fit rounded-full bg-gradient-to-r from-[#694E4E] to-[#694E4E] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Add category
          </Link>
        </div>
      </div>

      <AdminFeedback success={query.success} error={query.error} />

      <div className="boutique-shadow mt-8 overflow-hidden rounded-[2rem] border border-[#f0d9e8] bg-white">
        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-[#fff3f8] text-xs tracking-wider text-[#8f7691] uppercase">
                <tr>
                  <th className="px-5 py-4 font-semibold">Image</th>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">Slug</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Updated</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e4ed]">
                {rows.map((category) => (
                  <tr key={category.id}>
                    <td className="px-5 py-4">
                      <AdminThumbnail
                        image={category.image}
                        label={category.name}
                      />
                    </td>
                    <td className="px-5 py-4 font-semibold">
                      {category.name}
                    </td>
                    <td className="px-5 py-4 text-zinc-600">
                      {category.slug}
                    </td>
                    <td className="px-5 py-4">
                      <Status active={category.isActive} />
                    </td>
                    <td className="px-5 py-4 text-zinc-600">
                      {category.updatedAt.toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/categories/${category.id}/edit`}
                          className="rounded-full border border-[#694E4E] px-3 py-1.5 text-xs font-semibold text-[#694E4E] transition-colors hover:bg-[#FFCEE3]"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteCategoryAction.bind(null, category.id)}
                          itemName={category.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-zinc-950">
              No categories found
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Create your first category to organize the catalog.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function Status({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-zinc-100 text-zinc-600"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}
