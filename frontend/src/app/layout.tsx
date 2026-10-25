import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Unbounded } from "next/font/google";
import { AddressDialog } from "@/components/checkout/address-dialog";
import { CartSheet } from "@/components/landing/cart-sheet";
import { MobileNav } from "@/components/landing/mobile-nav";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { FlyLayer } from "@/components/motion/fly-layer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Toaster } from "@/components/ui/sonner";
import { StoreHydrator } from "@/store/hydrate";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KiranaLoop — your neighbourhood kirana, delivered",
  description:
    "Order groceries from the kirana shops you already trust. Fast delivery, personal service, and smart reorders.",
};

export const viewport: Viewport = {
  themeColor: "#0b3b3c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileNav />
          <CartSheet />
          <AddressDialog />
          <FlyLayer />
        </MotionProvider>
        <Toaster position="top-center" />
        <StoreHydrator />
      </body>
    </html>
  );
}
