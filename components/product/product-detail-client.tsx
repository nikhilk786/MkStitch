"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/data/products";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/store/hooks";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductDetailClient({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  function handleAddToCart() {
    dispatch(
      addToCart({
        product,
        size: selectedSize,
        color: selectedColor,
        quantity,
      }),
    );
    setAddedMessage("Added to cart");
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-12 text-[#5C4F4A] sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65 }}
        className="boutique-shadow overflow-hidden rounded-2xl border border-[#978F66]/18 bg-[#E4D6A9]"
      >
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={1000}
          height={1250}
          priority
          className="aspect-[4/5] h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="lg:pt-6"
      >
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#978F66]">
          {product.gender} / {product.category}
        </p>
        <h1 className="mt-4 font-editorial text-4xl font-semibold leading-tight sm:text-5xl">
          {product.name}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className="text-2xl font-bold text-[#978F66]">
            {currency.format(product.price)}
          </p>
          <p className="text-lg text-[#5C4F4A]/45 line-through">
            {currency.format(product.oldPrice)}
          </p>
          <span className="rounded-full bg-[#E4D6A9]/65 px-3 py-1 text-sm font-semibold text-[#5C4F4A]">
            {product.stock} in stock
          </span>
        </div>

        <p className="mt-2 text-sm font-medium text-[#5C4F4A]/65">
          {product.rating} rating from {product.reviews} reviews
        </p>
        <p className="mt-6 max-w-xl text-base leading-8">
          {product.description}
        </p>

        <div className="mt-8 space-y-7">
          <div>
            <p className="text-sm font-semibold">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 min-w-12 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    selectedSize === size
                      ? "border-[#978F66] bg-[#978F66] text-white"
                      : "border-[#978F66]/20 bg-[#fffdf7] text-[#5C4F4A] hover:border-[#978F66]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Color</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                    selectedColor === color
                      ? "border-[#978F66] bg-[#978F66] text-white"
                      : "border-[#978F66]/20 bg-[#fffdf7] text-[#5C4F4A] hover:border-[#978F66]"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Quantity</p>
            <div className="mt-3 inline-flex h-12 items-center overflow-hidden rounded-full border border-[#978F66]/20 bg-[#fffdf7]">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="h-full w-12 text-xl font-medium text-[#5C4F4A] transition-colors hover:bg-[#E4D6A9]/65"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.min(product.stock, current + 1))
                }
                className="h-full w-12 text-xl font-medium text-[#5C4F4A] transition-colors hover:bg-[#E4D6A9]/65"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-8 h-14 w-full rounded-full bg-[#5C4F4A] px-8 text-sm font-semibold text-white shadow-lg shadow-[#5C4F4A]/15 transition hover:-translate-y-0.5 hover:bg-[#978F66] sm:w-auto"
        >
          Add to cart
        </button>
        {addedMessage ? (
          <p className="mt-3 text-sm font-semibold text-[#978F66]">
            {addedMessage}
          </p>
        ) : null}
        <div className="mt-9 grid grid-cols-3 gap-3 border-t border-[#978F66]/20 pt-7 text-center text-xs text-[#5C4F4A]/70">
          <span>Soft fabric</span>
          <span>Premium finish</span>
          <span>Easy comfort</span>
        </div>
      </motion.div>
    </section>
  );
}
