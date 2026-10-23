"use client";

import { usePathname } from "next/navigation";
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
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="grid grid-cols-4">
        {tabs.map(({ href, label, icon: Icon }) => (
          <li key={label}>
            <a
              href={href}
              className="flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold text-muted-foreground outline-none focus-visible:bg-muted"
            >
              <Icon className="size-6" aria-hidden />
              {label}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex h-16 w-full flex-col items-center justify-center gap-1 text-xs font-semibold text-indigo outline-none focus-visible:bg-muted"
          >
            <span className="relative">
              <ShoppingBasket className="size-6" aria-hidden />
              {count > 0 && (
                <span className="absolute -right-2.5 -top-2 grid min-w-5 place-items-center rounded-full bg-chilli px-1 text-[11px] font-bold leading-5 text-white">
                  {count}
                </span>
              )}
            </span>
            Basket
          </button>
        </li>
      </ul>
    </nav>
  );
}
