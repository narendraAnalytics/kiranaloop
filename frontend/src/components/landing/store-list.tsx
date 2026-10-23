"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Awning } from "@/components/landing/awning";
import { SectionHeading } from "@/components/landing/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import { stores } from "@/lib/mock-data";

// Each shop gets its own shopfront colours. Light fronts carry teal text, rani carries white.
const fronts = [
  {
    card: "bg-saffron text-ink",
    awning: ["bg-ink", "bg-saffron-soft"] as [string, string],
    mono: "bg-ink text-saffron",
    glass: "bg-white/35",
    button: "bg-ink text-white hover:bg-ink-soft",
  },
  {
    card: "bg-mint text-ink",
    awning: ["bg-leaf", "bg-white"] as [string, string],
    mono: "bg-leaf text-white",
    glass: "bg-white/40",
    button: "bg-ink text-white hover:bg-ink-soft",
  },
  {
    card: "bg-rani text-white",
    awning: ["bg-saffron", "bg-white"] as [string, string],
    mono: "bg-white text-rani",
    glass: "bg-white/15",
    button: "bg-white text-rani hover:bg-saffron-soft",
  },
];

const ease = [0.65, 0, 0.35, 1] as const;

/** The rolling shutter that lifts when the card scrolls into view. Decorative only. */
function Shutter({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-5"
      style={{
        backgroundImage:
          "repeating-linear-gradient(180deg, #0b3b3c 0 14px, #1d5a5b 14px 16px, #0e4546 16px 18px)",
      }}
      initial={{ y: "0%" }}
      whileInView={{ y: "-101%" }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 1, delay, ease }}
      aria-hidden
    >
      <span className="mb-3 rounded-full bg-saffron/15 px-3 py-1 font-heading text-xs font-bold text-saffron">
        Khul raha hai…
      </span>
      <span className="h-2 w-16 rounded-full bg-saffron" />
    </motion.div>
  );
}

function RouteStrip({ distance, eta, glass }: { distance: string; eta: string; glass: string }) {
  return (
    <div className="mt-5">
      <div className={`relative flex h-11 items-center justify-between rounded-full px-3 ${glass}`} aria-hidden>
        <span className="text-lg">🏠</span>
        <span className="absolute inset-x-10 top-1/2 border-t-2 border-dashed border-current opacity-35" />
        <span className="absolute inset-x-9 top-1/2 h-0">
          <span className="animate-ride absolute top-0 text-xl leading-none">🛵</span>
        </span>
        <span className="text-lg">🏪</span>
      </div>
      <p className="mt-2 text-sm font-semibold opacity-80">
        {distance} away · about {eta} by scooter
      </p>
    </div>
  );
}

export function StoreList() {
  return (
    <section id="shops" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <SectionHeading
        title="Shops open near you"
        subtitle="Real neighbours, real counters. Watch them open up, then pick the shop you trust."
      />

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {stores.map((s, i) => {
          const f = fronts[i % fronts.length];
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 140, damping: 18, delay: i * 0.12 }}
            >
              <TiltCard
                max={6}
                className={`flex h-full flex-col rounded-[2rem] shadow-[0_30px_60px_-36px_rgba(11,59,60,0.7)] ${f.card}`}
              >
                <div className="relative z-30">
                  <Awning trigger="view" className="h-7" stripes={14} colors={f.awning} delay={0.1 + i * 0.12} />
                </div>

                <div className="relative flex flex-1 flex-col p-5 pt-4 sm:p-6 sm:pt-5">
                  <Shutter delay={0.45 + i * 0.2} />

                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`grid size-14 shrink-0 -rotate-3 place-items-center rounded-2xl font-heading text-lg font-black shadow-lg transition-transform duration-300 group-hover:rotate-3 ${f.mono}`}
                      aria-hidden
                    >
                      {s.initials}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur ${f.glass}`}>
                      <span className="relative flex size-2" aria-hidden>
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60 motion-reduce:animate-none" />
                        <span className="relative inline-flex size-2 rounded-full bg-current" />
                      </span>
                      Open now
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-tight">{s.name}</h3>
                  <p className="mt-1 text-sm opacity-80">
                    {s.callName} · {s.area}
                  </p>

                  <p className={`mt-4 rounded-2xl px-4 py-3 text-base font-medium backdrop-blur ${f.glass}`}>
                    Known for: {s.known.toLowerCase()}
                  </p>

                  <dl className="mt-4 flex flex-wrap gap-2 text-sm">
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${f.glass}`}>
                      <dt className="sr-only">Rating</dt>
                      <Star className="size-3.5 fill-current" aria-hidden />
                      <dd className="font-bold">{s.rating}</dd>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${f.glass}`}>
                      <dt className="sr-only">Delivery time</dt>
                      <Clock className="size-3.5" aria-hidden />
                      <dd className="font-bold">{s.eta}</dd>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${f.glass}`}>
                      <dt className="sr-only">Orders</dt>
                      <dd className="font-bold">{s.orders}</dd>
                    </div>
                  </dl>

                  <RouteStrip distance={s.distance} eta={s.eta} glass={f.glass} />

                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <span className="flex items-center gap-1.5 text-sm font-semibold opacity-85">
                      <Clock className="size-4" aria-hidden />
                      {s.closes}
                    </span>
                    <Link
                      href="/#fresh"
                      className={`group/btn relative inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-sm font-bold outline-none transition focus-visible:ring-4 focus-visible:ring-white/50 ${f.button}`}
                    >
                      Shop here
                      <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
