import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { AddressDialog } from "@/components/checkout/address-dialog";
import { CartSheet } from "@/components/landing/cart-sheet";
import { MobileNav } from "@/components/landing/mobile-nav";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Toaster } from "@/components/ui/sonner";
import { StoreHydrator } from "@/store/hydrate";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KiranaLoop — your neighbourhood kirana, delivered",
  description:
    "Order groceries from the kirana shops you already trust. Fast delivery, personal service, and smart reorders.",
};

export const viewport: Viewport = {
  themeColor: "#1b2559",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileNav />
        <CartSheet />
        <AddressDialog />
        <Toaster position="top-center" />
        <StoreHydrator />
      </body>
    </html>
  );
}
