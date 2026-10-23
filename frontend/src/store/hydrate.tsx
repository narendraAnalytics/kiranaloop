"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { useAddresses } from "@/store/address";
import { useCart } from "@/store/cart";
import { useOrders } from "@/store/orders";

const useReadyFlag = create<{ ready: boolean }>(() => ({ ready: false }));

/** True once saved basket, addresses and orders have been read from the browser. */
export function useStoresReady(): boolean {
  return useReadyFlag((s) => s.ready);
}

export function StoreHydrator() {
  useEffect(() => {
    Promise.all([
      useCart.persist.rehydrate(),
      useAddresses.persist.rehydrate(),
      useOrders.persist.rehydrate(),
    ]).finally(() => useReadyFlag.setState({ ready: true }));
  }, []);

  return null;
}
