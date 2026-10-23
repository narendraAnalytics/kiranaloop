import { create } from "zustand";

type Point = { x: number; y: number };

export type Flight = { id: number; emoji: string; from: Point; to: Point };

type FlyState = {
  flights: Flight[];
  /** Increments each time an item lands in the basket, so the basket icon can react. */
  landed: number;
  launch: (emoji: string, from: DOMRect) => void;
  land: (id: number) => void;
};

let nextId = 1;

/** The basket button the item should fly to: the first visible `[data-basket-target]`. */
function findTarget(): Point | null {
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-basket-target]"));
  for (const el of targets) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) {
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
  }
  return null;
}

export const useFly = create<FlyState>((set) => ({
  flights: [],
  landed: 0,
  launch: (emoji, from) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const to = findTarget();
    if (!to) return;
    const flight: Flight = {
      id: nextId++,
      emoji,
      from: { x: from.left + from.width / 2, y: from.top + from.height / 2 },
      to,
    };
    set((s) => ({ flights: [...s.flights, flight] }));
  },
  land: (id) => set((s) => ({ flights: s.flights.filter((f) => f.id !== id), landed: s.landed + 1 })),
}));
