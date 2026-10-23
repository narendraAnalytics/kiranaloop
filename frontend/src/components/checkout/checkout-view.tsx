"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { AddressPicker } from "@/components/checkout/address-picker";
import { OrderLines, PriceBreakdown } from "@/components/checkout/order-summary";
import {
  deliverySlots,
  formatPrice,
  getProduct,
  paymentMethods,
  type PaymentId,
  type SlotId,
} from "@/lib/mock-data";
import { selectCurrentAddress, useAddresses } from "@/store/address";
import { priceLines, useCart } from "@/store/cart";
import { useStoresReady } from "@/store/hydrate";
import { newOrderId, useOrders } from "@/store/orders";

function Section({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border bg-white/60 p-4 sm:p-6">
      <h2 className="flex items-center gap-3 text-xl font-bold">
        <span className="grid size-8 place-items-center rounded-full bg-indigo text-sm text-white">
          {step}
        </span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  label,
  detail,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  detail: string;
}) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 peer-checked:border-indigo peer-checked:ring-2 peer-checked:ring-indigo peer-focus-visible:ring-4 peer-focus-visible:ring-indigo/30">
        <span>
          <span className="block font-semibold">{label}</span>
          <span className="text-sm text-muted-foreground">{detail}</span>
        </span>
        <span
          className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${checked ? "border-indigo" : "border-muted-foreground/40"}`}
          aria-hidden
        >
          {checked && <span className="size-2.5 rounded-full bg-indigo" />}
        </span>
      </span>
    </label>
  );
}

export function CheckoutView() {
  const router = useRouter();
  const ready = useStoresReady();
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const address = useAddresses(selectCurrentAddress);
  const place = useOrders((s) => s.place);
  const [slot, setSlot] = useState<SlotId>("asap");
  const [payment, setPayment] = useState<PaymentId>("upi");
  const [placing, setPlacing] = useState(false);

  if (!ready) {
    return <div className="h-96 animate-pulse rounded-3xl bg-muted" aria-label="Loading checkout" />;
  }

  const entries = Object.entries(lines).map(([productId, qty]) => ({ productId, qty }));
  const pricing = priceLines(lines);

  if (entries.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-marigold-soft text-indigo">
          <ShoppingBasket className="size-7" aria-hidden />
        </span>
        <h2 className="text-2xl font-bold">Your basket is empty</h2>
        <p className="text-muted-foreground">Add a few things from your neighbourhood shops, then come back to check out.</p>
        <Link
          href="/"
          className="mt-3 inline-flex h-12 items-center rounded-full bg-indigo px-7 font-bold text-white outline-none hover:bg-indigo/90 focus-visible:ring-4 focus-visible:ring-indigo/30"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  const canPlace = Boolean(address) && !placing;

  function placeOrder() {
    if (!address) return;
    setPlacing(true);
    const order = {
      id: newOrderId(),
      placedAt: Date.now(),
      lines: entries.map((e) => ({ ...e, price: getProduct(e.productId)?.price ?? 0 })),
      subtotal: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      total: pricing.total,
      address,
      slot,
      payment,
    };
    place(order);
    clear();
    router.push("/order-confirmed");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start xl:grid-cols-[1fr_26rem]">
      <div className="space-y-5">
        <Section step={1} title="Delivery address">
          <AddressPicker />
        </Section>

        <Section step={2} title="Delivery time">
          <fieldset>
            <legend className="sr-only">Delivery time</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {deliverySlots.map((s) => (
                <RadioCard
                  key={s.id}
                  name="slot"
                  value={s.id}
                  checked={slot === s.id}
                  onChange={() => setSlot(s.id)}
                  label={s.label}
                  detail={s.detail}
                />
              ))}
            </div>
          </fieldset>
        </Section>

        <Section step={3} title="Payment">
          <fieldset>
            <legend className="sr-only">Payment method</legend>
            <div className="grid gap-3">
              {paymentMethods.map((m) => (
                <RadioCard
                  key={m.id}
                  name="payment"
                  value={m.id}
                  checked={payment === m.id}
                  onChange={() => setPayment(m.id)}
                  label={m.label}
                  detail={m.detail}
                />
              ))}
            </div>
          </fieldset>
          {payment !== "cod" && (
            <p className="mt-3 text-sm text-muted-foreground">
              Online payments are a preview in this build. No money is taken, and Razorpay test mode
              connects in the next phase.
            </p>
          )}
        </Section>
      </div>

      <aside className="rounded-3xl border bg-white p-5 sm:p-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-bold">Order summary</h2>
        <div className="mt-4">
          <OrderLines lines={entries} />
        </div>
        <div className="mt-5 space-y-4 border-t pt-5">
          <PriceBreakdown pricing={pricing} />
        </div>
        <button
          type="button"
          disabled={!canPlace}
          onClick={placeOrder}
          className="mt-5 h-14 w-full rounded-full bg-marigold text-lg font-bold text-indigo outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-indigo/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {address ? `Place order · ${formatPrice(pricing.total)}` : "Add an address to continue"}
        </button>
      </aside>
    </div>
  );
}
