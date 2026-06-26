import Link from "next/link";
import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#694E4E]/72">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-editorial text-4xl font-semibold leading-tight text-[#694E4E] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[#694E4E]/72">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function LuxuryMarquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border-y border-[#694E4E]/10 bg-white/58 py-4 text-[#694E4E]">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 px-5 text-xs font-bold uppercase tracking-[0.28em]">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-4 z-40 grid gap-2">
      <Link
        href="/contact"
        aria-label="Contact MKSTITCH on WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-[#694E4E] text-sm font-bold text-white shadow-lg shadow-[#694E4E]/20 transition hover:-translate-y-0.5"
      >
        WA
      </Link>
      <a
        href="#top"
        aria-label="Back to top"
        className="flex size-12 items-center justify-center rounded-full border border-[#694E4E]/15 bg-white/82 text-lg font-bold text-[#694E4E] shadow-lg shadow-[#694E4E]/10 backdrop-blur transition hover:-translate-y-0.5"
      >
        ↑
      </a>
    </div>
  );
}

export function SoftPanel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-[#694E4E]/12 bg-white/70 p-6 shadow-sm backdrop-blur">
      {children}
    </div>
  );
}
