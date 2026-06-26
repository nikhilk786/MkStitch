import { createCategoryAction } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <main>
      <p className="text-xs font-bold tracking-[0.24em] text-[#a44fa7] uppercase">
        Categories
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-bold">
        Add category
      </h1>
      <p className="mt-3 text-[#765c79]">
        Create a category that products can be assigned to.
      </p>
      <CategoryForm
        action={createCategoryAction}
        submitLabel="Create category"
      />
    </main>
  );
}
