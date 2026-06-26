import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

export async function GET() {
  try {
    const rows = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        image: categories.image,
      })
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.name));

    return Response.json(rows);
  } catch {
    return Response.json(
      { error: "Failed to fetch categories." },
      { status: 500 },
    );
  }
}
