"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpDown, Clock } from "lucide-react";
import { Stepper } from "@/components/landing/cart-sheet";
import { aisleTheme, type Theme } from "@/lib/aisle-theme";
import {
  formatPrice,
  getAisleProducts,
  getProductDetails,
  getStore,
  subcategories,
  type Product,
} from "@/lib/mock-data";
import { useCart } from "@/store/cart";
import { useFly } from "@/store/fly";

const sorts = [
  { id: "relevance", label: "Relevance" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "discount", label: "Biggest discount" },
] as const;
type SortId = (typeof sorts)[number]["id"];

function sortProducts(list: Product[], sort: SortId): Product[] {
  const out = [...list];
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  if (sort === "discount") out.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp);
  return out;
}

/** Cloudinary originals are 2 to 3 MB, so ask for a small resize. */
function thumb(url: string, w: number) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
}

type Shelf = { slug: string; name: string; emoji: string; image?: string; items: Product[] };

export function AisleView({ slug, emoji, image }: { slug: string; emoji: string; image?: string }) {
  const theme = aisleTheme(slug);
  const all = getAisleProducts(slug);
  const shelves: Shelf[] = [
    { slug: "all", name: "All", emoji, image, items: all },
    ...(subcategories[slug] ?? [])
      .map((s) => ({ ...s, items: all.filter((p) => getProductDetails(p.id)?.subcategory === s.slug) }))
      .filter((s) => s.items.length > 0),
  ];

  const [active, setActive] = useState("all");
  const [sort, setSort] = useState<SortId>("relevance");
  const gridTop = useRef<HTMLDivElement>(null);
  const [brand, setBrand] = useState("all");
  const shelf = shelves.find((s) => s.slug === active) ?? shelves[0];
  const brands = [...new Set(shelf.items.flatMap((p) => p.brand ?? []))];
  const activeBrand = brands.includes(brand) ? brand : "all";
  const visible = sortProducts(
    activeBrand === "all" ? shelf.items : shelf.items.filter((p) => p.brand === activeBrand),
    sort,
  );

  function pick(next: string) {
    setActive(next);
    setBrand("all");
    // Bring the new shelf's first row into view if the shopper had scrolled down the old one.
    const top = gridTop.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mt-5 grid grid-cols-[5.25rem_minmax(0,1fr)] gap-2.5 sm:gap-4 md:grid-cols-[13.5rem_minmax(0,1fr)] md:gap-6">
      <nav
        aria-label="Shelves in this aisle"
        className="sticky top-[12rem] max-h-[calc(100dvh-13rem)] self-start overflow-y-auto rounded-[1.6rem] bg-white/60 p-1.5 shadow-[0_18px_40px_-28px_rgba(11,59,60,0.55)] ring-1 ring-ink/5 backdrop-blur [scrollbar-width:none] md:p-2 sm:top-[9rem] sm:max-h-[calc(100dvh-10rem)] lg:top-24 lg:max-h-[calc(100dvh-7rem)]"
      >
        <ul className="flex flex-col gap-1">
          {shelves.map((s) => (
            <li key={s.slug}>
              <ShelfButton shelf={s} on={s.slug === active} theme={theme} onPick={() => pick(s.slug)} />
            </li>
          ))}
        </ul>
      </nav>

      <div ref={gridTop} className="min-w-0 scroll-mt-[12.5rem] sm:scroll-mt-[9.5rem] lg:scroll-mt-28">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[1.4rem] bg-white/60 px-4 py-2.5 ring-1 ring-ink/5 backdrop-blur">
          <h2 className="font-heading text-sm font-bold sm:text-base" aria-live="polite">
            {shelf.slug === "all" ? "Everything here" : shelf.name}
            <span className="ml-2 font-sans text-sm font-semibold text-ink/55">{shelf.items.length} items</span>
          </h2>
          <label className="relative flex items-center gap-1.5 text-sm font-semibold text-ink">
            <ArrowUpDown className="size-4 text-ink/60" aria-hidden />
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="h-11 cursor-pointer rounded-full bg-transparent pr-1 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {brands.length > 1 && (
          <div role="group" aria-label="Filter by brand" className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {["all", ...brands].map((b) => {
              const on = b === activeBrand;
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setBrand(b)}
                  className={`h-11 shrink-0 rounded-full px-4 text-sm font-bold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-ink ${
                    on ? "bg-ink text-white ring-ink" : "bg-white/70 text-ink ring-ink/10 hover:bg-white"
                  }`}
                >
                  {b === "all" ? "All brands" : b}
                </button>
              );
            })}
          </div>
        )}

        <motion.ul layout className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <AisleCard key={p.id} product={p} index={i} theme={theme} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}

