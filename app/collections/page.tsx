import Image from "next/image";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";

const fallbackCollections = [
  ["Daily Wear Kurtis", "Soft cottons and easy silhouettes for everyday polish."],
  ["Festive Collection", "Radiant colors, refined detailing, and celebration-ready drape."],
  ["Office Wear", "Elegant kurtis designed for polished workdays."],
  ["Designer Kurtis", "Statement silhouettes with boutique-level finishing."],
  ["Cotton Comfort", "Breathable textures for warm days and slow weekends."],
  ["New Arrivals", "Fresh edits from the latest ClothWeb collection."],
];

export default async function CollectionsPage() {
  const categoryRows = await db
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

  return (
    <main className="bg-[#fbf8ef] text-[#5C4F4A]">
      <section className="relative overflow-hidden bg-[#E4D6A9]">
        <div className="boutique-gradient absolute inset-0 opacity-75" />
        <div className="boutique-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#978F66]">
              Collections
            </p>
            <h1 className="mt-5 font-editorial text-5xl font-semibold leading-tight sm:text-6xl">
              Curated kurti edits for every mood, day, and occasion.
            </h1>
            <p className="mt-6 text-lg leading-8">
              Explore premium ethnic wear collections shaped around comfort,
              elegance, fabric, and graceful Indian design.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {categoryRows.length ? (
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categoryRows.map((category) => (
              <StaggerItem key={category.id}>
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group boutique-shadow relative block min-h-96 overflow-hidden rounded-2xl border border-[#978F66]/18 bg-[#E4D6A9]"
                >
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="boutique-gradient absolute inset-0" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5C4F4A]/78 via-[#5C4F4A]/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="inline-flex rounded-full bg-[#fffdf7]/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                      Shop category
                    </span>
                    <h2 className="mt-4 font-editorial text-3xl font-semibold">
                      {category.name}
                    </h2>
                    {category.description ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/82">
                        {category.description}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {fallbackCollections.map(([title, description], index) => (
              <StaggerItem key={title}>
                <Link
                  href="/shop"
                  className="boutique-shadow group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-2xl border border-[#978F66]/18 bg-[#fffdf7] p-7"
                >
                  <div className="boutique-gradient absolute inset-0 opacity-65 transition group-hover:scale-105" />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#978F66]">
                      0{index + 1}
                    </p>
                    <h2 className="mt-5 font-editorial text-4xl font-semibold">
                      {title}
                    </h2>
                  </div>
                  <p className="relative mt-8 max-w-sm text-sm leading-7">
                    {description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>
    </main>
  );
}
