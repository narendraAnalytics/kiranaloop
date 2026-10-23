"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, MapPin, Search, ShoppingBasket, UserRound } from "lucide-react";
import { defaultLocation, formatPrice } from "@/lib/mock-data";
import { selectCurrentAddress, useAddresses } from "@/store/address";
import { selectCount, selectTotal, useCart } from "@/store/cart";
import { useFly } from "@/store/fly";

export function Logo({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="KiranaLoop home">
      <Image
        src="https://res.cloudinary.com/dkqbzwicr/image/upload/v1792764608/logo_c5dpbc.png"
        alt=""
        width={53}
        height={48}
        sizes="53px"
        className="-my-1 h-12 w-auto shrink-0 drop-shadow-[0_4px_8px_rgba(19,138,85,0.35)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
      />
      <span
        className={`font-heading text-lg font-bold tracking-tight ${tone === "light" ? "text-white" : "text-ink"}`}
      >
        kirana<span className="text-rani">loop</span>
      </span>
    </Link>
  );
}

const suggestions = ["atta, dal aur chai patti", "fresh paneer", "doodh 2 packet", "tomato aur pyaaz", "Sunday ka basket"];

function SearchBox({ className = "" }: { className?: string }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % suggestions.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <form role="search" className={className} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="site-search" className="sr-only">
        Search groceries
      </label>
      <div className="relative flex h-12 items-center gap-3 rounded-full bg-haze px-4 ring-1 ring-ink/10 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-ink">
        <Search className="size-5 shrink-0 text-ink/60" aria-hidden />
        <input
          id="site-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? "Search in your own words" : ""}
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
        {!value && !focused && (
          <span className="pointer-events-none absolute inset-y-0 left-12 right-4 flex items-center overflow-hidden text-muted-foreground" aria-hidden>
            Try&nbsp;
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={index}
                className="truncate font-medium text-ink/70"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                “{suggestions[index]}”
              </motion.span>
            </AnimatePresence>
          </span>
        )}
      </div>
    </form>
  );
}

const links = [
  { href: "/#categories", label: "Aisles" },
  { href: "/#shops", label: "Shops" },
  { href: "/#reorder", label: "Reorder" },
  { href: "/#owners", label: "For shop owners" },
];

export function SiteHeader() {
  const count = useCart(selectCount);
  const total = useCart(selectTotal);
  const setOpen = useCart((s) => s.setOpen);
  const address = useAddresses(selectCurrentAddress);
  const setAddressDialogOpen = useAddresses((s) => s.setDialogOpen);
  const landed = useFly((s) => s.landed);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header className="sticky top-0 z-40 px-2 pt-2 sm:px-4 sm:pt-3">
      <div
        className={`mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2.5 rounded-[1.75rem] px-3 transition-all duration-300 sm:px-4 lg:flex-nowrap lg:gap-5 ${
          scrolled
            ? "bg-white/85 py-2.5 shadow-[0_12px_40px_-16px_rgba(11,59,60,0.35)] ring-1 ring-ink/5 backdrop-blur-xl"
            : "bg-white/60 py-2.5 ring-1 ring-ink/5 backdrop-blur-md"
        }`}
      >
        <Logo className="order-1 shrink-0" />

        <button
          type="button"
          onClick={() => setAddressDialogOpen(true)}
          aria-label="Change delivery address"
          className="order-3 flex min-w-0 items-center gap-2 rounded-full py-1 pl-1 pr-3 text-left outline-none transition hover:bg-saffron-soft focus-visible:ring-2 focus-visible:ring-ink sm:order-2"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rani-soft text-rani">
            <MapPin className="size-4" aria-hidden />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-sm font-bold">12–18 min</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="max-w-[16rem] truncate">
                {address ? `${address.label} · ${address.area}` : defaultLocation}
              </span>
              <ChevronDown className="size-3.5 shrink-0" aria-hidden />
            </span>
          </span>
        </button>

        <SearchBox className="order-5 w-full lg:order-3 lg:flex-1" />

        <nav aria-label="Sections" className="order-4 hidden xl:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative rounded-full px-3 py-2 text-sm font-semibold text-ink/80 outline-none transition hover:bg-lilac-soft hover:text-ink focus-visible:ring-2 focus-visible:ring-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 ml-auto flex items-center gap-1.5 sm:order-4 lg:order-5 lg:ml-0">
          <button
            type="button"
            aria-label="Log in"
            className="hidden size-11 place-items-center rounded-full outline-none transition hover:bg-lilac-soft focus-visible:ring-2 focus-visible:ring-ink md:grid"
          >
            <UserRound className="size-5" aria-hidden />
          </button>
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-11 items-center gap-2 rounded-full bg-saffron pl-3.5 pr-4 font-bold text-ink outline-none transition-shadow hover:shadow-[0_8px_24px_-8px_rgba(255,159,28,0.9)] focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            aria-label={`Open basket, ${count} items`}
            data-basket-target
          >
            <motion.span
              key={landed}
              className="inline-flex"
              animate={landed ? { rotate: [0, -18, 12, 0], scale: [1, 1.35, 1] } : undefined}
              transition={{ duration: 0.45 }}
            >
              <ShoppingBasket className="size-5" aria-hidden />
            </motion.span>
            <span className="tabular-nums">{count === 0 ? "Basket" : formatPrice(total)}</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -right-1.5 -top-1.5 grid min-w-6 place-items-center rounded-full bg-rani px-1.5 text-xs font-bold leading-6 text-white ring-2 ring-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
