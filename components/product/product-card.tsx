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
        <div className="boutique-shadow relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-[#694E4E]/12 bg-[#FFCEE3]">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#694E4E]/42 via-transparent to-transparent opacity-80" />
          <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/84 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#694E4E] backdrop-blur">
            New arrival
          </div>
          <span
            aria-hidden="true"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/55 bg-white/78 text-lg text-[#694E4E] backdrop-blur transition group-hover:bg-[#FFCEE3]"
          >
            ♡
          </span>
          <div className="absolute inset-x-4 bottom-4 translate-y-4 rounded-full border border-white/50 bg-white/82 px-4 py-3 text-center text-sm font-semibold text-[#694E4E] opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Quick view
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#694E4E]/68">
              {product.category}
            </p>
            <h2 className="mt-2 font-editorial text-2xl font-semibold leading-tight text-[#694E4E]">
              {product.name}
            </h2>
            <p className="mt-2 text-xs text-[#694E4E]/65">
              {product.rating} rating · {product.reviews} reviews · {product.stock} left
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#694E4E]">
              {currency.format(product.price)}
            </p>
            <p className="text-sm text-[#694E4E]/45 line-through">
              {currency.format(product.oldPrice)}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
