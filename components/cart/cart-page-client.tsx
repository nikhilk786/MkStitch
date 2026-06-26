"use client";

import Image from "next/image";
import Link from "next/link";
import {
  clearCart,
  decreaseQuantity,
  getCartItemKey,
  increaseQuantity,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function CartPageClient() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const totalItems = useAppSelector(selectCartCount);

  if (items.length === 0) {
    return (
      <main className="min-h-[65vh] bg-[#fbf8ef] text-[#5C4F4A]">
        <section className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#E4D6A9] text-3xl text-[#978F66]">⌑</div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[#978F66]">
            Your shopping bag
          </p>
          <h1 className="mt-4 font-editorial text-5xl font-semibold">
            A little room for something beautiful
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7">
            Add your favourite kurtis and they will appear here with selected
            size, color, and quantity.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#5C4F4A] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#978F66]"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fbf8ef] text-[#5C4F4A]">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#978F66]">
              Your shopping bag
            </p>
            <h1 className="mt-3 font-editorial text-5xl font-semibold">
              Your selected styles
            </h1>
          </div>
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="h-11 rounded-full border border-[#978F66]/25 px-5 text-sm font-semibold text-[#5C4F4A] transition-colors hover:border-[#978F66] hover:bg-[#978F66] hover:text-white"
          >
            Clear cart
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => {
              const itemKey = getCartItemKey(item);

              return (
                <article
                  key={itemKey}
                  className="boutique-shadow grid gap-4 rounded-2xl border border-[#978F66]/18 bg-[#fffdf7] p-4 sm:grid-cols-[120px_1fr_auto]"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="block overflow-hidden rounded-2xl bg-[#E4D6A9]"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={240}
                      height={240}
                      className="aspect-square h-full w-full object-cover"
                    />
                  </Link>

                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-editorial text-xl font-semibold"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-2 text-sm text-[#5C4F4A]/65">
                      Size {item.size} / {item.color}
                    </p>
                    <p className="mt-3 font-bold text-[#978F66]">
                      {currency.format(item.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(itemKey))}
                      className="mt-4 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="inline-flex h-11 items-center overflow-hidden rounded-full border border-[#978F66]/20 bg-[#fffdf7]">
                      <button
                        type="button"
                        onClick={() => dispatch(decreaseQuantity(itemKey))}
                        className="h-full w-11 text-xl text-[#5C4F4A] transition-colors hover:bg-[#E4D6A9]/65"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => dispatch(increaseQuantity(itemKey))}
                        className="h-full w-11 text-xl text-[#5C4F4A] transition-colors hover:bg-[#E4D6A9]/65"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-[#978F66]">
                      {currency.format(item.price * item.quantity)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="boutique-shadow h-fit rounded-2xl border border-[#978F66]/18 bg-[#fffdf7] p-6 lg:sticky lg:top-28">
            <h2 className="font-editorial text-2xl font-semibold">
              Order summary
            </h2>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between text-[#5C4F4A]/70">
                <span>Total items</span>
                <span className="font-semibold">{totalItems}</span>
              </div>
              <div className="flex justify-between text-[#5C4F4A]/70">
                <span>Subtotal</span>
                <span className="font-semibold">
                  {currency.format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#978F66]/20 pt-4 text-base font-bold">
                <span>Total</span>
                <span>{currency.format(subtotal)}</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 h-12 w-full rounded-full bg-[#5C4F4A] px-6 text-sm font-semibold text-white shadow-lg shadow-[#5C4F4A]/15 transition hover:-translate-y-0.5 hover:bg-[#978F66]"
            >
              Checkout later
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
