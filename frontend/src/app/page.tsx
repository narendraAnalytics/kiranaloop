import { Categories } from "@/components/landing/categories";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { OwnerCta } from "@/components/landing/owner-cta";
import { ProductGrid } from "@/components/landing/product-grid";
import { StoreList } from "@/components/landing/store-list";
import { UsualBasket } from "@/components/landing/usual-basket";

export default function Home() {
  return (
    <main className="flex-1 pb-20 md:pb-0">
      <Hero />
      <Categories />
      <UsualBasket />
      <StoreList />
      <ProductGrid />
      <HowItWorks />
      <OwnerCta />
    </main>
  );
}
