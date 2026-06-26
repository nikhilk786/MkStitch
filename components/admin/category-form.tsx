"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { AdminFormState } from "@/app/admin/actions";
import {
  AdminImageUpload,
  isValidImageSource,
} from "@/components/admin/AdminImageUpload";

type CategoryFormValues = {
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isActive: boolean;
};

const initialState: AdminFormState = {};
const inputClass =
  "mt-2 w-full rounded-2xl border border-[#694E4E] bg-white px-4 py-3 text-sm text-[#694E4E] outline-none transition focus:border-[#694E4E] focus:ring-4 focus:ring-[#FFCEE3]/15";

export function CategoryForm({
  action,
  values,
  submitLabel,
}: {
  action: (
    state: AdminFormState,
    formData: FormData,
  ) => Promise<AdminFormState>;
  values?: CategoryFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [image, setImage] = useState(
    isValidImageSource(values?.image) ? values?.image ?? "" : "",
  );
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
            maxLength={120}
            defaultValue={values?.name}
            className={inputClass}
          />
        </Field>
        <Field label="Slug" error={state.fieldErrors?.slug}>
          <input
            id="slug"
            name="slug"
            required
            maxLength={140}
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            defaultValue={values?.slug}
            className={inputClass}
            placeholder="summer-collection"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Description" error={state.fieldErrors?.description}>
          <textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={values?.description ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label="Category image"
          error={state.fieldErrors?.image}
        >
          <input type="hidden" name="image" value={image} />
          <AdminImageUpload
            entityName="category"
            folder="/categories"
            simple
            value={image}
            onChange={setImage}
            onUploadingChange={setImageUploading}
          />
        </Field>
      </div>

      <label className="mt-6 flex items-center gap-3 text-sm font-semibold text-[#694E4E]">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={values?.isActive ?? true}
          className="size-4 rounded border-zinc-300"
        />
        Active
      </label>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending || imageUploading}
          className="rounded-full bg-gradient-to-r from-[#694E4E] to-[#694E4E] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {imageUploading
            ? "Uploading image..."
            : pending
              ? "Saving..."
              : submitLabel}
        </button>
        <Link
          href="/admin/categories"
          className="rounded-full border border-[#694E4E] px-6 py-3 text-sm font-semibold text-[#694E4E] transition-colors hover:bg-[#FFCEE3]"
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
      <label className="text-sm font-semibold text-[#694E4E]">{label}</label>
      {children}
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-xs text-zinc-500">{hint}</p>
      ) : null}
    </div>
  );
}
