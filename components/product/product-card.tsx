"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article className="group" whileHover={{ y: -7 }} transition={{ duration: 0.25 }}>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="boutique-shadow relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#978F66]/18 bg-[#E4D6A9]">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#5C4F4A]/38 via-transparent to-transparent opacity-80" />
          <div className="absolute left-4 top-4 rounded-full border border-[#fffdf7]/55 bg-[#fffdf7]/82 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#978F66] backdrop-blur">
            Boutique edit
          </div>
          <div className="absolute bottom-4 left-4 rounded-full bg-[#5C4F4A]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {product.stock} available
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#978F66]">
              {product.category}
            </p>
            <h2 className="mt-2 font-editorial text-2xl font-semibold text-[#5C4F4A]">
              {product.name}
            </h2>
            <p className="mt-2 text-xs text-[#5C4F4A]/65">
              Rating {product.rating} · {product.reviews} reviews
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#978F66]">
              {currency.format(product.price)}
            </p>
            <p className="text-sm text-[#5C4F4A]/45 line-through">
              {currency.format(product.oldPrice)}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
