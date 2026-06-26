"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const userName = session?.user?.name?.split(" ")[0];

  const accountLink =
    status === "authenticated"
      ? { label: userName ?? "Account", href: "/dashboard" }
      : { label: "Login", href: "/login" };

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 8);

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 text-[#694E4E] transition-all duration-300 ${
        isScrolled || isOpen
          ? "border-b border-[#694E4E]/15 bg-white/82 shadow-[0_18px_55px_rgba(105,78,78,0.11)] backdrop-blur-2xl"
          : "border-b border-transparent bg-white/20 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex size-11 items-center justify-center rounded-full border border-[#694E4E]/20 bg-[#FFCEE3] font-editorial text-2xl font-bold text-[#694E4E] shadow-sm transition group-hover:scale-105">
            M
          </span>
          <span>
            <span className="block font-editorial text-2xl font-bold leading-none tracking-[0.08em]">
              MKSTITCH
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.34em] text-[#694E4E]/70">
              Ethnic Atelier
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigationLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);

            return (
              <motion.div key={link.href} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={link.href}
                  data-active={active}
                  className="mk-underline inline-flex h-10 items-center text-sm font-semibold tracking-wide text-[#694E4E] transition hover:text-[#694E4E]/75"
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/shop"
            className="inline-flex h-11 min-w-44 items-center gap-2 rounded-full border border-[#694E4E]/12 bg-white/62 px-4 text-sm font-medium text-[#694E4E]/70 shadow-sm backdrop-blur transition hover:border-[#694E4E]/25 hover:bg-white"
          >
            <span aria-hidden="true">⌕</span>
            <span>Search styles</span>
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#694E4E]/15 bg-white/60 text-lg text-[#694E4E] transition hover:-translate-y-0.5 hover:bg-[#FFCEE3]"
          >
            ♡
          </Link>
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="relative inline-flex size-11 items-center justify-center rounded-full border border-[#694E4E]/15 bg-white/60 text-lg text-[#694E4E] transition hover:-translate-y-0.5 hover:bg-[#FFCEE3]"
          >
            ◇
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#694E4E] px-1.5 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </Link>
          {session?.user.role === "admin" ? (
            <Link
              href="/admin"
              className="inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold text-[#694E4E] transition hover:bg-[#FFFFFF]/50 hover:text-[#694E4E]"
            >
              Admin
            </Link>
          ) : null}
          <Link
            href={accountLink.href}
            className="inline-flex h-11 items-center rounded-full bg-[#694E4E] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#694E4E]/90"
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
          className="inline-flex size-11 items-center justify-center rounded-full border border-[#694E4E]/18 bg-white/68 text-[#694E4E] shadow-sm backdrop-blur lg:hidden"
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
            className="overflow-hidden border-t border-[#694E4E]/12 bg-white/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-5 sm:px-6">
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="flex min-h-12 items-center gap-2 rounded-2xl border border-[#694E4E]/12 bg-[#F5F5F5] px-4 text-sm font-semibold text-[#694E4E]/70"
              >
                <span aria-hidden="true">⌕</span>
                Search styles
              </Link>
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
                          ? "border-[#694E4E] bg-[#694E4E] text-white"
                          : "border-[#694E4E]/18 bg-[#FFFFFF]/45 text-[#694E4E]"
                      }`}
                    >
                      {link.label}
                      {link.href === "/cart" ? (
                        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#694E4E] px-2 text-xs text-white">
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
                  className="flex min-h-12 items-center rounded-2xl border border-[#694E4E]/18 bg-[#FFFFFF]/45 px-4 text-sm font-semibold"
                >
                  Admin
                </Link>
              ) : null}
              <div className="grid gap-3 pt-2">
                <Link
                  href={accountLink.href}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#694E4E] px-5 text-sm font-semibold text-white"
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
