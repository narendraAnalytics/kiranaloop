"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Stepper } from "@/components/landing/cart-sheet";
import { SectionHeading } from "@/components/landing/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import { aisleTheme, allTheme, type Theme } from "@/lib/aisle-theme";
import {
  formatPrice,
  getCategory,
  getProductDetails,
  getStore,
  popularIds,
  products,
  type Product,
} from "@/lib/mock-data";
import { useCart } from "@/store/cart";
import { useFly } from "@/store/fly";

function themeFor(product: Product): Theme {
  return aisleTheme(getProductDetails(product.id)?.category ?? "");
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const qty = useCart((s) => s.lines[product.id] ?? 0);
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const launch = useFly((s) => s.launch);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const save = product.mrp - product.price;
  const t = themeFor(product);
  const text = t.dark ? "text-white" : "text-ink";
  const glass = t.dark ? "bg-white/15" : "bg-white/50";

  function addOne() {
    add(product.id);
    if (emojiRef.current) launch(product.emoji, emojiRef.current.getBoundingClientRect());
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 48, rotate: index % 2 ? 4 : -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 160, damping: 18, delay: (index % 4) * 0.07 }}
    >
      <TiltCard
        max={8}
        className={`flex h-full flex-col rounded-[1.9rem] p-3 shadow-[0_26px_50px_-34px_rgba(11,59,60,0.8)] ${text}`}
        style={{ backgroundImage: `linear-gradient(160deg, ${t.from}, ${t.to})` }}
      >
        <div className="relative flex items-start justify-between gap-2 px-1 pt-1">
          {save > 0 ? (
            <span className="relative inline-flex -rotate-6 items-center rounded-md bg-white py-1 pl-4 pr-2.5 text-xs font-black text-rani shadow-md">
              <span className="absolute left-1.5 size-1.5 rounded-full bg-rani/30" aria-hidden />
              {formatPrice(save)} off
            </span>
          ) : (
            <span />
          )}
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur ${glass}`}>
            {getStore(product.storeId)?.short}
          </span>
        </div>

        <Link
          href={`/product/${product.id}`}
          tabIndex={-1}
          aria-hidden
          className="relative mx-auto my-3 grid aspect-square w-[78%] place-items-center rounded-full bg-white/35 shadow-[inset_0_2px_12px_rgba(255,255,255,0.7)] sm:my-4"
        >
          <span
            ref={emojiRef}
            className="text-6xl transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-125 group-hover:-rotate-6 sm:text-7xl"
          >
            {product.emoji}
          </span>
        </Link>

        <div className={`mt-auto rounded-[1.4rem] p-3 backdrop-blur-md ${glass}`}>
          <h3 className="font-heading text-sm font-bold leading-snug sm:text-base">
            <Link
              href={`/product/${product.id}`}
              className="rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-current"
            >
              {product.name}
            </Link>
          </h3>
          <p className="text-xs opacity-75 sm:text-sm">{product.size}</p>

          <div className="mt-2.5 flex min-h-10 items-center justify-between gap-2">
            <p className="leading-tight">
              <span className="font-heading text-lg font-bold">{formatPrice(product.price)}</span>
              {save > 0 && <span className="ml-1 text-xs line-through opacity-60">{formatPrice(product.mrp)}</span>}
            </p>

            <AnimatePresence mode="popLayout" initial={false}>
              {qty === 0 ? (
                <motion.button
                  key="add"
                  type="button"
                  onClick={addOne}
                  aria-label={`Add ${product.name} to basket`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.85 }}
                  className={`grid size-10 shrink-0 place-items-center rounded-full shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${
                    t.dark ? "bg-white text-ink" : "bg-ink text-white"
                  }`}
                >
                  <Plus className="size-5" aria-hidden />
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
      </TiltCard>
    </motion.li>
  );
}

const popular = popularIds.flatMap((id) => products.find((p) => p.id === id) ?? []);
const aisleSlugs = [...new Set(popular.map((p) => getProductDetails(p.id)?.category).filter(Boolean))] as string[];
const filters = [
  { slug: "all", name: "All", emoji: "🧺", count: popular.length, theme: allTheme },
  ...aisleSlugs.map((slug) => ({
    slug,
    name: getCategory(slug)?.name ?? slug,
    emoji: getCategory(slug)?.emoji ?? "🛒",
    count: popular.filter((p) => getProductDetails(p.id)?.category === slug).length,
    theme: aisleTheme(slug),
  })),
];

function AisleFilter({ active, onChange }: { active: string; onChange: (slug: string) => void }) {
  return (
    <div
      role="group"
      aria-label="Filter by aisle"
      className="-mx-4 mt-7 overflow-x-auto px-4 pb-2 [mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%-16px),transparent)] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:[mask-image:none]"
    >
      <div className="inline-flex gap-1 rounded-[1.6rem] bg-white/70 p-1.5 shadow-[0_18px_40px_-28px_rgba(11,59,60,0.55)] ring-1 ring-ink/5 backdrop-blur sm:flex-wrap">
        {filters.map((f) => {
          const on = f.slug === active;
          const t = f.theme;
          return (
            <motion.button
              key={f.slug}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(f.slug)}
              whileTap={{ scale: 0.95 }}
              layout
              className={`group/chip relative flex h-12 shrink-0 items-center gap-1.5 rounded-[1.2rem] pl-1.5 pr-2.5 outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                on ? (t.dark ? "text-white" : "text-ink") : "text-ink"
              }`}
            >
              {/* Resting tint, revealed on hover. */}
              {!on && (
                <span
                  className="absolute inset-0 rounded-[1.2rem] opacity-0 transition-opacity duration-200 group-hover/chip:opacity-100"
                  style={{ backgroundColor: t.soft }}
                  aria-hidden
                />
              )}
              {on && (
                <motion.span
                  layoutId="aisle-chip"
                  className="absolute inset-0 rounded-[1.2rem]"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${t.from}, ${t.to})`,
                    boxShadow: `0 10px 24px -10px ${t.to}`,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  aria-hidden
                />
              )}

              <span
                className="relative grid size-8 place-items-center rounded-[0.8rem] text-base"
                style={{ backgroundColor: on ? "rgba(255,255,255,0.4)" : t.soft }}
                aria-hidden
              >
                <motion.span
                  key={on ? `on-${f.slug}` : f.slug}
                  initial={on ? { y: 0, rotate: 0 } : false}
                  animate={on ? { y: [0, -7, 0], rotate: [0, -12, 0] } : undefined}
                  transition={{ duration: 0.45 }}
                  className="inline-block transition-transform group-hover/chip:scale-110"
                >
                  {f.emoji}
                </motion.span>
              </span>
              <span className="relative font-heading text-[12.5px] font-semibold tracking-tight">{f.name}</span>
              <AnimatePresence initial={false} mode="popLayout">
                {on ? (
                  <motion.span
                    key="count"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 24 }}
                    className={`relative grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold tabular-nums ${
                      t.dark ? "bg-white/25 text-white" : "bg-ink text-white"
                    }`}
                  >
                    <span className="sr-only">, </span>
                    {f.count}
                    <span className="sr-only"> items</span>
                  </motion.span>
                ) : (
                  <span key="sr" className="sr-only">
                    , {f.count} items
                  </span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function ProductGrid() {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? popular : popular.filter((p) => getProductDetails(p.id)?.category === active);

  return (
    <section id="fresh" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <SectionHeading
        title="Popular in your neighbourhood"
        subtitle="What people on your street added to their basket this week. Tap + and watch it hop into your basket."
      />

      <AisleFilter active={active} onChange={setActive} />

      <motion.ul layout className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
