"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatPrice, getProduct, getStore } from "@/lib/mock-data";
import { selectCount, selectTotal, useCart } from "@/store/cart";

export function CartSheet() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const count = useCart(selectCount);
  const total = useCart(selectTotal);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);

  const entries = Object.entries(lines)
    .map(([id, qty]) => ({ product: getProduct(id), qty }))
    .filter((e) => e.product);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full data-[side=right]:w-full data-[side=right]:sm:max-w-md">
        <SheetHeader className="border-b p-5 pr-14">
          <SheetTitle className="text-xl font-semibold">Your basket</SheetTitle>
          <SheetDescription>
            {count === 0
              ? "Nothing here yet."
              : `${count} ${count === 1 ? "item" : "items"} from shops near you`}
          </SheetDescription>
        </SheetHeader>

        {entries.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-saffron-soft text-ink">
              <ShoppingBasket className="size-7" aria-hidden />
            </span>
            <p className="font-heading text-lg font-semibold">Your basket is empty</p>
            <p className="text-muted-foreground">
              Add milk, atta or your usual basket and it will show up here.
            </p>
            <Button
              className="mt-2 h-11 rounded-full bg-ink px-6 text-base text-white hover:bg-ink/90"
              onClick={() => setOpen(false)}
            >
              Start shopping
            </Button>
          </div>
        ) : (
          <ul className="flex-1 divide-y overflow-y-auto px-5">
            {entries.map(({ product, qty }) => {
              if (!product) return null;
              return (
                <li key={product.id} className="flex items-center gap-3 py-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl"
                    style={{ backgroundColor: product.tint }}
                    aria-hidden
                  >
                    {product.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.size} · {getStore(product.storeId)?.name}
                    </p>
                    <p className="mt-0.5 font-semibold">{formatPrice(product.price * qty)}</p>
                  </div>
                  <Stepper
                    qty={qty}
                    label={product.name}
                    onAdd={() => add(product.id)}
                    onRemove={() => remove(product.id)}
                  />
                </li>
              );
            })}
          </ul>
        )}

        {entries.length > 0 && (
          <SheetFooter className="border-t p-5">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-heading text-2xl font-bold">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-saffron text-base font-bold text-ink outline-none hover:brightness-95 focus-visible:ring-4 focus-visible:ring-ink/30"
            >
              Go to checkout
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function Stepper({
  qty,
  label,
  onAdd,
  onRemove,
}: {
  qty: number;
  label: string;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex h-10 items-center rounded-full bg-ink text-white">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove one ${label}`}
        className="grid size-10 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-saffron"
      >
        <Minus className="size-4" aria-hidden />
      </button>
      <span className="min-w-5 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={onAdd}
        aria-label={`Add one more ${label}`}
        className="grid size-10 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-saffron"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
