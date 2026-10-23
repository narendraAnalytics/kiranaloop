import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "@/lib/address";
import type { PaymentId, SlotId } from "@/lib/mock-data";

export type Order = {
  id: string;
  placedAt: number;
  lines: { productId: string; qty: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  address: Address;
  slot: SlotId;
  payment: PaymentId;
};

type OrdersState = {
  last: Order | null;
  place: (order: Order) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      last: null,
      place: (order) => set({ last: order }),
    }),
    { name: "kiranaloop-orders", skipHydration: true },
  ),
);

export function newOrderId(): string {
  return `KL-${Math.floor(100000 + Math.random() * 900000)}`;
}
