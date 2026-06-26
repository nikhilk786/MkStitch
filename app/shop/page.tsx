import { ProductCard } from "@/components/product/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { getActiveProducts } from "@/lib/storefront-products";

export default async function ShopPage() {
  const products = await getActiveProducts();

  return (
    <main className="min-h-screen bg-[#fbf8ef] text-[#5C4F4A]">
      <section className="relative overflow-hidden bg-[#E4D6A9]">
        <div className="boutique-gradient absolute inset-0 opacity-65" />
        <div className="boutique-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#978F66]">
              The Kurti collection
            </p>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end">
              <h1 className="font-editorial text-5xl font-semibold leading-tight text-balance sm:text-6xl">
                Elegant ethnic wear for every part of your day.
              </h1>
              <p className="max-w-2xl text-lg leading-8">
                Explore handpicked kurtis, graceful prints, premium fabrics, and
                comfortable silhouettes from our active boutique catalog.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#978F66]">
              {products.length} handpicked styles
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-semibold">
              Shop the latest edit
            </h2>
          </div>
          <p className="text-sm">Soft fabrics · Elegant prints · Easy fits</p>
        </Reveal>

        {products.length ? (
          <Stagger className="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="mt-8 rounded-2xl border border-[#978F66]/20 bg-[#fffdf7] px-6 py-16 text-center shadow-sm">
            <h2 className="font-editorial text-2xl font-semibold">
              New styles are being curated
            </h2>
            <p className="mt-2 text-sm">
              Active products added in the admin panel will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
