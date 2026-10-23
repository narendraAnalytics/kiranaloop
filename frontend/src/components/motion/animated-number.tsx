"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";

/** A number that springs to its new value, formatted by `format`. */
export function AnimatedNumber({
  value,
  format = (n) => String(Math.round(n)),
  className,
}: {
  value: number;
  format?: (n: number) => string;
  className?: string;
}) {
  const spring = useSpring(value, { stiffness: 140, damping: 20 });
  const text = useTransform(spring, (n) => format(n));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span className={className}>{text}</motion.span>;
}
