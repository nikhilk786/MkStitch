import { upload } from "@imagekit/next";

type ImageKitAuthResponse = {
  token: string;
  signature: string;
  expire: number;
  publicKey: string;
  error?: string;
};

export type ImageKitUploadResult = {
  url: string;
  fileId?: string;
  filePath?: string;
  thumbnailUrl?: string;
};

function readableFileName(file: File, fallbackName: string) {
  const cleanedName = file.name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");

  return `${Date.now()}-${cleanedName || fallbackName}`;
}

export async function uploadAdminImage(
  file: File,
  folder: "/products" | "/categories",
): Promise<ImageKitUploadResult> {
  let authResponse: Response;

  try {
    authResponse = await fetch("/api/imagekit-auth", {
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "Could not connect to the image upload service. Please try again.",
    );
  }

  const auth = (await authResponse.json()) as ImageKitAuthResponse;

  if (!authResponse.ok) {
    throw new Error(auth.error || "Unable to authorize the image upload.");
  }

  if (!auth.publicKey || !auth.signature || !auth.token || !auth.expire) {
    throw new Error("Image upload authorization returned incomplete data.");
  }

  try {
    const result = await upload({
      file,
      fileName: readableFileName(
        file,
        folder === "/products" ? "product-image" : "category-image",
      ),
      folder,
      publicKey: auth.publicKey,
      signature: auth.signature,
      token: auth.token,
      expire: auth.expire,
      useUniqueFileName: true,
    });

    if (!result.url) {
      throw new Error("ImageKit did not return an image URL.");
    }

    return {
      url: result.url,
      fileId: result.fileId,
      filePath: result.filePath,
      thumbnailUrl: result.thumbnailUrl,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Image upload failed.");
    }

    throw new Error("Image upload failed. Please try again.");
  }
}
