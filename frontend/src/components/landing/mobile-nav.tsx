"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { House, LayoutGrid, RotateCcw, ShoppingBasket } from "lucide-react";
import { selectCount, useCart } from "@/store/cart";

const tabs = [
  { href: "/", label: "Home", icon: House },
  { href: "/#categories", label: "Aisles", icon: LayoutGrid },
  { href: "/#reorder", label: "Reorder", icon: RotateCcw },
];

export function MobileNav() {
  const pathname = usePathname();
  const count = useCart(selectCount);
  const setOpen = useCart((s) => s.setOpen);

  // The tab bar belongs to browsing. Product, checkout and order pages have their own bottom actions.
  if (pathname !== "/") return null;

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 rounded-full bg-ink/95 p-1.5 shadow-[0_18px_40px_-14px_rgba(11,59,60,0.7)] backdrop-blur md:hidden"
    >
      <ul className="flex items-center">
        {tabs.map(({ href, label, icon: Icon }) => (
          <li key={label} className="flex-1">
            <a
              href={href}
              className="flex h-14 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-semibold text-white/75 outline-none transition hover:text-white focus-visible:bg-white/10"
            >
              <Icon className="size-5" aria-hidden />
              {label}
            </a>
          </li>
        ))}
        <li className="flex-1">
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.92 }}
            aria-label={`Open basket, ${count} items`}
            className="relative flex h-14 w-full flex-col items-center justify-center gap-0.5 rounded-full bg-saffron text-[11px] font-bold text-ink outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingBasket className="size-5" aria-hidden />
            Basket
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute right-3 top-1 grid min-w-5 place-items-center rounded-full bg-rani px-1 text-[11px] font-bold leading-5 text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </li>
      </ul>
    </nav>
  );
}
