"use client";

import { useState } from "react";
import { Briefcase, House, MapPin, Plus, Trash2 } from "lucide-react";
import { AddressForm } from "@/components/checkout/address-form";
import { formatAddress, type AddressInput } from "@/lib/address";
import { useAddresses } from "@/store/address";

const icons = { Home: House, Work: Briefcase, Other: MapPin } as const;

export function AddressPicker({ onSelected }: { onSelected?: () => void }) {
  const addresses = useAddresses((s) => s.addresses);
  const selectedId = useAddresses((s) => s.selectedId);
  const select = useAddresses((s) => s.select);
  const remove = useAddresses((s) => s.remove);
  const add = useAddresses((s) => s.add);
  const [adding, setAdding] = useState(false);

  const showForm = adding || addresses.length === 0;

  function save(input: AddressInput) {
    add(input);
    setAdding(false);
    onSelected?.();
  }

  return (
    <div className="space-y-4">
      {addresses.length > 0 && (
        <fieldset>
          <legend className="sr-only">Saved addresses</legend>
          <ul className="space-y-3">
            {addresses.map((a) => {
              const Icon = icons[a.label];
              const checked = a.id === selectedId;
              return (
                <li key={a.id} className="relative">
                  <label className="block cursor-pointer">
                    <input
                      type="radio"
                      name="address"
                      checked={checked}
                      onChange={() => {
                        select(a.id);
                        onSelected?.();
                      }}
                      className="peer sr-only"
                    />
                    <span className="flex gap-4 rounded-2xl border bg-white p-4 pr-14 peer-checked:border-ink peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:ring-4 peer-focus-visible:ring-ink/30">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-saffron-soft text-ink">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold">{a.label}</span>
                        <span className="block text-sm text-muted-foreground">{formatAddress(a)}</span>
                        <span className="mt-1 block text-sm">
                          {a.name} · {a.phone}
                        </span>
                      </span>
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(a.id)}
                    aria-label={`Delete ${a.label} address`}
                    className="absolute right-3 top-3 grid size-9 place-items-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-rani focus-visible:ring-2 focus-visible:ring-ink"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      )}

      {showForm ? (
        <div className="rounded-2xl border bg-white p-4 sm:p-5">
          <h3 className="mb-4 text-lg font-bold">
            {addresses.length === 0 ? "Where should we deliver?" : "Add a new address"}
          </h3>
          <AddressForm
            onSave={save}
            onCancel={addresses.length > 0 ? () => setAdding(false) : undefined}
            submitLabel="Save and deliver here"
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed font-bold text-ink outline-none hover:bg-white focus-visible:ring-4 focus-visible:ring-ink/30"
        >
          <Plus className="size-5" aria-hidden />
          Add a new address
        </button>
      )}
    </div>
  );
}
