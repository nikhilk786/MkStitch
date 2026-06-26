"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadAdminImage } from "@/lib/imagekit-upload";

const maximumFileSize = 10 * 1024 * 1024;

export function isValidImageSource(value?: string | null) {
  if (!value) {
    return false;
  }

  return (
    value.startsWith("/") ||
    value.startsWith("blob:") ||
    value.startsWith("data:image/") ||
    /^https?:\/\//i.test(value)
  );
}

export function AdminImageUpload({
  entityName,
  folder,
  simple = false,
  value,
  onChange,
  onUploadingChange,
}: {
  entityName: "product" | "category";
  folder: "/products" | "/categories";
  simple?: boolean;
  value?: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const existingImage = isValidImageSource(value) ? value : "";
  const [preview, setPreview] = useState(existingImage);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > maximumFileSize) {
      setError("Image must be 10 MB or smaller.");
      event.target.value = "";
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setError("");
    setUploading(true);
    onUploadingChange?.(true);

    try {
      const uploadedImage = await uploadAdminImage(file, folder);
      onChange(uploadedImage.url);
      setPreview(uploadedImage.url);
    } catch (uploadError) {
      setPreview(existingImage);
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed. Please try again.",
      );
    } finally {
      URL.revokeObjectURL(localPreview);
      setUploading(false);
      onUploadingChange?.(false);
      event.target.value = "";
    }
  }

  return (
    <div className="mt-2 rounded-2xl border border-[#ead8e6] bg-[#fff8fb] p-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className={
          simple
            ? "block w-full cursor-pointer rounded-xl border border-[#e3cadf] bg-white text-sm text-[#765c79] file:mr-4 file:border-0 file:bg-[#6f3473] file:px-4 file:py-3 file:font-semibold file:text-white disabled:cursor-wait disabled:opacity-60"
            : "sr-only"
        }
      />

      {preview && !simple ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-200">
          <Image
            src={preview}
            alt={`${entityName} image preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            unoptimized={preview.startsWith("blob:")}
            className="object-cover"
          />
        </div>
      ) : !simple ? (
        <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white text-sm text-zinc-500">
          No {entityName} image selected
        </div>
      ) : null}

      {!simple ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-4 inline-flex rounded-full bg-[#6f3473] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a44fa7] disabled:cursor-wait disabled:opacity-60"
        >
          {uploading
            ? "Uploading image..."
            : preview
              ? "Replace image"
              : "Choose image"}
        </button>
      ) : null}

      <p className="mt-2 text-xs text-zinc-500">
        {uploading
          ? "Uploading image to ImageKit..."
          : preview && simple
            ? "Current image is saved. Choose a file to replace it."
            : "JPG, PNG, WebP, GIF, or another image format up to 10 MB."}
      </p>

      {error ? (
        <p className="mt-3 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
