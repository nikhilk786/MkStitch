"use server";

import { and, eq, inArray, ne, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/admin/authorization";

export type AdminFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export type BulkUploadResult = {
  success: boolean;
  message: string;
};

export type BulkCategoryUploadItem = {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: string | boolean;
};

export type BulkProductUploadItem = {
  categorySlug?: string;
  name?: string;
  slug?: string;
  sku?: string;
  image?: string;
  price?: string | number;
  strikePrice?: string | number;
  shortDescription?: string;
  description?: string;
  stock?: string | number;
  isFeatured?: string | boolean;
  isActive?: string | boolean;
};

type CategoryValues = {
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  isActive: boolean;
};

type ProductValues = {
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

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(formData: FormData, key: string) {
  return textValue(formData, key) || null;
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function trimOptional(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseCsvBoolean(value: unknown, fallback = true) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  return fallback;
}

function normalizeMoney(value: unknown) {
  const raw = String(value ?? "").trim();
  const numberValue = Number(raw);

  if (!raw || !Number.isFinite(numberValue) || numberValue < 0) {
    return null;
  }

  return numberValue.toFixed(2);
}

function databaseErrorMessage(error: unknown) {
  const databaseError = error as {
    code?: string;
    constraint_name?: string;
    constraint?: string;
  };
  const constraint =
    databaseError.constraint_name ?? databaseError.constraint ?? "";

  if (databaseError.code === "23505") {
    if (constraint.includes("slug")) {
      return "That slug is already in use.";
    }

    if (constraint.includes("sku")) {
      return "That SKU is already in use.";
    }

    return "A record with these unique details already exists.";
  }

  if (databaseError.code === "23503") {
    return "This category is still used by a product and cannot be deleted.";
  }

  return "Something went wrong while saving. Please try again.";
}

function validateCategory(formData: FormData) {
  const values: CategoryValues = {
    name: textValue(formData, "name"),
    slug: textValue(formData, "slug").toLowerCase(),
    description: nullableText(formData, "description"),
    image: nullableText(formData, "image"),
    isActive: checked(formData, "isActive"),
  };
  const fieldErrors: Record<string, string> = {};

  if (values.name.length < 2 || values.name.length > 120) {
    fieldErrors.name = "Name must be between 2 and 120 characters.";
  }

  if (!slugPattern.test(values.slug) || values.slug.length > 140) {
    fieldErrors.slug =
      "Use lowercase letters, numbers, and single hyphens only.";
  }

  if (values.description && values.description.length > 5000) {
    fieldErrors.description = "Description is too long.";
  }

  if (values.image && values.image.length > 2000) {
    fieldErrors.image = "Image URL/path is too long.";
  }

  return { values, fieldErrors };
}

function validateProduct(formData: FormData) {
  const price = textValue(formData, "price");
  const strikePrice = textValue(formData, "strikePrice");
  const stock = textValue(formData, "stock");
  const values: ProductValues = {
    name: textValue(formData, "name"),
    slug: textValue(formData, "slug").toLowerCase(),
    sku: textValue(formData, "sku").toUpperCase(),
    categoryId: textValue(formData, "categoryId"),
    image: nullableText(formData, "image"),
    price,
    strikePrice: strikePrice || null,
    shortDescription: nullableText(formData, "shortDescription"),
    description: nullableText(formData, "description"),
    stock: Number(stock),
    isFeatured: checked(formData, "isFeatured"),
    isActive: checked(formData, "isActive"),
  };
  const fieldErrors: Record<string, string> = {};
  const numericPrice = Number(price);
  const numericStrikePrice = strikePrice ? Number(strikePrice) : null;

  if (values.name.length < 2 || values.name.length > 180) {
    fieldErrors.name = "Name must be between 2 and 180 characters.";
  }

  if (!slugPattern.test(values.slug) || values.slug.length > 200) {
    fieldErrors.slug =
      "Use lowercase letters, numbers, and single hyphens only.";
  }

  if (!values.sku || values.sku.length > 80) {
    fieldErrors.sku = "SKU is required and must be at most 80 characters.";
  }

  if (!uuidPattern.test(values.categoryId)) {
    fieldErrors.categoryId = "Select a valid category.";
  }

  if (!price || !Number.isFinite(numericPrice) || numericPrice < 0) {
    fieldErrors.price = "Enter a valid non-negative price.";
  }

  if (
    numericStrikePrice !== null &&
    (!Number.isFinite(numericStrikePrice) || numericStrikePrice < 0)
  ) {
    fieldErrors.strikePrice = "Enter a valid non-negative strike price.";
  }

  if (
    numericStrikePrice !== null &&
    Number.isFinite(numericPrice) &&
    numericStrikePrice < numericPrice
  ) {
    fieldErrors.strikePrice = "Strike price cannot be lower than price.";
  }

  if (!stock || !Number.isInteger(values.stock) || values.stock < 0) {
    fieldErrors.stock = "Stock must be a non-negative whole number.";
  }

  if (values.shortDescription && values.shortDescription.length > 500) {
    fieldErrors.shortDescription =
      "Short description must be at most 500 characters.";
  }

  if (values.description && values.description.length > 10000) {
    fieldErrors.description = "Description is too long.";
  }

  if (values.image && values.image.length > 2000) {
    fieldErrors.image = "Image URL/path is too long.";
  }

  return { values, fieldErrors };
}

async function categoryExists(categoryId: string) {
  const [category] = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.id, categoryId))
    .limit(1);

  return Boolean(category);
}

function revalidateAdminPaths() {
  revalidatePath("/admin", "layout");
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/collections");
  revalidatePath("/product/[slug]", "page");
}

export async function bulkUploadCategoriesAction(
  items: BulkCategoryUploadItem[],
): Promise<BulkUploadResult> {
  await requireAdmin();

  if (!Array.isArray(items) || !items.length) {
    return { success: false, message: "No categories found in CSV." };
  }

  const seenSlugs = new Set<string>();
  const values: CategoryValues[] = [];
  let invalidCount = 0;
  let duplicateInFileCount = 0;

  for (const item of items) {
    const name = trimOptional(item.name);
    const slug = trimOptional(item.slug).toLowerCase();

    if (
      name.length < 2 ||
      name.length > 120 ||
      !slugPattern.test(slug) ||
      slug.length > 140
    ) {
      invalidCount += 1;
      continue;
    }

    if (seenSlugs.has(slug)) {
      duplicateInFileCount += 1;
      continue;
    }

    seenSlugs.add(slug);
    values.push({
      name,
      slug,
      description: trimOptional(item.description) || null,
      image: trimOptional(item.image) || null,
      isActive: parseCsvBoolean(item.isActive, true),
    });
  }

  if (!values.length) {
    return {
      success: false,
      message: "No valid categories found. Check required name and slug columns.",
    };
  }

  const slugs = values.map((item) => item.slug);
  const existingRows = await db
    .select({ slug: categories.slug })
    .from(categories)
    .where(inArray(categories.slug, slugs));
  const existingSlugs = new Set(existingRows.map((row) => row.slug));
  const insertValues = values.filter((item) => !existingSlugs.has(item.slug));

  if (insertValues.length) {
    await db.insert(categories).values(insertValues);
  }

  revalidateAdminPaths();
  revalidatePath("/admin/categories");

  const skippedCount = existingSlugs.size + duplicateInFileCount;

  return {
    success: true,
    message: `Inserted: ${insertValues.length}. Skipped: ${skippedCount}. Errors: ${invalidCount}.`,
  };
}

export async function bulkUploadProductsAction(
  items: BulkProductUploadItem[],
): Promise<BulkUploadResult> {
  await requireAdmin();

  if (!Array.isArray(items) || !items.length) {
    return { success: false, message: "No products found in CSV." };
  }

  const normalizedItems = [];
  const seenSlugs = new Set<string>();
  const seenSkus = new Set<string>();
  let invalidCount = 0;
  let duplicateInFileCount = 0;

  for (const item of items) {
    const categorySlug = trimOptional(item.categorySlug).toLowerCase();
    const name = trimOptional(item.name);
    const slug = trimOptional(item.slug).toLowerCase();
    const sku = trimOptional(item.sku).toUpperCase();
    const price = normalizeMoney(item.price);
    const strikePrice = normalizeMoney(item.strikePrice);
    const stock = Number(item.stock ?? 0);

    if (
      !categorySlug ||
      name.length < 2 ||
      name.length > 180 ||
      !slugPattern.test(slug) ||
      slug.length > 200 ||
      !sku ||
      sku.length > 80 ||
      !price ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      invalidCount += 1;
      continue;
    }

    if (seenSlugs.has(slug) || seenSkus.has(sku)) {
      duplicateInFileCount += 1;
      continue;
    }

    seenSlugs.add(slug);
    seenSkus.add(sku);
    normalizedItems.push({
      categorySlug,
      name,
      slug,
      sku,
      image: trimOptional(item.image) || null,
      price,
      strikePrice,
      shortDescription: trimOptional(item.shortDescription) || null,
      description: trimOptional(item.description) || null,
      stock,
      isFeatured: parseCsvBoolean(item.isFeatured, false),
      isActive: parseCsvBoolean(item.isActive, true),
    });
  }

  if (!normalizedItems.length) {
    return {
      success: false,
      message:
        "No valid products found. Check required name, slug, sku, categorySlug, price, and stock columns.",
    };
  }

  const categorySlugs = Array.from(
    new Set(normalizedItems.map((item) => item.categorySlug)),
  );
  const categoryRows = await db
    .select({ id: categories.id, slug: categories.slug })
    .from(categories)
    .where(inArray(categories.slug, categorySlugs));
  const categoryBySlug = new Map(
    categoryRows.map((category) => [category.slug, category.id]),
  );
  const missingCategory = categorySlugs.find(
    (categorySlug) => !categoryBySlug.has(categorySlug),
  );

  if (missingCategory) {
    return {
      success: false,
      message: `Category not found: ${missingCategory}. Please upload categories first.`,
    };
  }

  const slugs = normalizedItems.map((item) => item.slug);
  const skus = normalizedItems.map((item) => item.sku);
  const existingRows = await db
    .select({ slug: products.slug, sku: products.sku })
    .from(products)
    .where(or(inArray(products.slug, slugs), inArray(products.sku, skus)));
  const existingSlugs = new Set(existingRows.map((row) => row.slug));
  const existingSkus = new Set(existingRows.map((row) => row.sku));
  const insertValues: ProductValues[] = normalizedItems
    .filter(
      (item) => !existingSlugs.has(item.slug) && !existingSkus.has(item.sku),
    )
    .map((item) => ({
      name: item.name,
      slug: item.slug,
      sku: item.sku,
      categoryId: categoryBySlug.get(item.categorySlug)!,
      image: item.image,
      price: item.price,
      strikePrice: item.strikePrice,
      shortDescription: item.shortDescription,
      description: item.description,
      stock: item.stock,
      isFeatured: item.isFeatured,
      isActive: item.isActive,
    }));

  if (insertValues.length) {
    await db.insert(products).values(insertValues);
  }

  revalidateAdminPaths();
  revalidatePath("/admin/products");

  const skippedCount = existingRows.length + duplicateInFileCount;

  return {
    success: true,
    message: `Inserted: ${insertValues.length}. Skipped: ${skippedCount}. Errors: ${invalidCount}.`,
  };
}

export async function createCategoryAction(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const { values, fieldErrors } = validateCategory(formData);

  if (Object.keys(fieldErrors).length) {
    return { fieldErrors };
  }

  try {
    await db.insert(categories).values(values);
  } catch (error) {
    return { error: databaseErrorMessage(error) };
  }

  revalidateAdminPaths();
  redirect("/admin/categories?success=created");
}

export async function updateCategoryAction(
  id: string,
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();

  if (!uuidPattern.test(id)) {
    return { error: "Invalid category." };
  }

  const { values, fieldErrors } = validateCategory(formData);

  if (Object.keys(fieldErrors).length) {
    return { fieldErrors };
  }

  try {
    const [duplicate] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(and(eq(categories.slug, values.slug), ne(categories.id, id)))
      .limit(1);

    if (duplicate) {
      return { fieldErrors: { slug: "That slug is already in use." } };
    }

    await db
      .update(categories)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(categories.id, id));
  } catch (error) {
    return { error: databaseErrorMessage(error) };
  }

  revalidateAdminPaths();
  redirect("/admin/categories?success=updated");
}

