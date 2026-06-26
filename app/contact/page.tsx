import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";

const contactCards = [
  ["Email", "hello@mkstitch.example"],
  ["Phone", "+91 98765 43210"],
  ["Address", "Jaipur, Rajasthan"],
  ["Hours", "Mon-Sat, 10:00 AM-7:00 PM"],
];

const faqs = [
  ["Do you help with styling?", "Yes, share your occasion and preferred fit and our boutique team will guide you."],
  ["Can I ask about fabric care?", "Absolutely. We can suggest wash and storage care for every MKSTITCH piece."],
  ["Where are you based?", "Our boutique support desk is based in Jaipur, Rajasthan."],
];

export const metadata: Metadata = {
  title: "Contact | MKSTITCH",
  description: "Contact MKSTITCH Kurti Atelier for styling, orders, and boutique support.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F5F5F5] text-[#694E4E]">
      <section className="relative overflow-hidden bg-[#FFCEE3]">
        <div className="boutique-gradient absolute inset-0 opacity-75" />
        <div className="boutique-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#694E4E]">
              Contact the atelier
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl font-editorial text-5xl font-semibold leading-tight sm:text-6xl">
              We would love to help you find your next graceful piece.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">
              For styling help, order questions, boutique visits, or collaboration
              notes, reach out to the MKSTITCH team.
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
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
              Boutique details
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold">
              Visit, call, or write to us.
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4">
            {contactCards.map(([title, value]) => (
              <StaggerItem key={title}>
                <div className="rounded-2xl border border-[#694E4E]/18 bg-[#FFFFFF] p-5 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#694E4E]">
                    {title}
                  </p>
                  <p className="mt-2 font-medium">{value}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="mt-8 rounded-2xl border border-[#694E4E]/18 bg-[#FFCEE3]/55 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#694E4E]">
              Social
            </p>
            <div className="mt-4 flex gap-4 text-sm font-semibold">
              <Link href="/" className="hover:text-[#694E4E]">
                Instagram
              </Link>
              <Link href="/" className="hover:text-[#694E4E]">
                Facebook
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal className="rounded-[1.5rem] border border-[#694E4E]/12 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E]/70">
            FAQ preview
          </p>
          <div className="mt-5 divide-y divide-[#694E4E]/10">
            {faqs.map(([question, answer]) => (
              <div key={question} className="py-4">
                <h3 className="font-editorial text-2xl font-semibold">{question}</h3>
                <p className="mt-2 text-sm leading-7 text-[#694E4E]/72">{answer}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="flex min-h-80 items-end rounded-[1.5rem] border border-[#694E4E]/12 bg-[#FFCEE3] p-6 shadow-sm">
          <div className="rounded-2xl bg-white/70 p-5 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E]/70">
              Map
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-semibold">
              Jaipur boutique support
            </h2>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
