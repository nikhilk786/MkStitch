import Image from "next/image";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { ProductCard } from "@/components/product/product-card";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import {
  LuxuryMarquee,
  SectionTitle,
  SoftPanel,
} from "@/components/ui/luxury-primitives";
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

const occasions = [
  ["Everyday Elegance", "Soft kurtis for daily rituals, errands, and easy office days."],
  ["Festive Collection", "Refined details for pooja mornings, family evenings, and celebrations."],
  ["Wedding Edit", "Graceful silhouettes that feel polished without feeling heavy."],
  ["Office Collection", "Clean lines, breathable comfort, and quiet confidence."],
];

const instagramTiles = ["Drape", "Texture", "Pink Edit", "Atelier", "Festive", "Cotton"];

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
    <main className="overflow-hidden bg-[#F5F5F5] text-[#694E4E]">
      <LuxuryMarquee
        items={[
          "Premium ethnic wear",
          "Soft fabrics",
          "Modern boutique fits",
          "Festive edits",
          "Timeless kurtis",
        ]}
      />
      <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-[#FFCEE3]">
        <div className="boutique-gradient absolute inset-0 opacity-80" />
        <div className="boutique-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="inline-flex rounded-full border border-[#694E4E]/25 bg-[#FFFFFF]/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E] backdrop-blur">
              MKSTITCH signature collection
            </span>
            <h1 className="mt-7 font-editorial text-5xl font-semibold leading-[0.95] text-[#694E4E] sm:text-6xl lg:text-7xl">
              Premium Ethnic Wear for the Modern Woman
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 sm:text-lg">
              Elegant kurtis, soft fabrics, and timeless Indian silhouettes
              crafted for everyday grace, festive moments, and everything in
              between.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-13 items-center justify-center rounded-full bg-[#694E4E] px-7 text-sm font-semibold text-white shadow-lg shadow-[#694E4E]/15 transition hover:-translate-y-0.5 hover:bg-[#694E4E]"
              >
                Shop New Arrivals
              </Link>
              <Link
                href="/collections"
                className="inline-flex h-13 items-center justify-center rounded-full border border-[#694E4E]/35 bg-[#FFFFFF]/45 px-7 text-sm font-semibold text-[#694E4E] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#694E4E] hover:text-[#694E4E]"
              >
                Explore Collections
              </Link>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#694E4E]">
              <span className="rounded-full border border-[#694E4E]/20 bg-[#FFFFFF]/40 px-3 py-3">
                Soft fabric
              </span>
              <span className="rounded-full border border-[#694E4E]/20 bg-[#FFFFFF]/40 px-3 py-3">
                Fine finish
              </span>
              <span className="rounded-full border border-[#694E4E]/20 bg-[#FFFFFF]/40 px-3 py-3">
                Easy fit
              </span>
            </div>
          </Reveal>

          <Reveal className="relative mx-auto w-full max-w-xl" delay={0.15}>
            <div className="boutique-shadow relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#FFFFFF]/65 bg-[#FFCEE3]">
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
                <div className="flex h-full items-center justify-center bg-[#FFCEE3] p-10">
                  <div className="h-[84%] w-[56%] rounded-t-full rounded-b-[2rem] border border-[#694E4E]/30 bg-[#FFFFFF]/50 shadow-2xl" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#694E4E]/45 via-transparent to-[#FFFFFF]/10" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-[#FFFFFF]/50 bg-[#FFFFFF]/78 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#694E4E]">
                  Signature edit
                </p>
                <p className="mt-2 font-editorial text-3xl font-semibold text-[#694E4E]">
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
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
              Shop by collection
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
              Find your kind of elegance
            </h2>
          </div>
          <Link href="/collections" className="font-semibold text-[#694E4E]">
            View all collections
          </Link>
        </Reveal>

        {categoryRows.length ? (
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {categoryRows.slice(0, 3).map((category) => (
              <StaggerItem key={category.id}>
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="group boutique-shadow relative block min-h-96 overflow-hidden rounded-2xl border border-[#694E4E]/18 bg-[#FFCEE3]"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#694E4E]/78 via-[#694E4E]/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="inline-flex rounded-full bg-[#FFFFFF]/20 px-3 py-1 text-xs font-semibold backdrop-blur">
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
                  className="group boutique-shadow relative block min-h-96 overflow-hidden rounded-2xl border border-[#694E4E]/18 bg-[#FFCEE3]"
                >
                  <div className="boutique-gradient absolute inset-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#694E4E]/78 via-[#694E4E]/12 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="inline-flex rounded-full bg-[#FFFFFF]/20 px-3 py-1 text-xs font-semibold backdrop-blur">
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

      <section className="bg-[#FFFFFF] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
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
            <div className="mt-10 rounded-2xl border border-[#694E4E]/20 bg-[#F5F5F5] p-10 text-center">
              <p className="font-editorial text-2xl font-semibold">New styles are being curated</p>
              <p className="mt-2 text-sm">Active products from the boutique catalog will appear here.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <SectionTitle
            eyebrow="Shop by occasion"
            title="A wardrobe for every beautiful moment"
            description="From cotton comfort to festive polish, MKSTITCH edits are made to move naturally through your life."
            align="center"
          />
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map(([title, description], index) => (
            <StaggerItem key={title}>
              <Link
                href="/collections"
                className="group flex min-h-64 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-[#694E4E]/12 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#694E4E]/10"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-[#FFCEE3] font-editorial text-xl font-bold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-editorial text-3xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#694E4E]/72">{description}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <Reveal>
          <div className="boutique-gradient boutique-shadow flex aspect-square items-center justify-center rounded-[2rem] border border-[#694E4E]/20 p-8">
            <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] border border-[#FFFFFF]/65 bg-[#FFFFFF]/35 text-center backdrop-blur">
              <div>
                <p className="font-editorial text-7xl font-semibold text-[#694E4E]">MK</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#694E4E]">
                  MKSTITCH Atelier
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
            Our story
          </p>
          <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
            Tradition, softened for modern life
          </h2>
          <p className="mt-6 text-base leading-8">
            MKSTITCH celebrates the quiet beauty of ethnic craft through
            wearable silhouettes, breathable fabrics, and thoughtful detailing.
            Every edit is designed to feel graceful, comfortable, and refined.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-[#694E4E]/18 bg-[#FFFFFF] p-5 shadow-sm">
                <div className="h-1.5 w-10 rounded-full bg-[#694E4E]" />
                <h3 className="mt-5 font-editorial text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6">{description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Premium fabrics"
              title="Softness you notice before the compliments arrive"
              description="Every edit is selected for gentle drape, breathable comfort, and finishing that feels considered on close inspection."
            />
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {["Breathable cottons", "Fluid festive blends", "Refined finishing"].map((item) => (
              <StaggerItem key={item}>
                <SoftPanel>
                  <div className="h-1.5 w-12 rounded-full bg-[#FFCEE3]" />
                  <h3 className="mt-5 font-editorial text-2xl font-semibold">{item}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#694E4E]/70">
                    Designed for comfort, polish, and repeat wear.
                  </p>
                </SoftPanel>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-[#694E4E] py-20 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#FFCEE3]">
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
                  <div className="text-lg tracking-widest text-[#FFCEE3]">★★★★★</div>
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

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <SectionTitle
            eyebrow="Instagram gallery"
            title="From the MKSTITCH moodboard"
            description="Soft pinks, graceful drapes, fabric close-ups, and styling notes from the boutique."
            align="center"
          />
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramTiles.map((tile, index) => (
            <StaggerItem key={tile}>
              <div className="flex aspect-square items-end rounded-[1.25rem] border border-[#694E4E]/10 bg-[#FFCEE3] p-4 shadow-sm">
                <span className="rounded-full bg-white/68 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">
                  {index + 1}. {tile}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="boutique-gradient boutique-shadow relative mx-auto grid w-full max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-[#694E4E]/20 px-6 py-12 sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
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
