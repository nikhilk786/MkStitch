"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";
import { selectCartCount } from "@/features/cart/cartSlice";
import { useAppSelector } from "@/lib/store/hooks";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function SiteHeader() {
  const cartCount = useAppSelector(selectCartCount);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const userName = session?.user?.name?.split(" ")[0];

  const accountLink =
    status === "authenticated"
      ? { label: userName ?? "Account", href: "/dashboard" }
      : { label: "Login", href: "/login" };

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-[#978F66]/20 bg-[#E4D6A9]/78 text-[#5C4F4A] shadow-[0_12px_34px_rgba(92,79,74,0.08)] backdrop-blur-2xl"
    >
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex size-11 items-center justify-center rounded-full border border-[#978F66]/35 bg-[#fffdf7]/65 font-editorial text-2xl font-bold text-[#978F66] shadow-sm transition group-hover:scale-105">
            C
          </span>
          <span>
            <span className="block font-editorial text-2xl font-semibold leading-none">
              ClothWeb
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[#978F66]">
              Kurti Atelier
            </span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-[#978F66]/20 bg-[#fffdf7]/45 p-1 shadow-sm lg:flex">
          {navigationLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);

            return (
              <motion.div key={link.href} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={link.href}
                  className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition ${
                    active
                      ? "bg-[#978F66] text-white shadow-sm"
                      : "text-[#5C4F4A] hover:bg-[#E4D6A9]/70 hover:text-[#978F66]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/wishlist"
            className="inline-flex h-11 items-center rounded-full border border-[#978F66]/20 bg-[#fffdf7]/45 px-4 text-sm font-semibold text-[#5C4F4A] transition hover:border-[#978F66]/45 hover:text-[#978F66]"
          >
            Wishlist
          </Link>
          <Link
            href="/cart"
            className="inline-flex h-11 items-center rounded-full border border-[#978F66]/25 bg-[#fffdf7]/55 px-4 text-sm font-semibold text-[#5C4F4A] transition hover:border-[#978F66]/50 hover:text-[#978F66]"
          >
            Bag
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#978F66] px-1.5 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </Link>
          {session?.user.role === "admin" ? (
            <Link
              href="/admin"
              className="inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold text-[#5C4F4A] transition hover:bg-[#fffdf7]/50 hover:text-[#978F66]"
            >
              Admin
            </Link>
          ) : null}
          <Link
            href={accountLink.href}
            className="inline-flex h-11 items-center rounded-full bg-[#5C4F4A] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#978F66]"
          >
            {accountLink.label}
          </Link>
          {status === "authenticated" ? <LogoutButton /> : null}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-full border border-[#978F66]/25 bg-[#fffdf7]/60 text-[#5C4F4A] shadow-sm lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition ${
                isOpen ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#978F66]/18 bg-[#E4D6A9]/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-5 sm:px-6">
              {[...navigationLinks, { label: "Wishlist", href: "/wishlist" }, { label: "Bag", href: "/cart" }].map(
                (link) => {
                  const active = isActiveLink(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex min-h-12 items-center justify-between rounded-2xl border px-4 text-sm font-semibold transition ${
                        active
                          ? "border-[#978F66] bg-[#978F66] text-white"
                          : "border-[#978F66]/18 bg-[#fffdf7]/45 text-[#5C4F4A]"
                      }`}
                    >
                      {link.label}
                      {link.href === "/cart" ? (
                        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#5C4F4A] px-2 text-xs text-white">
                          {cartCount}
                        </span>
                      ) : null}
                    </Link>
                  );
                },
              )}
              {session?.user.role === "admin" ? (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-12 items-center rounded-2xl border border-[#978F66]/18 bg-[#fffdf7]/45 px-4 text-sm font-semibold"
                >
                  Admin
                </Link>
              ) : null}
              <div className="grid gap-3 pt-2">
                <Link
                  href={accountLink.href}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#5C4F4A] px-5 text-sm font-semibold text-white"
                >
                  {accountLink.label}
                </Link>
                {status === "authenticated" ? <LogoutButton /> : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