export async function deleteCategoryAction(id: string) {
  await requireAdmin();

  if (!uuidPattern.test(id)) {
    redirect("/admin/categories?error=invalid");
  }

  try {
    await db.delete(categories).where(eq(categories.id, id));
  } catch (error) {
    const databaseError = error as { code?: string };
    redirect(
      `/admin/categories?error=${
        databaseError.code === "23503" ? "in-use" : "delete"
      }`,
    );
  }

  revalidateAdminPaths();
  redirect("/admin/categories?success=deleted");
}

export async function createProductAction(
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();
  const { values, fieldErrors } = validateProduct(formData);

  if (
    !fieldErrors.categoryId &&
    !(await categoryExists(values.categoryId))
  ) {
    fieldErrors.categoryId = "Selected category no longer exists.";
  }

  if (Object.keys(fieldErrors).length) {
    return { fieldErrors };
  }

  try {
    await db.insert(products).values(values);
  } catch (error) {
    return { error: databaseErrorMessage(error) };
  }

  revalidateAdminPaths();
  redirect("/admin/products?success=created");
}

export async function updateProductAction(
  id: string,
  _state: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  await requireAdmin();

  if (!uuidPattern.test(id)) {
    return { error: "Invalid product." };
  }

  const { values, fieldErrors } = validateProduct(formData);

  if (
    !fieldErrors.categoryId &&
    !(await categoryExists(values.categoryId))
  ) {
    fieldErrors.categoryId = "Selected category no longer exists.";
  }

  if (Object.keys(fieldErrors).length) {
    return { fieldErrors };
  }

  try {
    await db
      .update(products)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(products.id, id));
  } catch (error) {
    return { error: databaseErrorMessage(error) };
  }

  revalidateAdminPaths();
  redirect("/admin/products?success=updated");
}

export async function deleteProductAction(id: string) {
  await requireAdmin();

  if (!uuidPattern.test(id)) {
    redirect("/admin/products?error=invalid");
  }

  try {
    await db.delete(products).where(eq(products.id, id));
  } catch {
    redirect("/admin/products?error=delete");
  }

  revalidateAdminPaths();
  redirect("/admin/products?success=deleted");
}

export async function adminLogoutAction() {
  await signOut({
    redirect: false,
    redirectTo: "/admin/login",
  });

  redirect("/admin/login");
}
