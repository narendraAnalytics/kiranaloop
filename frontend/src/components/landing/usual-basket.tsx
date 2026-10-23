"use client";

import { RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, getProduct, usualBasket } from "@/lib/mock-data";
import { useCart } from "@/store/cart";

const items = usualBasket.flatMap(({ productId, qty }) => {
  const product = getProduct(productId);
  return product ? [{ product, qty }] : [];
});
const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

export function UsualBasket() {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);

  function addAll() {
    items.forEach(({ product, qty }) => add(product.id, qty));
    toast.success(`Added ${itemCount} items to your basket`, {
      action: { label: "View basket", onClick: () => setOpen(true) },
    });
  }

  return (
    <section id="reorder" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <div className="grid gap-6 rounded-[2rem] bg-marigold-soft p-5 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-12 lg:p-10">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-chilli">
            <Sparkles className="size-4" aria-hidden />
            Built from your last 4 orders
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Your usual Sunday basket</h2>
          <p className="mt-3 max-w-[44ch] text-lg text-foreground/75">
            Same things, one tap. Change anything before you add it, and we only suggest what your
            nearby shops have in stock.
          </p>
          <button
            type="button"
            onClick={addAll}
            className="mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-indigo px-7 text-lg font-bold text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-indigo/30 active:translate-y-0"
          >
            <RotateCcw className="size-5" aria-hidden />
            Add all {itemCount} · {formatPrice(total)}
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map(({ product, qty }) => (
            <li key={product.id} className="flex items-center gap-3 rounded-2xl bg-white p-3">
              <span
                className="grid size-12 shrink-0 place-items-center rounded-xl text-2xl"
                style={{ backgroundColor: product.tint }}
                aria-hidden
              >
                {product.emoji}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-sm font-semibold">{product.name}</span>
                <span className="text-xs text-muted-foreground">
                  {qty > 1 ? `${qty} × ` : ""}
                  {product.size}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
