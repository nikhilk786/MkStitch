import Link from "next/link";
import { ProductCsvUpload } from "@/components/admin/bulk-upload/product-csv-upload";

export default function AdminProductBulkUploadPage() {
  return (
    <main>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.24em] text-[#a44fa7] uppercase">
            CSV import
          </p>
          <h1 className="mt-3 font-editorial text-4xl font-bold">
            Bulk Upload Products
          </h1>
          <p className="mt-3 max-w-2xl text-[#765c79]">
            Upload products after categories. The categorySlug column is used
            only to find the category ID and is not saved to the products table.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="inline-flex w-fit rounded-full border border-[#e3cadf] px-5 py-3 text-sm font-semibold text-[#765c79] transition-colors hover:bg-[#ffe3e3]"
        >
          Back to products
        </Link>
      </div>

      <div className="mt-8">
        <ProductCsvUpload />
      </div>
    </main>
  );
}
