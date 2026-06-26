import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";

const values = [
  ["Crafted Grace", "Silhouettes inspired by timeless Indian elegance and refined for modern wardrobes."],
  ["Soft Fabrics", "Breathable cottons, fluid blends, and gentle textures selected for all-day comfort."],
  ["Considered Details", "Finishing, trims, and proportions chosen to make every piece feel premium."],
  ["Everyday Ease", "Kurtis that move from work to celebration with quiet confidence."],
];

const promises = [
  ["Mission", "To make premium ethnic fashion feel effortless, wearable, and deeply feminine."],
  ["Vision", "A modern boutique wardrobe where Indian craft feels timeless, soft, and current."],
  ["Our Promise", "Comfort-first fabrics, elegant proportions, and details that respect daily life."],
];

export default function AboutPage() {
  return (
    <main className="bg-[#F5F5F5] text-[#694E4E]">
      <section className="relative overflow-hidden bg-[#FFCEE3]">
        <div className="boutique-gradient absolute inset-0 opacity-75" />
        <div className="boutique-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#694E4E]">
              Our boutique story
            </p>
            <h1 className="mt-5 font-editorial text-5xl font-semibold leading-tight sm:text-6xl">
              Rooted in timeless Indian elegance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8">
              Our collections bring together graceful silhouettes, soft fabrics,
              and handcrafted details for modern women.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="boutique-shadow rounded-[2rem] border border-[#694E4E]/20 bg-[#FFFFFF]/58 p-8 backdrop-blur">
              <p className="font-editorial text-4xl font-semibold">
                MKSTITCH is a quiet celebration of ethnic wear made for real life.
              </p>
              <p className="mt-5 leading-8">
                We design for the woman who wants comfort without losing polish,
                tradition without heaviness, and detail without excess.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
            Craftsmanship
          </p>
          <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
            Thoughtful pieces, graceful by design.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-8">
            From neckline proportion to fabric feel, every detail is selected to
            create an elegant kurti that feels easy, refined, and wearable. Our
            edits focus on clean finishing, soft drape, and timeless color.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {promises.map(([title, description]) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-[1.5rem] border border-[#694E4E]/12 bg-white p-7 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#694E4E]/70">
                  {title}
                </p>
                <p className="mt-5 text-base leading-8">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-[#FFFFFF] py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
              Why choose us
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
              Premium comfort, made beautifully.
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([title, description]) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-2xl border border-[#694E4E]/18 bg-[#F5F5F5] p-6 shadow-sm">
                  <div className="h-1.5 w-10 rounded-full bg-[#694E4E]" />
                  <h3 className="mt-5 font-editorial text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6">{description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="boutique-gradient boutique-shadow mx-auto grid w-full max-w-7xl gap-8 rounded-[2rem] border border-[#694E4E]/20 p-8 sm:p-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
              Fabric quality
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-semibold">
              Softness you can feel, polish you can see.
            </h2>
            <p className="mt-5 max-w-2xl leading-8">
              Our fabric-first approach keeps each piece breathable, flattering,
              and comfortable across seasons.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex h-13 items-center justify-center rounded-full bg-[#694E4E] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#694E4E]"
          >
            Explore Kurtis
          </Link>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#694E4E]">
            Luxury gallery
          </p>
          <h2 className="mt-3 font-editorial text-4xl font-semibold sm:text-5xl">
            Quiet details, beautifully finished.
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {["Atelier drape", "Soft texture", "Festive polish"].map((item) => (
            <StaggerItem key={item}>
              <div className="flex aspect-[4/5] items-end rounded-[1.5rem] bg-[#FFCEE3] p-5">
                <span className="rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
                  {item}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </main>
  );
}
