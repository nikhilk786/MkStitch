import { asc, eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import { updateProductAction } from "@/app/admin/actions";
import { ProductForm } from "@/components/admin/product-form";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (!product) {
    notFound();
  }

  const categoryOptions = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(
      or(
        eq(categories.isActive, true),
        eq(categories.id, product.categoryId),
      ),
    )
    .orderBy(asc(categories.name));

  return (
    <main>
      <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
        Products
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-bold">
        Edit product
      </h1>
      <p className="mt-3 text-[#694E4E]">
        Update {product.name}, pricing, inventory, and visibility.
      </p>
      <ProductForm
        action={updateProductAction.bind(null, product.id)}
        categories={categoryOptions}
        values={product}
        submitLabel="Save product"
      />
    </main>
  );
}
