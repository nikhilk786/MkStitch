import { and, eq } from "drizzle-orm";
import type { Product } from "@/data/products";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";

const placeholderImage = "/placeholder.svg";

function toStorefrontProduct(row: {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  strikePrice: string | null;
  stock: number;
  description: string | null;
  shortDescription: string | null;
  image: string | null;
}): Product {
  const price = Number(row.price);

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    gender: "Unisex",
    price,
    oldPrice: row.strikePrice ? Number(row.strikePrice) : price,
    rating: 0,
    reviews: 0,
    sizes: ["One Size"],
    colors: ["Default"],
    stock: row.stock,
    description:
      row.description ?? row.shortDescription ?? "Product details coming soon.",
    image: row.image || placeholderImage,
  };
}

const storefrontSelection = {
  id: products.id,
  slug: products.slug,
  name: products.name,
  category: categories.name,
  price: products.price,
  strikePrice: products.strikePrice,
  stock: products.stock,
  description: products.description,
  shortDescription: products.shortDescription,
  image: products.image,
};

export async function getActiveProducts() {
  const rows = await db
    .select(storefrontSelection)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(
      and(eq(products.isActive, true), eq(categories.isActive, true)),
    );

  return rows.map(toStorefrontProduct);
}

export async function getActiveProductBySlug(slug: string) {
  const [row] = await db
    .select(storefrontSelection)
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(
      and(
        eq(products.slug, slug),
        eq(products.isActive, true),
        eq(categories.isActive, true),
      ),
    )
    .limit(1);

  return row ? toStorefrontProduct(row) : null;
}
