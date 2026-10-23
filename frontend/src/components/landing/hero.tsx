"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check, Clock, MapPin, PackageCheck, Sparkles, Star } from "lucide-react";
import { Awning } from "@/components/landing/awning";
import { defaultPincode, stores } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;
const lead = stores[0];
const headline = "Your kirana, at your door in 15 minutes.";

const stickers = [
  { emoji: "🥛", bg: "bg-lilac", pos: "left-[-6%] top-[-8%]", size: "size-20 text-4xl", tilt: "-8deg", speed: -60 },
  { emoji: "🍅", bg: "bg-rani-soft", pos: "right-[-2%] top-[-6%]", size: "size-16 text-3xl", tilt: "10deg", speed: -120 },
  { emoji: "🥬", bg: "bg-mint", pos: "left-[2%] bottom-[-6%]", size: "size-16 text-3xl", tilt: "6deg", speed: -40 },
  { emoji: "🍞", bg: "bg-white", pos: "right-[-5%] bottom-[14%]", size: "size-20 text-4xl", tilt: "-6deg", speed: -90 },
];

function Sticker({
  s,
  i,
  progress,
}: {
  s: (typeof stickers)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [0, 1], [0, s.speed]);
  return (
    <motion.div className={`absolute z-10 ${s.pos}`} style={{ y }} aria-hidden>
      <motion.span
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.7 + i * 0.1 }}
        className="block"
      >
        <span
          className={`animate-float grid place-items-center rounded-full shadow-[0_14px_30px_-12px_rgba(11,59,60,0.45)] ring-4 ring-white/70 ${s.bg} ${s.size}`}
          style={{ "--tilt": s.tilt, animationDelay: `${i * -1.4}s` } as React.CSSProperties}
        >
          {s.emoji}
        </span>
      </motion.span>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="top" ref={ref} className="mx-auto max-w-7xl px-2 pt-3 sm:px-4 lg:pt-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-saffron text-ink sm:rounded-[2.5rem]">
        <Awning />

        <div
          className="pointer-events-none absolute -right-24 top-24 size-[28rem] rounded-full bg-rani/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-[-10rem] size-[26rem] rounded-full bg-white/30 blur-3xl"
          aria-hidden
        />

        <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 pb-14 pt-8 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-8 lg:px-14 lg:pb-20 lg:pt-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-sm font-semibold backdrop-blur"
            >
              <span className="relative flex size-2.5" aria-hidden>
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf/60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2.5 rounded-full bg-leaf" />
              </span>
              {stores.length} shops are open near Palakollu
            </motion.p>

            <h1 className="mt-6 max-w-[15ch] text-[2.05rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
              <span className="sr-only">{headline}</span>
              <span aria-hidden>
                {headline.split(" ").map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease }}
            >
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink/80">
                Order from the shops you already know. {lead.callName} packs it, a rider brings it, and we
                remember what you buy every week.
              </p>

              <form className="mt-8 flex max-w-xl flex-col gap-3 rounded-[1.75rem] bg-white/50 p-2 backdrop-blur sm:flex-row sm:rounded-full" action="#shops">
                <label htmlFor="pincode" className="sr-only">
                  Your pincode
                </label>
                <div className="flex h-14 items-center gap-3 rounded-full bg-white px-5 focus-within:ring-4 focus-within:ring-ink/20 sm:flex-1">
                  <MapPin className="size-5 shrink-0 text-rani" aria-hidden />
                  <input
                    id="pincode"
                    inputMode="numeric"
                    maxLength={6}
                    defaultValue={defaultPincode}
                    placeholder="Enter your pincode"
                    className="min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none placeholder:font-normal placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-7 text-base font-bold text-white outline-none transition hover:bg-ink-soft focus-visible:ring-4 focus-visible:ring-white/70"
                >
                  See shops near me
                  <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
              </form>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/80">
                {["Free delivery above ₹199", "Pay online or on delivery", "Shops you can call"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-ink text-saffron">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="relative mx-auto w-full max-w-md px-4 lg:ml-auto lg:mr-0">
            {stickers.map((s, i) => (
              <Sticker key={s.emoji} s={s} i={i} progress={scrollYProgress} />
            ))}
            <motion.div style={{ y: cardY }}>
              <motion.div
                initial={{ opacity: 0, y: 60, rotate: 8 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.5 }}
              >
                <ShopCard />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopCard() {
  const items: [string, string][] = [
    ["🥛", "Full cream milk × 2"],
    ["🍞", "Brown bread"],
    ["🍵", "Assam chai patti"],
  ];
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-30px_rgba(11,59,60,0.6)]">
      <Awning className="h-5" colors={["bg-ink", "bg-saffron-soft"]} />
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-saffron font-heading text-lg font-black">{lead.initials}</span>
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-bold sm:text-lg">{lead.name}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star className="size-3.5 fill-saffron text-saffron" aria-hidden />
              {lead.rating} · {lead.distance} · {lead.callName}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-mint-soft p-4">
          <div className="flex items-center justify-between gap-2 text-sm font-semibold">
            <span className="flex items-center gap-2">
              <PackageCheck className="size-4 text-leaf" aria-hidden />
              Packing your order
            </span>
            <span className="flex items-center gap-1 text-ink/70">
              <Clock className="size-3.5" aria-hidden />
              12 min
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white" role="presentation">
            <motion.div
              className="h-full rounded-full bg-leaf"
              initial={{ width: "0%" }}
              animate={{ width: "42%" }}
              transition={{ duration: 1.6, delay: 1.1, ease }}
            />
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map(([emoji, label], i) => (
              <motion.li
                key={label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.12 }}
              >
                <span aria-hidden>{emoji}</span>
                {label}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.p
          className="mt-4 flex items-start gap-2 rounded-2xl bg-lilac-soft p-3 text-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7, duration: 0.4 }}
        >
          <Sparkles className="mt-0.5 size-4 shrink-0 text-rani" aria-hidden />
          <span>
            <strong>Running low on eggs?</strong> You usually buy them on Sundays. Add 6 from {lead.short}{" "}
            Store.
          </span>
        </motion.p>
      </div>
    </div>
  );
}
