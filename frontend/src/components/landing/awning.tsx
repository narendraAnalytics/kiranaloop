"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The striped, scalloped shop awning. Each stripe drops in from the top,
 * on page load (`trigger="load"`) or when scrolled into view (`trigger="view"`).
 */
export function Awning({
  className = "h-9",
  colors = ["bg-rani", "bg-white"],
  stripes = 24,
  trigger = "load",
  delay = 0,
}: {
  className?: string;
  colors?: [string, string];
  stripes?: number;
  trigger?: "load" | "view";
  delay?: number;
}) {
  const show = { scaleY: 1 };
  return (
    <motion.div
      className={`flex w-full overflow-hidden ${className}`}
      aria-hidden
      initial="hidden"
      {...(trigger === "load" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } })}
    >
      {Array.from({ length: stripes }).map((_, i) => (
        <motion.span
          key={i}
          className={`h-full min-w-0 flex-1 origin-top rounded-b-full ${colors[i % 2]}`}
          variants={{
            hidden: { scaleY: 0 },
            show: { ...show, transition: { duration: 0.5, delay: delay + 0.02 * i, ease } },
          }}
        />
      ))}
    </motion.div>
  );
}
