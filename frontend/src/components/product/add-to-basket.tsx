"use client";

import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/lib/mock-data";
import { useCart } from "@/store/cart";

export function AddToBasket({ product, compact = false }: { product: Product; compact?: boolean }) {
  const qty = useCart((s) => s.lines[product.id] ?? 0);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const setOpen = useCart((s) => s.setOpen);

  if (qty === 0) {
    return (
      <button
        type="button"
        onClick={() => {
          add(product.id);
          toast.success(`${product.name} added`, {
            action: { label: "View basket", onClick: () => setOpen(true) },
          });
        }}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-saffron px-8 text-lg font-bold text-ink outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-ink/30 active:translate-y-0 sm:w-auto sm:min-w-64"
      >
        <ShoppingBasket className="size-5" aria-hidden />
        Add to basket
      </button>
    );
  }

  return (
    <div className="flex w-full items-center gap-3 sm:w-auto">
      <div className="flex h-14 flex-1 items-center justify-between rounded-full bg-ink text-white sm:w-44 sm:flex-none">
        <button
          type="button"
          onClick={() => remove(product.id)}
          aria-label={`Remove one ${product.name}`}
          className="grid size-14 place-items-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-saffron"
        >
          <Minus className="size-5" aria-hidden />
        </button>
        <span className="text-lg font-bold tabular-nums" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => add(product.id)}
          aria-label={`Add one more ${product.name}`}
          className="grid size-14 place-items-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-saffron"
        >
          <Plus className="size-5" aria-hidden />
        </button>
      </div>
      {!compact && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="h-14 rounded-full border-2 border-ink px-6 font-bold text-ink outline-none hover:bg-ink hover:text-white focus-visible:ring-4 focus-visible:ring-ink/30"
        >
          View basket
        </button>
      )}
    </div>
  );
}

export function StickyAddBar({ product }: { product: Product }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <p className="shrink-0 leading-tight">
          <span className="block font-heading text-xl font-bold">{formatPrice(product.price)}</span>
          <span className="text-xs text-muted-foreground">{product.size}</span>
        </p>
        <div className="min-w-0 flex-1">
          <AddToBasket product={product} compact />
        </div>
      </div>
    </div>
  );
}
