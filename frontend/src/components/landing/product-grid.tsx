"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Stepper } from "@/components/landing/cart-sheet";
import { formatPrice, getStore, products, type Product } from "@/lib/mock-data";
import { useCart } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const qty = useCart((s) => s.lines[product.id] ?? 0);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const save = product.mrp - product.price;

  return (
    <li className="flex flex-col rounded-3xl border bg-white p-3 sm:p-4">
      <Link
        href={`/product/${product.id}`}
        tabIndex={-1}
        aria-hidden
        className="relative grid aspect-square place-items-center rounded-2xl text-6xl sm:text-7xl"
        style={{ backgroundColor: product.tint }}
      >
        <span>{product.emoji}</span>
        {save > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-leaf">
            Save {formatPrice(save)}
          </span>
        )}
      </Link>

      <div className="mt-3 flex-1">
        <h3 className="font-bold leading-snug">
          <Link
            href={`/product/${product.id}`}
            className="rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-indigo"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{product.size}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          from {getStore(product.storeId)?.name}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="leading-tight">
          <span className="font-heading text-lg font-bold">{formatPrice(product.price)}</span>
          {save > 0 && (
            <span className="ml-1.5 text-sm text-muted-foreground line-through">
              {formatPrice(product.mrp)}
            </span>
          )}
        </p>

        {qty === 0 ? (
          <button
            type="button"
            onClick={() => add(product.id)}
            aria-label={`Add ${product.name} to basket`}
            className="inline-flex h-10 items-center gap-1 rounded-full border-2 border-indigo px-4 text-sm font-bold text-indigo outline-none transition-colors hover:bg-indigo hover:text-white focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2"
          >
            <Plus className="size-4" aria-hidden />
            Add
          </button>
        ) : (
          <Stepper
            qty={qty}
            label={product.name}
            onAdd={() => add(product.id)}
            onRemove={() => remove(product.id)}
          />
        )}
      </div>
    </li>
  );
}

export function ProductGrid() {
  return (
    <section id="fresh" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Popular in your neighbourhood</h2>
      <p className="mt-1 text-muted-foreground">What people on your street added to their basket this week.</p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ul>
    </section>
  );
}
