import { Truck } from "lucide-react";
import { FREE_DELIVERY_ABOVE, formatPrice, getProduct, getStore } from "@/lib/mock-data";
import type { Pricing } from "@/store/cart";

type Line = { productId: string; qty: number };

export function groupByStore(lines: Line[]) {
  const groups = new Map<string, { storeName: string; owner: string; items: { productId: string; qty: number }[] }>();
  for (const line of lines) {
    const product = getProduct(line.productId);
    const store = product && getStore(product.storeId);
    if (!product || !store) continue;
    const group = groups.get(store.id) ?? { storeName: store.name, owner: store.owner, items: [] };
    group.items.push(line);
    groups.set(store.id, group);
  }
  return [...groups.values()];
}

export function PriceBreakdown({ pricing }: { pricing: Pricing }) {
  return (
    <>
      {pricing.amountToFreeDelivery > 0 && (
        <p className="flex items-center gap-2 rounded-xl bg-saffron-soft px-3 py-2 text-sm">
          <Truck className="size-4 shrink-0 text-ink" aria-hidden />
          Add {formatPrice(pricing.amountToFreeDelivery)} more for free delivery.
        </p>
      )}
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Items</dt>
          <dd className="tabular-nums">{formatPrice(pricing.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Delivery</dt>
          <dd className="tabular-nums">
            {pricing.deliveryFee === 0 ? (
              <span className="font-semibold text-leaf">Free</span>
            ) : (
              formatPrice(pricing.deliveryFee)
            )}
          </dd>
        </div>
        {pricing.savings > 0 && (
          <div className="flex justify-between text-leaf">
            <dt>You save on MRP</dt>
            <dd className="font-semibold tabular-nums">{formatPrice(pricing.savings)}</dd>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t pt-3">
          <dt className="font-bold">To pay</dt>
          <dd className="font-heading text-2xl font-bold tabular-nums">{formatPrice(pricing.total)}</dd>
        </div>
      </dl>
      <p className="text-xs text-muted-foreground">
        Free delivery on orders of {formatPrice(FREE_DELIVERY_ABOVE)} or more.
      </p>
    </>
  );
}

export function OrderLines({ lines }: { lines: Line[] }) {
  const groups = groupByStore(lines);
  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <section key={g.storeName}>
          <h3 className="text-sm font-semibold text-muted-foreground">
            Packed by {g.storeName}
          </h3>
          <ul className="mt-2 space-y-3">
            {g.items.map(({ productId, qty }) => {
              const p = getProduct(productId);
              if (!p) return null;
              return (
                <li key={productId} className="flex items-center gap-3">
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-xl text-2xl"
                    style={{ backgroundColor: p.tint }}
                    aria-hidden
                  >
                    {p.emoji}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate font-semibold">{p.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {p.size} × {qty}
                    </span>
                  </span>
                  <span className="font-semibold tabular-nums">{formatPrice(p.price * qty)}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
