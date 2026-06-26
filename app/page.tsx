import Image from "next/image";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { ProductCard } from "@/components/product/product-card";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { getActiveProducts } from "@/lib/storefront-products";

const curatedCollections = [
  {
    title: "Daily Wear Kurtis",
    description: "Soft, breathable pieces for graceful everyday movement.",
  },
  {
    title: "Festive Collection",
    description: "Elegant details, radiant tones, and occasion-ready silhouettes.",
  },
  {
    title: "Office Wear",
    description: "Polished kurtis with refined lines and all-day ease.",
  },
];

const benefits = [
  ["Soft Fabrics", "Lightweight textures selected for comfort from morning to evening."],
  ["Premium Finishing", "Clean seams, graceful drape, and details that feel considered."],
  ["Ethnic Modernity", "Traditional inspiration shaped for a contemporary wardrobe."],
  ["Easy Styling", "Pieces that pair beautifully with trousers, palazzos, and dupattas."],
];

const testimonials = [
  {
    quote:
      "The fabric feels soft and the silhouette is elegant without trying too hard.",
    name: "Aarohi S.",
  },
  {
    quote:
      "My festive kurti looked refined in person. The finishing feels genuinely premium.",
    name: "Meera K.",
  },
  {
    quote:
      "Comfortable enough for work and polished enough for dinner.",
    name: "Riya M.",
  },
];

export default async function Home() {
  const [categoryRows, products] = await Promise.all([
    db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        image: categories.image,
      })
      .from(categories)
      .where(eq(categories.isActive, true))
      .orderBy(asc(categories.name)),
    getActiveProducts(),
  ]);

  const heroImage = categoryRows.find((category) => category.image)?.image;
  const productPreview = products.slice(0, 4);

  return (
    <main className="overflow-hidden bg-[#fbf8ef] text-[#5C4F4A]">
      <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#E4D6A9]">
        <div className="boutique-gradient absolute inset-0 opacity-80" />
        <div className="boutique-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="inline-flex rounded-full border border-[#978F66]/25 bg-[#fffdf7]/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#978F66] backdrop-blur">
              Modern Indian fashion
            </span>
            <h1 className="mt-7 font-editorial text-5xl font-semibold leading-[0.95] text-[#5C4F4A] sm:text-6xl lg:text-7xl">
              Premium Kurtis for Graceful Everyday Elegance
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 sm:text-lg">
              Rooted in timeless Indian elegance, our collections bring together
              graceful silhouettes, soft fabrics, and handcrafted details for
              modern women.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#5C4F4A] px-7 text-sm font-semibold text-white shadow-lg shadow-[#5C4F4A]/15 transition hover:-translate-y-0.5 hover:bg-[#978F66]"
              >
                Shop Kurtis
              </Link>
              <Link
                href="/collections"
                className="inline-flex h-13 items-center justify-center rounded-full border border-[#978F66]/35 bg-[#fffdf7]/45 px-7 text-sm font-semibold text-[#5C4F4A] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#978F66] hover:text-[#978F66]"
              >
                View Collections
              </Link>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#978F66]">
              <span className="rounded-full border border-[#978F66]/20 bg-[#fffdf7]/40 px-3 py-3">
                Soft fabric
              </span>
              <span className="rounded-full border border-[#978F66]/20 bg-[#fffdf7]/40 px-3 py-3">
                Fine finish
              </span>
              <span className="rounded-full border border-[#978F66]/20 bg-[#fffdf7]/40 px-3 py-3">
                Easy fit
              </span>
            </div>
          </Reveal>

          <Reveal className="relative mx-auto w-full max-w-xl" delay={0.15}>
            <div className="boutique-shadow relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#fffdf7]/65 bg-[#f3ecd5]">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="Premium Kurti collection"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#f3ecd5] p-10">
                  <div className="h-[84%] w-[56%] rounded-t-full rounded-b-[2rem] border border-[#978F66]/30 bg-[#fffdf7]/50 shadow-2xl" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5C4F4A]/45 via-transparent to-[#fffdf7]/10" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[#fffdf7]/50 bg-[#fffdf7]/78 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#978F66]">
                  Signature edit
                </p>
                <p className="mt-2 font-editorial text-3xl font-semibold text-[#5C4F4A]">
                  Grace in every detail
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#978F66]">
              Shop by collection
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
              Find your kind of elegance
            </h2>
          </div>
          <Link href="/collections" className="font-semibold text-[#978F66]">
            View all collections
          </Link>
        </Reveal>

        {categoryRows.length ? (
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {categoryRows.slice(0, 3).map((category) => (
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
                      Explore collection
                    </span>
                    <h3 className="mt-4 font-editorial text-3xl font-semibold">
                      {category.name}
                    </h3>
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
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {curatedCollections.map((collection) => (
              <StaggerItem key={collection.title}>
                <Link
                  href="/collections"
                  className="group boutique-shadow relative block min-h-96 overflow-hidden rounded-2xl border border-[#978F66]/18 bg-[#E4D6A9]"
                >
                  <div className="boutique-gradient absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5C4F4A]/78 via-[#5C4F4A]/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="inline-flex rounded-full bg-[#fffdf7]/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                      Explore collection
                    </span>
                    <h3 className="mt-4 font-editorial text-3xl font-semibold">
                      {collection.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/82">
                      {collection.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>

      <section className="bg-[#fffdf7] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#978F66]">
              Latest edit
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-editorial text-4xl font-semibold sm:text-5xl">
              Fresh kurtis from the boutique
            </h2>
          </Reveal>
          {productPreview.length ? (
            <Stagger className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {productPreview.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <div className="mt-10 rounded-2xl border border-[#978F66]/20 bg-[#fbf8ef] p-10 text-center">
              <p className="font-editorial text-2xl font-semibold">New styles are being curated</p>
              <p className="mt-2 text-sm">Active products from the boutique catalog will appear here.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <Reveal>
          <div className="boutique-gradient boutique-shadow flex aspect-square items-center justify-center rounded-[2rem] border border-[#978F66]/20 p-8">
            <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] border border-[#fffdf7]/65 bg-[#fffdf7]/35 text-center backdrop-blur">
              <div>
                <p className="font-editorial text-7xl font-semibold text-[#5C4F4A]">CW</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#978F66]">
                  Kurti Atelier
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#978F66]">
            Our story
          </p>
          <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
            Tradition, softened for modern life
          </h2>
          <p className="mt-6 text-base leading-8">
            ClothWeb celebrates the quiet beauty of ethnic craft through
            wearable silhouettes, breathable fabrics, and thoughtful detailing.
            Every edit is designed to feel graceful, comfortable, and refined.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-[#978F66]/18 bg-[#fffdf7] p-5 shadow-sm">
                <div className="h-1.5 w-10 rounded-full bg-[#978F66]" />
                <h3 className="mt-5 font-editorial text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6">{description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-[#5C4F4A] py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#E4D6A9]">
              Loved by our community
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
              Kind words, beautifully worn
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name}>
                <figure className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
                  <div className="text-lg tracking-widest text-[#E4D6A9]">★★★★★</div>
                  <blockquote className="mt-5 font-editorial text-2xl leading-8 text-white/90">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-7 font-semibold">{testimonial.name}</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="boutique-gradient boutique-shadow relative mx-auto grid w-full max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-[#978F66]/20 px-6 py-12 sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#978F66]">
              The boutique letter
            </p>
            <h2 className="mt-3 max-w-2xl font-editorial text-4xl font-semibold">
              New collections, styling notes, and a little everyday beauty.
            </h2>
          </div>
          <NewsletterForm />
        </Reveal>
      </section>
    </main>
  );
}
