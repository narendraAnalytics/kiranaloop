"use client";

import { AddressPicker } from "@/components/checkout/address-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddresses } from "@/store/address";

export function AddressDialog() {
  const open = useAddresses((s) => s.dialogOpen);
  const setOpen = useAddresses((s) => s.setDialogOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90dvh] w-full max-w-[calc(100%-2rem)] overflow-y-auto bg-chalk p-5 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Choose your delivery address</DialogTitle>
          <DialogDescription>
            We show the shops that can reach you and how long they take.
          </DialogDescription>
        </DialogHeader>
        <AddressPicker onSelected={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
