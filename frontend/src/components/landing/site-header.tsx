"use client";

import Link from "next/link";
import { ChevronDown, MapPin, Search, ShoppingBasket, Store, UserRound } from "lucide-react";
import { formatPrice } from "@/lib/mock-data";
import { selectCurrentAddress, useAddresses } from "@/store/address";
import { selectCount, selectTotal, useCart } from "@/store/cart";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="KiranaLoop home">
      <span className="grid size-9 place-items-center rounded-xl bg-marigold text-indigo">
        <Store className="size-5" aria-hidden />
      </span>
      <span className="font-heading text-xl font-extrabold tracking-tight text-indigo">
        Kirana<span className="text-chilli">Loop</span>
      </span>
    </Link>
  );
}

function SearchBox({ className = "" }: { className?: string }) {
  return (
    <form role="search" className={className} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="site-search" className="sr-only">
        Search groceries
      </label>
      <div className="flex h-12 items-center gap-3 rounded-full border bg-white px-4 shadow-xs focus-within:border-indigo focus-within:ring-3 focus-within:ring-indigo/15">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          id="site-search"
          type="search"
          placeholder="Try “atta, dal aur chai patti”"
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
      </div>
    </form>
  );
}

export function SiteHeader() {
  const count = useCart(selectCount);
  const total = useCart(selectTotal);
  const setOpen = useCart((s) => s.setOpen);
  const address = useAddresses(selectCurrentAddress);
  const setAddressDialogOpen = useAddresses((s) => s.setDialogOpen);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6 lg:flex-nowrap lg:gap-6 lg:px-8">
        <Logo className="order-1" />

        <button
          type="button"
          onClick={() => setAddressDialogOpen(true)}
          aria-label="Change delivery address"
          className="order-3 flex min-w-0 items-center gap-2 rounded-xl px-2 py-1 text-left outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-indigo sm:order-2"
        >
          <MapPin className="size-5 shrink-0 text-chilli" aria-hidden />
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-bold">Delivery in 12–18 min</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="truncate">
                {address ? `${address.label} · ${address.area}, ${address.pincode}` : "Indiranagar, Bengaluru 560038"}
              </span>
              <ChevronDown className="size-3.5 shrink-0" aria-hidden />
            </span>
          </span>
        </button>

        <SearchBox className="order-5 w-full lg:order-3 lg:max-w-xl lg:flex-1" />

        <div className="order-2 ml-auto flex items-center gap-2 sm:order-4 lg:ml-0">
          <button
            type="button"
            className="hidden h-11 items-center gap-2 rounded-full px-4 font-semibold outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-indigo md:flex"
          >
            <UserRound className="size-5" aria-hidden />
            Log in
          </button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 items-center gap-2 rounded-full bg-indigo px-4 font-semibold text-white outline-none transition-colors hover:bg-indigo/90 focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2"
            aria-label={`Open basket, ${count} items`}
          >
            <ShoppingBasket className="size-5" aria-hidden />
            <span className="tabular-nums">
              {count === 0 ? "Basket" : `${count} · ${formatPrice(total)}`}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
