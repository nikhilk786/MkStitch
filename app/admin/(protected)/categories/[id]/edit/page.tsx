import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { updateCategoryAction } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
        Categories
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-bold">
        Edit category
      </h1>
      <p className="mt-3 text-[#694E4E]">
        Update {category.name} and its storefront status.
      </p>
      <CategoryForm
        action={updateCategoryAction.bind(null, category.id)}
        values={category}
        submitLabel="Save category"
      />
    </main>
  );
}