function ShelfButton({ shelf, on, theme, onPick }: { shelf: Shelf; on: boolean; theme: Theme; onPick: () => void }) {
  const lit = on && theme.dark ? "text-white" : "text-ink";
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onPick}
      className={`group/shelf relative flex w-full flex-col items-center gap-1 rounded-[1.2rem] px-1 py-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-ink md:flex-row md:gap-3 md:px-2 md:text-left ${lit}`}
    >
      {on ? (
        <motion.span
          layoutId="shelf-pill"
          className="absolute inset-0 rounded-[1.2rem]"
          style={{ backgroundImage: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, boxShadow: `0 10px 24px -12px ${theme.to}` }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          aria-hidden
        />
      ) : (
        <span
          className="absolute inset-0 rounded-[1.2rem] opacity-0 transition-opacity group-hover/shelf:opacity-100"
          style={{ backgroundColor: theme.soft }}
          aria-hidden
        />
      )}
      <span
        className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-[0.95rem] text-2xl transition-transform duration-300 group-hover/shelf:scale-105 md:size-11"
        style={{ backgroundColor: on ? "rgba(255,255,255,0.55)" : theme.soft }}
        aria-hidden
      >
        {shelf.image ? (
          <Image src={thumb(shelf.image, 160)} alt="" fill sizes="48px" className="object-contain p-1" />
        ) : (
          shelf.emoji
        )}
      </span>
      <span className="relative min-w-0 flex-1 text-[11px] font-semibold leading-tight md:text-sm">{shelf.name}</span>
      <span
        className={`relative hidden h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold tabular-nums md:grid ${
          on ? (theme.dark ? "bg-white/25" : "bg-ink text-white") : "bg-ink/5 text-ink/60"
        }`}
      >
        {shelf.items.length}
        <span className="sr-only"> items</span>
      </span>
    </button>
  );
}

function AisleCard({ product, index, theme }: { product: Product; index: number; theme: Theme }) {
  const qty = useCart((s) => s.lines[product.id] ?? 0);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const launch = useFly((s) => s.launch);
  const art = useRef<HTMLSpanElement>(null);
  const store = getStore(product.storeId);
  const save = product.mrp - product.price;
  const off = Math.round((save / product.mrp) * 100);

  function addOne() {
    add(product.id);
    if (art.current) launch(product.emoji, art.current.getBoundingClientRect());
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: Math.min(index, 8) * 0.035 }}
    >
      <article
        className="group relative flex h-full flex-col rounded-[1.5rem] p-1.5 text-ink ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_40px_-26px_rgba(11,59,60,0.7)] sm:p-2"
        style={{ backgroundImage: `linear-gradient(180deg, ${theme.soft}, color-mix(in oklab, ${theme.soft} 55%, white))` }}
      >
        <Link
          href={`/product/${product.id}`}
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-square overflow-hidden rounded-[1.15rem] bg-white/75"
        >
          <span
            className="absolute inset-[18%] rounded-full opacity-90 blur-2xl transition-transform duration-500 group-hover:scale-125"
            style={{ backgroundColor: product.tint }}
          />
          <span ref={art} className="absolute inset-0 grid place-items-center">
            {product.image ? (
              <span className="relative block size-[82%] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110">
                <Image
                  src={thumb(product.image, 400)}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 220px, (min-width: 1024px) 240px, 45vw"
                  className="object-contain drop-shadow-[0_12px_14px_rgba(11,59,60,0.22)]"
                />
              </span>
            ) : (
              <span className="text-5xl drop-shadow-[0_10px_10px_rgba(11,59,60,0.18)] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110 sm:text-6xl">
                {product.emoji}
              </span>
            )}
          </span>
          {off > 0 && (
            <span className="absolute left-0 top-2.5 rounded-r-full bg-rani py-1 pl-2 pr-2.5 text-[10px] font-black uppercase leading-none tracking-wide text-white shadow-md sm:text-[11px]">
              {off}% off
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col px-1 pb-0.5 pt-2.5 sm:px-1.5">
          <p className="inline-flex max-w-full items-center gap-1 self-start rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold text-ink/80 sm:text-[11px]">
            <Clock className="size-3 shrink-0 text-leaf" aria-hidden />
            <span className="truncate">
              {store?.eta}
              <span className="font-semibold text-ink/55"> · {store?.short}</span>
            </span>
          </p>
          {product.brand && (
            <p className="mt-1.5 truncate text-[10px] font-black uppercase tracking-wider text-rani sm:text-[11px]">
              {product.brand}
            </p>
          )}
          <h3 className={`${product.brand ? "mt-0.5" : "mt-1.5"} line-clamp-2 min-h-[2.5em] font-sans text-[13px] font-bold leading-tight sm:text-sm`}>
            <Link
              href={`/product/${product.id}`}
              className="rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ink"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-ink/60">{product.size}</p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-1.5 pt-2.5">
            <p className="leading-none">
              <span className="block font-heading text-sm font-bold sm:text-base">{formatPrice(product.price)}</span>
              {save > 0 && <span className="mt-1 block text-[11px] text-ink/50 line-through">{formatPrice(product.mrp)}</span>}
            </p>

            <AnimatePresence mode="popLayout" initial={false}>
              {qty === 0 ? (
                <motion.button
                  key="add"
                  type="button"
                  onClick={addOne}
                  aria-label={`Add ${product.name} to basket`}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  whileTap={{ scale: 0.9 }}
                  className="h-10 shrink-0 rounded-full border-2 border-ink bg-white/80 px-3.5 text-xs font-black tracking-wide text-ink outline-none transition-colors hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 sm:px-5 sm:text-sm"
                >
                  ADD
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                >
                  <Stepper qty={qty} label={product.name} onAdd={addOne} onRemove={() => remove(product.id)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </article>
    </motion.li>
  );
}
