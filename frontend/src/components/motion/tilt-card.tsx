"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";

/** Pointer-driven 3D tilt with spring physics and a following spotlight. Inert for reduced motion. */
function useTilt(max: number) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const mx = useTransform(px, (v) => `${v * 100}%`);
  const my = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mx} ${my}, rgba(255,255,255,0.4), transparent 60%)`;

  return {
    style: reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 },
    spotlight,
    onPointerMove(e: React.PointerEvent<HTMLElement>) {
      if (reduce || e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width);
      py.set((e.clientY - r.top) / r.height);
    },
    onPointerLeave() {
      px.set(0.5);
      py.set(0.5);
    },
  };
}

function Spotlight({ background }: { background: ReturnType<typeof useTilt>["spotlight"] }) {
  return (
    <motion.span
      className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ background }}
      aria-hidden
    />
  );
}

/** A button that tilts toward the pointer. */
export function TiltButton({
  children,
  className = "",
  max = 10,
  style,
  ...props
}: HTMLMotionProps<"button"> & { max?: number }) {
  const tilt = useTilt(max);
  return (
    <motion.button
      {...props}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={{ ...style, ...tilt.style }}
      className={`group relative overflow-hidden ${className}`}
    >
      <Spotlight background={tilt.spotlight} />
      {children as React.ReactNode}
    </motion.button>
  );
}

/** A card container that tilts toward the pointer. */
export function TiltCard({
  children,
  className = "",
  max = 8,
  style,
  ...props
}: HTMLMotionProps<"div"> & { max?: number }) {
  const tilt = useTilt(max);
  return (
    <motion.div
      {...props}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={{ ...style, ...tilt.style }}
      className={`group relative overflow-hidden ${className}`}
    >
      <Spotlight background={tilt.spotlight} />
      {children as React.ReactNode}
    </motion.div>
  );
}
