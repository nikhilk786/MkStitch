import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { deleteProductAction } from "@/app/admin/actions";
import { AdminFeedback } from "@/components/admin/admin-feedback";
import { AdminThumbnail } from "@/components/admin/admin-thumbnail";
import { DeleteButton } from "@/components/admin/delete-button";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default async function AdminProductsPage({
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
      id: products.id,
      image: products.image,
      name: products.name,
      slug: products.slug,
      sku: products.sku,
      price: products.price,
      stock: products.stock,
      isFeatured: products.isFeatured,
      isActive: products.isActive,
      categoryName: categories.name,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .orderBy(asc(products.name));

  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
            Catalog
          </p>
          <h1 className="mt-3 font-editorial text-4xl font-bold">
            Products
          </h1>
          <p className="mt-3 text-[#694E4E]">
            Manage product details, pricing, stock, and visibility.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/bulk-upload"
            className="inline-flex w-fit rounded-full border border-[#694E4E] px-5 py-3 text-sm font-semibold text-[#694E4E] transition-colors hover:bg-[#FFCEE3]"
          >
            CSV upload
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex w-fit rounded-full bg-gradient-to-r from-[#694E4E] to-[#694E4E] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Add product
          </Link>
        </div>
      </div>

      <AdminFeedback success={query.success} error={query.error} />

      <div className="boutique-shadow mt-8 overflow-hidden rounded-[2rem] border border-[#f0d9e8] bg-white">
        {rows.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left text-sm">
              <thead className="bg-[#fff3f8] text-xs tracking-wider text-[#8f7691] uppercase">
                <tr>
                  <th className="px-5 py-4 font-semibold">Image</th>
                  <th className="px-5 py-4 font-semibold">Name</th>
                  <th className="px-5 py-4 font-semibold">SKU</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Price</th>
                  <th className="px-5 py-4 font-semibold">Stock</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e4ed]">
                {rows.map((product) => (
                  <tr key={product.id}>
                    <td className="px-5 py-4">
                      <AdminThumbnail
                        image={product.image}
                        label={product.name}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-semibold text-zinc-950">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {product.slug}
                          </p>
                        </div>
                        {product.isFeatured ? (
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                            Featured
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-600">{product.sku}</td>
                    <td className="px-5 py-4 text-zinc-600">
                      {product.categoryName}
                    </td>
                    <td className="px-5 py-4 font-medium text-zinc-950">
                      {currency.format(Number(product.price))}
                    </td>
                    <td className="px-5 py-4 text-zinc-600">
                      {product.stock}
                    </td>
                    <td className="px-5 py-4">
                      <Status active={product.isActive} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="rounded-full border border-[#694E4E] px-3 py-1.5 text-xs font-semibold text-[#694E4E] transition-colors hover:bg-[#FFCEE3]"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteProductAction.bind(null, product.id)}
                          itemName={product.name}
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
              No products found
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Create your first product to start building the catalog.
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
