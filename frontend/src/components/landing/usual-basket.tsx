"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal } from "@/components/motion/reveal";
import { TiltButton } from "@/components/motion/tilt-card";
import { formatPrice, getProduct, usualBasket } from "@/lib/mock-data";
import { useCart } from "@/store/cart";

const items = usualBasket.flatMap(({ productId, qty }) => {
  const product = getProduct(productId);
  return product ? [{ product, qty }] : [];
});

// One bold colour per card. Light colours carry teal text, dark ones white.
const palette = [
  { bg: "bg-saffron", text: "text-ink", bubble: "bg-white/40" },
  { bg: "bg-rani", text: "text-white", bubble: "bg-white/20" },
  { bg: "bg-mint", text: "text-ink", bubble: "bg-white/40" },
  { bg: "bg-lilac", text: "text-ink", bubble: "bg-white/40" },
  { bg: "bg-ink", text: "text-white", bubble: "bg-white/15" },
  { bg: "bg-leaf", text: "text-white", bubble: "bg-white/20" },
];

export function UsualBasket() {
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [hop, setHop] = useState(0);

  const chosen = items.filter((i) => !skipped.has(i.product.id));
  const count = chosen.reduce((sum, i) => sum + i.qty, 0);
  const total = chosen.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  function toggle(id: string) {
    setSkipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addChosen() {
    if (count === 0) return;
    chosen.forEach(({ product, qty }) => add(product.id, qty));
    setHop((h) => h + 1);
    toast.success(`Added ${count} items to your basket`, {
      action: { label: "View basket", onClick: () => setOpen(true) },
    });
  }

  return (
    <section id="reorder" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-lilac-soft p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <span className="animate-blob absolute -left-16 -top-20 size-80 rounded-full bg-lilac blur-3xl" />
          <span className="animate-blob absolute -right-10 top-10 size-96 rounded-full bg-rani/45 blur-3xl [animation-delay:-5s]" />
          <span className="animate-blob absolute -bottom-24 left-1/3 size-80 rounded-full bg-saffron/60 blur-3xl [animation-delay:-10s]" />
          <span className="absolute inset-0 bg-white/25 backdrop-blur-[2px]" />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-center lg:gap-14">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-white">
              <Sparkles className="size-4 text-saffron" aria-hidden />
              Built from your last 4 orders
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">Your usual Sunday basket</h2>
            <p className="mt-4 max-w-[42ch] text-lg text-ink/75">
              Same things, one tap. Tap a card to skip it this week. We only suggest what your nearby
              shops have in stock.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
              <motion.button
                type="button"
                onClick={addChosen}
                disabled={count === 0}
                whileHover={count ? { y: -3 } : undefined}
                whileTap={count ? { scale: 0.97 } : undefined}
                className="inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-7 text-base font-bold text-white shadow-[0_16px_30px_-14px_rgba(11,59,60,0.8)] outline-none hover:bg-ink-soft focus-visible:ring-4 focus-visible:ring-ink/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw className="size-5" aria-hidden />
                {count === 0 ? (
                  "Pick at least one item"
                ) : (
                  <span className="tabular-nums">
                    Add {count} {count === 1 ? "item" : "items"} ·{" "}
                    <AnimatedNumber value={total} format={(n) => formatPrice(Math.round(n))} />
                  </span>
                )}
              </motion.button>
              {skipped.size > 0 && (
                <button
                  type="button"
                  onClick={() => setSkipped(new Set())}
                  className="rounded-full text-sm font-semibold text-ink underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ink"
                >
                  Bring back all {items.length}
                </button>
              )}
            </div>
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:grid-rows-3 sm:gap-4" aria-label="Items in your usual basket">
            {items.map(({ product, qty }, i) => {
              const tone = palette[i % palette.length];
              const on = !skipped.has(product.id);
              const big = i === 0;
              return (
                <motion.li
                  key={product.id}
                  className={
                    big
                      ? "col-span-2 sm:row-span-2"
                      : i === items.length - 1
                        ? "col-span-2 sm:col-span-1"
                        : ""
                  }
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18, delay: i * 0.07 }}
                >
                  <motion.div
                    key={hop}
                    className="h-full"
                    animate={hop ? { y: [0, -16, 0] } : undefined}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                  >
                    <TiltButton
                      type="button"
                      aria-pressed={on}
                      aria-label={`${on ? "Skip" : "Include"} ${product.name}, ${qty > 1 ? `${qty} × ` : ""}${product.size}`}
                      onClick={() => toggle(product.id)}
                      max={big ? 6 : 10}
                      animate={{ opacity: on ? 1 : 0.5, scale: on ? 1 : 0.95, filter: on ? "saturate(1)" : "saturate(0.25)" }}
                      transition={{ duration: 0.25 }}
                      className={`relative flex h-full w-full flex-col rounded-[1.75rem] p-4 text-left outline-none focus-visible:ring-4 focus-visible:ring-ink/40 sm:p-5 ${tone.bg} ${tone.text} ${big ? "min-h-64 sm:min-h-0" : "min-h-56"}`}
                    >
                      <span className={`flex items-start gap-2 ${product.image ? "justify-end" : "justify-between"}`}>
                        {product.image ? (
                          <span
                            className={`pointer-events-none absolute inset-x-3 top-3 grid place-items-center ${big ? "bottom-24 sm:inset-x-8 sm:bottom-28" : "bottom-[4.75rem] sm:bottom-24"}`}
                            aria-hidden
                          >
                            <span className="absolute aspect-square h-4/5 rounded-full bg-white/50 blur-xl" />
                            <span className="animate-float relative block size-full" style={{ animationDelay: `${i * -0.9}s` }}>
                              <Image
                                src={product.image.replace("/upload/", "/upload/f_auto,q_auto,w_700/")}
                                alt=""
                                fill
                                sizes="(min-width: 640px) 320px, 90vw"
                                className="object-contain drop-shadow-[0_18px_20px_rgba(11,59,60,0.25)]"
                              />
                            </span>
                          </span>
                        ) : (
                          <span
                            className={`grid place-items-center rounded-full ${tone.bubble} ${big ? "size-20 text-5xl sm:size-28 sm:text-7xl" : "size-14 text-3xl"}`}
                            aria-hidden
                          >
                            <span className="animate-float inline-block" style={{ animationDelay: `${i * -0.9}s` }}>
                              {product.emoji}
                            </span>
                          </span>
                        )}
                        <span
                          className={`grid size-7 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                            on ? "border-transparent bg-white text-ink" : "border-current"
                          }`}
                          aria-hidden
                        >
                          <AnimatePresence>
                            {on && (
                              <motion.span
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                              >
                                <Check className="size-4" strokeWidth={3} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </span>
                      </span>

                      <span className="mt-auto block pt-5">
                        {big && <span className="mb-1 block text-sm font-semibold opacity-75">You buy this every week</span>}
                        <span className={`block font-heading font-bold leading-tight ${big ? "text-2xl sm:text-3xl" : "text-sm sm:text-base"}`}>
                          {product.name}
                        </span>
                        <span className="mt-1 flex items-center justify-between gap-2 text-sm">
                          <span className="opacity-80">
                            {qty > 1 ? `${qty} × ` : ""}
                            {product.size}
                          </span>
                          <span className="font-bold tabular-nums">{formatPrice(product.price * qty)}</span>
                        </span>
                      </span>
                    </TiltButton>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
