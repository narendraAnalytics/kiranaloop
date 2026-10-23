import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout — KiranaLoop",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6 lg:px-8 lg:pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Keep shopping
        </Link>
        <h1 className="mb-6 mt-2 text-4xl font-extrabold tracking-tight">Checkout</h1>
        <CheckoutView />
      </div>
    </main>
  );
}
