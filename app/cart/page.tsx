import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CartPageClient } from "@/components/cart/cart-page-client";

export default async function CartPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <CartPageClient />;
}
