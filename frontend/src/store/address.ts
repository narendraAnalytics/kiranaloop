import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address, AddressInput } from "@/lib/address";

type AddressState = {
  addresses: Address[];
  selectedId: string | null;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  add: (input: AddressInput) => Address;
  select: (id: string) => void;
  remove: (id: string) => void;
};

export const useAddresses = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedId: null,
      dialogOpen: false,
      setDialogOpen: (dialogOpen) => set({ dialogOpen }),
      add: (input) => {
        const address: Address = { ...input, id: crypto.randomUUID() };
        set({ addresses: [...get().addresses, address], selectedId: address.id });
        return address;
      },
      select: (id) => set({ selectedId: id }),
      remove: (id) =>
        set((state) => {
          const addresses = state.addresses.filter((a) => a.id !== id);
          const selectedId =
            state.selectedId === id ? (addresses[0]?.id ?? null) : state.selectedId;
          return { addresses, selectedId };
        }),
    }),
    {
      name: "kiranaloop-addresses",
      partialize: (state) => ({ addresses: state.addresses, selectedId: state.selectedId }),
      skipHydration: true,
    },
  ),
);

export function selectCurrentAddress(state: AddressState): Address | undefined {
  return state.addresses.find((a) => a.id === state.selectedId);
}
