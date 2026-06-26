import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product/product-detail-client";
import { getActiveProductBySlug } from "@/lib/storefront-products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getActiveProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[#F5F5F5]">
      <ProductDetailClient product={product} />
    </main>
  );
}
