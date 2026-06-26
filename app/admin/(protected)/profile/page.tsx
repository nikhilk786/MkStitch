import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default async function AdminProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  const [user] = await db
    .select({
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <p className="text-xs font-bold tracking-[0.24em] text-[#694E4E] uppercase">
        Account
      </p>
      <h1 className="mt-3 font-editorial text-4xl font-bold">
        Admin profile
      </h1>
      <p className="mt-3 text-[#694E4E]">
        Your authenticated administrator account details.
      </p>

      <section className="boutique-shadow mt-8 overflow-hidden rounded-[2rem] border border-[#f0d9e8] bg-white">
        <div className="boutique-gradient p-6 text-[#694E4E] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-white/75 text-2xl font-bold text-[#694E4E]">
              {initials(user.name)}
            </div>
            <div>
              <h2 className="font-editorial text-3xl font-bold">{user.name}</h2>
              <p className="mt-1 text-sm text-[#684d6c]">{user.email}</p>
              <span className="mt-3 inline-flex rounded-full bg-white/55 px-3 py-1 text-xs font-semibold text-[#694E4E]">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <dl className="grid gap-px bg-[#f0d9e8] sm:grid-cols-2">
          {[
            { label: "Full name", value: user.name },
            { label: "Email address", value: user.email },
            { label: "Account role", value: user.role },
            {
              label: "Account created",
              value: user.createdAt.toLocaleString(),
            },
            {
              label: "Last profile update",
              value: user.updatedAt.toLocaleString(),
            },
          ].map((item) => (
            <div key={item.label} className="bg-white p-6">
              <dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                {item.label}
              </dt>
              <dd className="mt-2 break-words font-semibold text-zinc-950">
                {item.value}
              </dd>
            </div>
          ))}
          <div className="bg-zinc-50 p-6">
            <dt className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Profile editing
            </dt>
            <dd className="mt-2 text-sm leading-6 text-zinc-600">
              TODO: Add editable profile fields when the account update
              requirements are defined.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
