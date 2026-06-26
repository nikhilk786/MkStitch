import fs from "node:fs";
import path from "node:path";
import nextEnv from "@next/env";
import Papa from "papaparse";
import postgres from "postgres";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const categoryPath = path.join(process.cwd(), "data/sample-csv/kurti-categories.csv");
const productPath = path.join(process.cwd(), "data/sample-csv/kurti-products.csv");

function parseCsv(filePath) {
  const csv = fs.readFileSync(filePath, "utf8");
  const result = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length) {
    throw new Error(result.errors[0]?.message ?? `Could not parse ${filePath}`);
  }

  return result.data;
}

function boolValue(value, fallback = true) {
  const normalized = String(value ?? "").trim().toLowerCase();

  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  return fallback;
}

function moneyValue(value) {
  const normalized = Number(String(value ?? "").trim());

  if (!Number.isFinite(normalized) || normalized < 0) {
    throw new Error(`Invalid numeric value: ${value}`);
  }

  return normalized.toFixed(2);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

try {
  const categories = parseCsv(categoryPath);
  const products = parseCsv(productPath);

  let insertedCategories = 0;
  let skippedCategories = 0;

  for (const category of categories) {
    const slug = category.slug.trim().toLowerCase();
    const existing = await sql`
      select id from categories where slug = ${slug} limit 1
    `;

    if (existing.length) {
      skippedCategories += 1;
      continue;
    }

    await sql`
      insert into categories (name, slug, description, image, is_active)
      values (
        ${category.name.trim()},
        ${slug},
        ${category.description?.trim() || null},
        ${category.image?.trim() || null},
        ${boolValue(category.isActive, true)}
      )
    `;
    insertedCategories += 1;
  }

  const categoryRows = await sql`
    select id, slug from categories
    where slug in ${sql(categories.map((category) => category.slug.trim().toLowerCase()))}
  `;
  const categoryBySlug = new Map(categoryRows.map((category) => [category.slug, category.id]));

  let insertedProducts = 0;
  let updatedProducts = 0;
  let skippedProducts = 0;
  const errors = [];

  for (const product of products) {
    const categorySlug = product.categorySlug.trim().toLowerCase();
    const categoryId = categoryBySlug.get(categorySlug);

    if (!categoryId) {
      errors.push(`Category not found: ${categorySlug}`);
      continue;
    }

    const slug = product.slug.trim().toLowerCase();
    const sku = product.sku.trim().toUpperCase();
    const values = {
      categoryId,
      name: product.name.trim(),
      slug,
      sku,
      image: product.image?.trim() || null,
      price: moneyValue(product.price),
      strikePrice: product.strikePrice ? moneyValue(product.strikePrice) : null,
      shortDescription: product.shortDescription?.trim() || null,
      description: product.description?.trim() || null,
      stock: Number(product.stock),
      isFeatured: boolValue(product.isFeatured, false),
      isActive: boolValue(product.isActive, true),
    };

    if (!Number.isInteger(values.stock) || values.stock < 0) {
      errors.push(`Invalid stock for ${sku}`);
      continue;
    }

    const existingBySlug = await sql`
      select id, sku from products where slug = ${slug} limit 1
    `;
    const existingBySku = await sql`
      select id, slug from products where sku = ${sku} limit 1
    `;

    if (existingBySlug.length) {
      const [skuOwner] = existingBySku;

      if (skuOwner && skuOwner.id !== existingBySlug[0].id) {
        skippedProducts += 1;
        errors.push(`Skipped ${slug}: SKU ${sku} already belongs to ${skuOwner.slug}`);
        continue;
      }

      await sql`
        update products
        set
          category_id = ${values.categoryId},
          name = ${values.name},
          sku = ${values.sku},
          image = ${values.image},
          price = ${values.price},
          strike_price = ${values.strikePrice},
          short_description = ${values.shortDescription},
          description = ${values.description},
          stock = ${values.stock},
          is_featured = ${values.isFeatured},
          is_active = ${values.isActive},
          updated_at = now()
        where slug = ${values.slug}
      `;
      updatedProducts += 1;
      continue;
    }

    if (existingBySku.length) {
      skippedProducts += 1;
      errors.push(`Skipped ${slug}: SKU ${sku} already exists`);
      continue;
    }

    await sql`
      insert into products (
        category_id,
        name,
        slug,
        sku,
        image,
        price,
        strike_price,
        short_description,
        description,
        stock,
        is_featured,
        is_active
      )
      values (
        ${values.categoryId},
        ${values.name},
        ${values.slug},
        ${values.sku},
        ${values.image},
        ${values.price},
        ${values.strikePrice},
        ${values.shortDescription},
        ${values.description},
        ${values.stock},
        ${values.isFeatured},
        ${values.isActive}
      )
    `;
    insertedProducts += 1;
  }

  const finalCategories = await sql`
    select count(*)::int as count from categories
    where slug in ${sql(categories.map((category) => category.slug.trim().toLowerCase()))}
  `;
  const finalProducts = await sql`
    select count(*)::int as count from products
    where slug in ${sql(products.map((product) => product.slug.trim().toLowerCase()))}
  `;
  const imageRows = await sql`
    select count(*)::int as count from products
    where slug in ${sql(products.map((product) => product.slug.trim().toLowerCase()))}
      and image like 'https://ik.imagekit.io/nicks/products/kurti-%'
  `;

  console.log(
    JSON.stringify(
      {
        categories: {
          inserted: insertedCategories,
          skipped: skippedCategories,
          finalSampleCount: finalCategories[0].count,
        },
        products: {
          inserted: insertedProducts,
          updated: updatedProducts,
          skipped: skippedProducts,
          errors: errors.length,
          finalSampleCount: finalProducts[0].count,
          nicksImageUrlCount: imageRows[0].count,
        },
        errorDetails: errors,
      },
      null,
      2,
    ),
  );
} finally {
  await sql.end();
}
