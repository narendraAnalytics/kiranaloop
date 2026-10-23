"use client";

import { motion } from "motion/react";
import { useFly } from "@/store/fly";

/** Renders items flying from a product card into the basket. Purely decorative. */
export function FlyLayer() {
  const flights = useFly((s) => s.flights);
  const land = useFly((s) => s.land);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {flights.map((f) => {
        const dx = f.to.x - f.from.x;
        const dy = f.to.y - f.from.y;
        const peak = Math.min(0, dy) * 0.5 - 140;
        return (
          <motion.span
            key={f.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl drop-shadow-[0_10px_14px_rgba(11,59,60,0.35)]"
            style={{ left: f.from.x, top: f.from.y }}
            initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
            animate={{
              x: [0, dx * 0.45, dx],
              y: [0, peak, dy],
              scale: [1, 1.25, 0.3],
              rotate: [0, -20, 15],
            }}
            transition={{ duration: 0.8, times: [0, 0.45, 1], ease: "easeInOut" }}
            onAnimationComplete={() => land(f.id)}
          >
            {f.emoji}
          </motion.span>
        );
      })}
    </div>
  );
}
