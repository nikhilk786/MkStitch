import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";

type DashboardOrder = {
  id: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: string;
  date: string;
};

type DashboardAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
};

const placeholderOrders: DashboardOrder[] = [
  {
    id: "CW-1024",
    status: "Processing",
    total: "Rs. 3,499",
    date: "19 Jun 2026",
  },
  {
    id: "CW-1018",
    status: "Delivered",
    total: "Rs. 2,199",
    date: "12 Jun 2026",
  },
  {
    id: "CW-1009",
    status: "Shipped",
    total: "Rs. 4,250",
    date: "04 Jun 2026",
  },
];

const placeholderAddress: DashboardAddress = {
  line1: "Add your default delivery address",
  line2: "Connect this card to the address API when available.",
  city: "City",
  state: "State",
  pincode: "Pincode",
};

function getInitials(name?: string | null) {
  if (!name) {
    return "U";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function DashboardCard({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="boutique-shadow rounded-2xl border border-[#978F66]/18 bg-[#fffdf7] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-editorial text-xl font-semibold text-[#5C4F4A]">{title}</h2>
          <p className="mt-1 text-sm text-[#5C4F4A]/65">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center justify-center rounded-full border border-[#978F66]/25 px-4 text-sm font-semibold text-[#5C4F4A] transition-colors hover:border-[#978F66] hover:bg-[#978F66] hover:text-white"
    >
      {children}
    </Link>
  );
}

function PlaceholderBadge() {
  return (
    <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
      Placeholder data
    </span>
  );
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const userName = user.name ?? "ClothWeb user";
  const userEmail = user.email ?? "Email not available";

  return (
    <main className="min-h-screen bg-[#fbf8ef] text-[#5C4F4A]">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="boutique-gradient boutique-shadow flex flex-col gap-6 rounded-[2rem] border border-[#978F66]/20 px-5 py-8 text-[#5C4F4A] sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#978F66]/25 bg-[#fffdf7]/70 text-xl font-bold text-[#978F66]">
              {getInitials(user.name)}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#978F66]">Account overview</p>
              <h1 className="mt-2 font-editorial text-4xl font-semibold">
                My Boutique Dashboard
              </h1>
              <p className="mt-2 text-sm">
                Welcome back, {userName}. Manage your profile, orders, and
                delivery details from one place.
              </p>
            </div>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.25fr]">
          <DashboardCard
            title="Profile"
            description="Your saved account details."
            action={<SecondaryLink href="/dashboard">Edit Profile</SecondaryLink>}
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#5C4F4A]/55">User name</p>
                <p className="mt-1 text-base font-semibold text-[#5C4F4A]">
                  {userName}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5C4F4A]/55">Email</p>
                <p className="mt-1 break-words text-base font-semibold text-[#5C4F4A]">
                  {userEmail}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5C4F4A]/55">Phone</p>
                <p className="mt-1 text-base font-semibold text-[#5C4F4A]">
                  Not added yet
                </p>
              </div>
              <div className="rounded-2xl bg-[#E4D6A9]/35 p-4 text-sm text-[#5C4F4A]/70">
                Profile phone/edit fields are ready for the future profile API.
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Orders"
            description="Recent order activity."
            action={
              <div className="flex flex-wrap gap-2">
                <PlaceholderBadge />
                <SecondaryLink href="/shop">View Orders</SecondaryLink>
              </div>
            }
          >
            <div className="overflow-hidden rounded-2xl border border-[#978F66]/18">
              <div className="hidden grid-cols-[1fr_1fr_1fr_1fr] bg-[#E4D6A9]/35 px-4 py-3 text-xs font-semibold text-[#5C4F4A]/65 sm:grid">
                <span>Order ID</span>
                <span>Status</span>
                <span>Total</span>
                <span>Date</span>
              </div>
              <div className="divide-y divide-[#978F66]/16">
                {placeholderOrders.map((order) => (
                  <div
                    key={order.id}
                    className="grid gap-3 px-4 py-4 text-sm sm:grid-cols-[1fr_1fr_1fr_1fr] sm:items-center"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#5C4F4A]/55 sm:hidden">
                        Order ID
                      </span>
                      <p className="font-semibold text-[#5C4F4A]">{order.id}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#5C4F4A]/55 sm:hidden">
                        Status
                      </span>
                      <p className="font-medium text-[#5C4F4A]/75">{order.status}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#5C4F4A]/55 sm:hidden">
                        Total
                      </span>
                      <p className="font-medium text-[#5C4F4A]/75">{order.total}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#5C4F4A]/55 sm:hidden">
                        Date
                      </span>
                      <p className="font-medium text-[#5C4F4A]/75">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Address"
            description="Default delivery address."
            action={
              <div className="flex flex-wrap gap-2">
                <PlaceholderBadge />
                <SecondaryLink href="/dashboard">Manage Address</SecondaryLink>
              </div>
            }
          >
            <div className="rounded-2xl border border-[#978F66]/18 bg-[#E4D6A9]/30 p-5">
              <p className="text-base font-semibold text-[#5C4F4A]">
                {placeholderAddress.line1}
              </p>
              {placeholderAddress.line2 ? (
                <p className="mt-2 text-sm text-[#5C4F4A]/70">
                  {placeholderAddress.line2}
                </p>
              ) : null}
              <p className="mt-4 text-sm font-medium text-[#5C4F4A]/75">
                {placeholderAddress.city}, {placeholderAddress.state}{" "}
                {placeholderAddress.pincode}
              </p>
            </div>
          </DashboardCard>
        </div>
      </section>
    </main>
  );
}
