import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function WishlistPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-[65vh] bg-[#F5F5F5] text-[#694E4E]">
      <section className="mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#FFCEE3] text-3xl text-[#694E4E]">♡</div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-[#694E4E]">
          Your personal edit
        </p>
        <h1 className="mt-4 font-editorial text-5xl font-semibold">
          Styles worth coming back to
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-7">
          This page is protected. Wishlist products can be connected to this
          logged-in user later using {session.user.email}.
        </p>
        <a href="/shop" className="mt-8 inline-flex rounded-full bg-[#694E4E] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#694E4E]">
          Explore the collection
        </a>
      </section>
    </main>
  );
}
