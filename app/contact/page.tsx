import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";

const contactCards = [
  ["Email", "hello@clothweb.example"],
  ["Phone", "+91 98765 43210"],
  ["Address", "Jaipur, Rajasthan"],
  ["Hours", "Mon-Sat, 10:00 AM-7:00 PM"],
];

export const metadata: Metadata = {
  title: "Contact | ClothWeb",
  description: "Contact ClothWeb Kurti Atelier for styling, orders, and boutique support.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#fbf8ef] text-[#5C4F4A]">
      <section className="relative overflow-hidden bg-[#E4D6A9]">
        <div className="boutique-gradient absolute inset-0 opacity-75" />
        <div className="boutique-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#978F66]">
              Contact the atelier
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-editorial text-5xl font-semibold leading-tight sm:text-6xl">
              We would love to help you find your next graceful piece.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">
              For styling help, order questions, boutique visits, or collaboration
              notes, reach out to the ClothWeb team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#978F66]">
              Boutique details
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold">
              Visit, call, or write to us.
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4">
            {contactCards.map(([title, value]) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-[#978F66]/18 bg-[#fffdf7] p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#978F66]">
                    {title}
                  </p>
                  <p className="mt-2 font-medium">{value}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="mt-8 rounded-2xl border border-[#978F66]/18 bg-[#E4D6A9]/55 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#978F66]">
              Social
            </p>
            <div className="mt-4 flex gap-4 text-sm font-semibold">
              <Link href="/" className="hover:text-[#978F66]">
                Instagram
              </Link>
              <Link href="/" className="hover:text-[#978F66]">
                Facebook
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
