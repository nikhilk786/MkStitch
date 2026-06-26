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

export function SiteFooter() {
  return (
    <footer className="border-t border-[#978F66]/20 bg-[#E4D6A9] text-[#5C4F4A]">
      <Reveal className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.15fr_0.75fr_0.85fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="font-editorial text-3xl font-semibold">
            ClothWeb
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7">
            Rooted in timeless Indian elegance, our kurti collections pair soft
            fabrics, graceful silhouettes, and premium finishing for modern
            women.
          </p>
          <div className="mt-6 flex gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#978F66]">
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#978F66]">
            Explore
          </p>
          <div className="mt-5 grid gap-3 text-sm font-medium">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#978F66]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#978F66]">
            Boutique
          </p>
          <div className="mt-5 grid gap-3 text-sm leading-6">
            <p>hello@clothweb.example</p>
            <p>+91 98765 43210</p>
            <p>Jaipur, Rajasthan</p>
            <p>Mon-Sat, 10:00 AM-7:00 PM</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#978F66]">
            The Edit
          </p>
          <p className="mt-5 text-sm leading-7">
            New arrivals, styling notes, and festive edits from the atelier.
          </p>
          <NewsletterForm compact />
        </div>
      </Reveal>
      <div className="border-t border-[#978F66]/20 px-4 py-5 text-center text-xs text-[#5C4F4A]/75">
        &copy; {new Date().getFullYear()} ClothWeb Kurti Atelier. All rights reserved.
      </div>
    </footer>
  );
}
