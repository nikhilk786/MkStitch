import Link from "next/link";
import { CategoryCsvUpload } from "@/components/admin/bulk-upload/category-csv-upload";

export default function AdminCategoryBulkUploadPage() {
  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
            CSV import
          </p>
          <h1 className="mt-3 font-editorial text-4xl font-bold">
            Bulk Upload Categories
          </h1>
          <p className="mt-3 max-w-2xl text-[#694E4E]">
            Upload the category CSV first so product rows can resolve
            categorySlug to the existing category ID.
          </p>
        </div>
        <Link
          href="/admin/categories"
          className="inline-flex w-fit rounded-full border border-[#694E4E] px-5 py-3 text-sm font-semibold text-[#694E4E] transition-colors hover:bg-[#FFCEE3]"
        >
          Back to categories
        </Link>
      </div>

      <div className="mt-8">
        <CategoryCsvUpload />
      </div>
    </main>
  );
}
