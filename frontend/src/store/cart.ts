import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DELIVERY_FEE, FREE_DELIVERY_ABOVE, getProduct } from "@/lib/mock-data";

type CartState = {
  lines: Record<string, number>;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: {},
      open: false,
      setOpen: (open) => set({ open }),
      add: (productId, qty = 1) =>
        set((state) => ({
          lines: { ...state.lines, [productId]: (state.lines[productId] ?? 0) + qty },
        })),
      remove: (productId) =>
        set((state) => {
          const current = state.lines[productId] ?? 0;
          const { [productId]: _removed, ...rest } = state.lines;
          return { lines: current > 1 ? { ...rest, [productId]: current - 1 } : rest };
        }),
      clear: () => set({ lines: {} }),
    }),
    {
      name: "kiranaloop-cart",
      partialize: (state) => ({ lines: state.lines }),
      // Rehydrated on the client by StoreHydrator so server and first client render match.
      skipHydration: true,
    },
  ),
);

export function selectCount(state: CartState): number {
  return Object.values(state.lines).reduce((sum, qty) => sum + qty, 0);
}

export function selectTotal(state: CartState): number {
  return Object.entries(state.lines).reduce(
    (sum, [id, qty]) => sum + (getProduct(id)?.price ?? 0) * qty,
    0,
  );
}

export type Pricing = {
  subtotal: number;
  savings: number;
  deliveryFee: number;
  total: number;
  amountToFreeDelivery: number;
};

export function priceLines(lines: Record<string, number>): Pricing {
  let subtotal = 0;
  let savings = 0;
  for (const [id, qty] of Object.entries(lines)) {
    const product = getProduct(id);
    if (!product) continue;
    subtotal += product.price * qty;
    savings += (product.mrp - product.price) * qty;
  }
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  return {
    subtotal,
    savings,
    deliveryFee,
    total: subtotal + deliveryFee,
    amountToFreeDelivery: subtotal > 0 ? Math.max(0, FREE_DELIVERY_ABOVE - subtotal) : 0,
  };
}
