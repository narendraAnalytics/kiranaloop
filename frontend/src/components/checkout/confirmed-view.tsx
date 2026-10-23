"use client";

import Link from "next/link";
import { Bike, Check, MapPin, PackageCheck, ReceiptText } from "lucide-react";
import { OrderLines } from "@/components/checkout/order-summary";
import { formatAddress } from "@/lib/address";
import { deliverySlots, formatPrice, paymentMethods } from "@/lib/mock-data";
import { useStoresReady } from "@/store/hydrate";
import { useOrders } from "@/store/orders";

const steps = [
  { icon: ReceiptText, label: "Order placed", done: true },
  { icon: PackageCheck, label: "Shop is packing", done: false },
  { icon: Bike, label: "Rider on the way", done: false },
  { icon: MapPin, label: "Delivered", done: false },
];

export function ConfirmedView() {
  const ready = useStoresReady();
  const order = useOrders((s) => s.last);

  if (!ready) {
    return <div className="h-96 animate-pulse rounded-3xl bg-muted" aria-label="Loading your order" />;
  }

  if (!order) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
        <h2 className="text-2xl font-bold">No recent order</h2>
        <p className="text-muted-foreground">When you place an order, you will see it here.</p>
        <Link
          href="/"
          className="mt-3 inline-flex h-12 items-center rounded-full bg-indigo px-7 font-bold text-white outline-none hover:bg-indigo/90 focus-visible:ring-4 focus-visible:ring-indigo/30"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  const slot = deliverySlots.find((s) => s.id === order.slot);
  const payment = paymentMethods.find((p) => p.id === order.payment);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-[2rem] bg-indigo p-6 text-white sm:p-10">
        <span className="grid size-14 place-items-center rounded-full bg-leaf">
          <Check className="size-7" aria-hidden />
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Order placed</h1>
        <p className="mt-2 max-w-[44ch] text-lg text-white/80">
          Your shops have the order. {slot?.id === "asap" ? "Expect it in 12 to 18 minutes." : `Arriving ${slot?.label.toLowerCase()}.`}
        </p>
        <p className="mt-4 text-sm text-white/70">Order number {order.id}</p>

        <ol className="mt-8 grid grid-cols-4 gap-2">
          {steps.map(({ icon: Icon, label, done }) => (
            <li key={label} className="flex flex-col items-center gap-2 text-center text-xs sm:text-sm">
              <span
                className={`grid size-11 place-items-center rounded-full ${done ? "bg-marigold text-indigo" : "bg-white/10 text-white/60"}`}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className={done ? "font-semibold" : "text-white/70"}>{label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr]">
        <section className="rounded-3xl border bg-white p-5">
          <h2 className="text-lg font-bold">Delivering to</h2>
          <p className="mt-2 font-semibold">
            {order.address.label} · {order.address.name}
          </p>
          <p className="text-sm text-muted-foreground">{formatAddress(order.address)}</p>
          <p className="mt-1 text-sm text-muted-foreground">{order.address.phone}</p>
          <h2 className="mt-5 text-lg font-bold">Payment</h2>
          <p className="mt-2 text-sm">{payment?.label}</p>
          <dl className="mt-4 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="tabular-nums">{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="tabular-nums">{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</dd>
            </div>
            <div className="flex justify-between text-base font-bold">
              <dt>{order.payment === "cod" ? "Pay on delivery" : "Total"}</dt>
              <dd className="tabular-nums">{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-3xl border bg-white p-5">
          <h2 className="mb-4 text-lg font-bold">What you ordered</h2>
          <OrderLines lines={order.lines} />
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex h-14 items-center rounded-full bg-marigold px-8 text-lg font-bold text-indigo outline-none hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-indigo/30"
        >
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
