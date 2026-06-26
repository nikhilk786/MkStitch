"use client";

import Papa, { type ParseResult } from "papaparse";
import { useState, useTransition } from "react";
import {
  bulkUploadProductsAction,
  type BulkProductUploadItem,
  type BulkUploadResult,
} from "@/app/admin/actions";

const previewColumns = [
  "name",
  "sku",
  "categorySlug",
  "price",
  "stock",
  "isFeatured",
  "isActive",
] as const;

export function ProductCsvUpload() {
  const [items, setItems] = useState<BulkProductUploadItem[]>([]);
  const [parseError, setParseError] = useState("");
  const [result, setResult] = useState<BulkUploadResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setResult(null);
    setParseError("");
    setItems([]);

    if (!file) {
      return;
    }

    Papa.parse<BulkProductUploadItem>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (parseResult: ParseResult<BulkProductUploadItem>) => {
        if (parseResult.errors.length) {
          setParseError(parseResult.errors[0]?.message ?? "Could not parse CSV.");
          return;
        }

        setItems(parseResult.data);
      },
      error: (error: Error) => {
        setParseError(error.message);
      },
    });
  }

  function handleUpload() {
    startTransition(async () => {
      setResult(await bulkUploadProductsAction(items));
    });
  }

  return (
    <div className="boutique-shadow rounded-[2rem] border border-[#f0d9e8] bg-white p-6 sm:p-8">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        This sample CSV is configured for https://ik.imagekit.io/nicks. Upload categories first.
      </div>

      <div className="mt-6">
        <label htmlFor="product-csv" className="text-sm font-semibold text-[#694E4E]">
          Upload product CSV
        </label>
        <input
          id="product-csv"
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
          className="mt-3 block w-full cursor-pointer rounded-2xl border border-[#694E4E] bg-white text-sm text-[#694E4E] file:mr-4 file:border-0 file:bg-[#694E4E] file:px-4 file:py-3 file:font-semibold file:text-white"
        />
      </div>

      {parseError ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {parseError}
        </div>
      ) : null}

      {items.length ? (
        <>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#f0d9e8]">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-[#fff3f8] text-xs uppercase tracking-wider text-[#8f7691]">
                <tr>
                  {previewColumns.map((column) => (
                    <th key={column} className="px-4 py-3 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e4ed]">
                {items.slice(0, 12).map((item, index) => (
                  <tr key={`${item.sku}-${index}`}>
                    {previewColumns.map((column) => (
                      <td key={column} className="px-4 py-3 text-zinc-700">
                        {String(item[column] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-[#694E4E]">
            Previewing {Math.min(items.length, 12)} of {items.length} rows.
          </p>
          <button
            type="button"
            onClick={handleUpload}
            disabled={isPending}
            className="mt-6 rounded-full bg-gradient-to-r from-[#694E4E] to-[#694E4E] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {isPending ? "Uploading..." : "Upload Products"}
          </button>
        </>
      ) : null}

      {result ? (
        <div
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-medium ${
            result.success
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {result.message}
        </div>
      ) : null}
    </div>
  );
}
