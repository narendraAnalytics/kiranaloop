import type { Metadata } from "next";
import { ConfirmedView } from "@/components/checkout/confirmed-view";

export const metadata: Metadata = {
  title: "Order placed — KiranaLoop",
  robots: { index: false },
};

export default function OrderConfirmedPage() {
  return (
    <main className="flex-1">
      <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <ConfirmedView />
      </div>
    </main>
  );
}
