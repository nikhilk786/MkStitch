"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { AdminFormState } from "@/app/admin/actions";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";

type ProductFormValues = {
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  image: string | null;
  price: string;
  strikePrice: string | null;
  shortDescription: string | null;
  description: string | null;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
};

type CategoryOption = {
  id: string;
  name: string;
};

const initialState: AdminFormState = {};
const inputClass =
  "mt-2 w-full rounded-2xl border border-[#ead8e6] bg-white px-4 py-3 text-sm text-[#38243c] outline-none transition focus:border-[#dd7bdf] focus:ring-4 focus:ring-[#f9b2d7]/15";

export function ProductForm({
  action,
  categories,
  values,
  submitLabel,
}: {
  action: (
    state: AdminFormState,
    formData: FormData,
  ) => Promise<AdminFormState>;
  categories: CategoryOption[];
  values?: ProductFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [image, setImage] = useState(values?.image ?? "");
  const [imageUploading, setImageUploading] = useState(false);

  return (
    <form
      action={formAction}
      className="boutique-shadow mt-8 rounded-[2rem] border border-[#f0d9e8] bg-white p-6 sm:p-8"
    >
      {state.error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" error={state.fieldErrors?.name}>
          <input
            id="name"
            name="name"
            required
            maxLength={180}
            defaultValue={values?.name}
            className={inputClass}
          />
        </Field>
        <Field label="Slug" error={state.fieldErrors?.slug}>
          <input
            id="slug"
            name="slug"
            required
            maxLength={200}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            defaultValue={values?.slug}
            className={inputClass}
            placeholder="relaxed-wool-blazer"
          />
        </Field>
        <Field label="SKU" error={state.fieldErrors?.sku}>
          <input
            id="sku"
            name="sku"
            required
            maxLength={80}
            defaultValue={values?.sku}
            className={inputClass}
          />
        </Field>
        <Field label="Category" error={state.fieldErrors?.categoryId}>
          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={values?.categoryId ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Price" error={state.fieldErrors?.price}>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={values?.price}
            className={inputClass}
          />
        </Field>
        <Field label="Strike price" error={state.fieldErrors?.strikePrice}>
          <input
            id="strikePrice"
            name="strikePrice"
            type="number"
            min="0"
            step="0.01"
            defaultValue={values?.strikePrice ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Stock" error={state.fieldErrors?.stock}>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            defaultValue={values?.stock ?? 0}
            className={inputClass}
          />
        </Field>
        <Field
          label="Product image"
          error={state.fieldErrors?.image}
        >
          <input type="hidden" name="image" value={image} />
          <AdminImageUpload
            entityName="product"
            folder="/products"
            value={image}
            onChange={setImage}
            onUploadingChange={setImageUploading}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label="Short description"
          error={state.fieldErrors?.shortDescription}
        >
          <textarea
            id="shortDescription"
            name="shortDescription"
            rows={3}
            maxLength={500}
            defaultValue={values?.shortDescription ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Description" error={state.fieldErrors?.description}>
          <textarea
            id="description"
            name="description"
            rows={7}
            defaultValue={values?.description ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-3 text-sm font-semibold text-[#38243c]">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={values?.isFeatured ?? false}
            className="size-4 rounded border-zinc-300"
          />
          Featured
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold text-[#38243c]">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={values?.isActive ?? true}
            className="size-4 rounded border-zinc-300"
          />
          Active
        </label>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending || imageUploading}
          className="rounded-full bg-gradient-to-r from-[#6f3473] to-[#a44fa7] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {imageUploading ? "Uploading image..." : pending ? "Saving..." : submitLabel}
        </button>
        <Link
          href="/admin/products"
          className="rounded-full border border-[#e3cadf] px-6 py-3 text-sm font-semibold text-[#765c79] transition-colors hover:bg-[#ffe3e3]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#38243c]">{label}</label>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-zinc-500">{hint}</p>
      ) : null}
    </div>
  );
}
