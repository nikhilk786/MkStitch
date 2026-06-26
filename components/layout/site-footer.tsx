import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { Reveal } from "@/components/ui/motion-primitives";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const collections = ["Daily Wear", "Office Edit", "Festive Wear", "Wedding Edit"];
const support = ["Shipping", "Returns", "Size Guide", "Care Notes"];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#694E4E]/12 bg-[#FFCEE3] text-[#694E4E]">
      <Reveal className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_0.7fr_0.75fr_0.85fr_1.1fr] lg:px-8">
        <div>
          <Link href="/" className="font-editorial text-4xl font-bold tracking-[0.08em]">
            MKSTITCH
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[#694E4E]/78">
            Premium women&apos;s ethnic wear shaped with soft fabrics, graceful
            silhouettes, and quiet boutique detailing.
          </p>
          <div className="mt-6 flex gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
            {["Instagram", "Facebook", "Pinterest"].map((item) => (
              <Link
                key={item}
                href="/"
                className="rounded-full border border-[#694E4E]/15 bg-white/45 px-3 py-2 transition hover:bg-white"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E]">
            Explore
          </p>
          <div className="mt-5 grid gap-3 text-sm font-medium text-[#694E4E]/76">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#694E4E]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E]">
            Collections
          </p>
          <div className="mt-5 grid gap-3 text-sm font-medium text-[#694E4E]/76">
            {collections.map((item) => (
              <Link key={item} href="/collections" className="transition hover:text-[#694E4E]">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E]">
            Support
          </p>
          <div className="mt-5 grid gap-3 text-sm font-medium text-[#694E4E]/76">
            {support.map((item) => (
              <Link key={item} href="/contact" className="transition hover:text-[#694E4E]">
                {item}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-2 text-sm leading-6 text-[#694E4E]/76">
            <p>hello@mkstitch.example</p>
            <p>+91 98765 43210</p>
            <p>Jaipur, Rajasthan</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#694E4E]/12 bg-white/45 p-5 backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E]">
            The Edit
          </p>
          <p className="mt-5 text-sm leading-7 text-[#694E4E]/76">
            New arrivals, styling notes, and festive edits from the atelier.
          </p>
          <NewsletterForm compact />
        </div>
      </Reveal>
      <div className="border-t border-[#694E4E]/20 px-4 py-5 text-center text-xs text-[#694E4E]/75">
        &copy; {new Date().getFullYear()} MKSTITCH Kurti Atelier. All rights reserved.
      </div>
    </footer>
  );
}
