import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, MapPin, ShieldCheck, Star, Wallet } from "lucide-react";
import { ProductCard } from "@/components/landing/product-grid";
import { AddToBasket, StickyAddBar } from "@/components/product/add-to-basket";
import {
  formatPrice,
  getCategory,
  getProduct,
  getProductDetails,
  getStore,
  products,
} from "@/lib/mock-data";

/** Cloudinary originals are 2 to 3 MB, so ask for a resized copy. */
function thumb(url: string, w: number) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
}

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product not found" };
  const details = getProductDetails(id);
  return {
    title: `${product.name}, ${product.size} — KiranaLoop`,
    description: details?.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const details = getProductDetails(id);
  const store = getStore(product.storeId);
  const category = details ? getCategory(details.category) : undefined;
  const save = product.mrp - product.price;
  const percentOff = Math.round((save / product.mrp) * 100);
  const moreFromStore = products.filter((p) => p.storeId === product.storeId && p.id !== product.id);
  const sameAisle = products.filter(
    (p) => p.id !== product.id && getProductDetails(p.id)?.category === details?.category,
  );
  const shelfMates = products.filter((p) => {
    const d = getProductDetails(p.id);
    return p.id !== product.id && d && details && d.category === details.category && d.subcategory === details.subcategory;
  });
  const related = [...sameAisle, ...moreFromStore.filter((p) => !sameAisle.includes(p))].slice(0, 4);

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-5 sm:px-6 md:pb-0 lg:px-8 lg:pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="rounded hover:text-foreground hover:underline">
                Home
              </Link>
            </li>
            {category && (
              <>
                <ChevronRight className="size-4" aria-hidden />
                <li>
                  <Link href="/#categories" className="rounded hover:text-foreground hover:underline">
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <ChevronRight className="size-4" aria-hidden />
            <li aria-current="page" className="font-semibold text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] text-[9rem] sm:text-[12rem]"
              style={{ backgroundImage: `linear-gradient(160deg, white, ${product.tint})` }}
            >
              <span
                className="absolute inset-[16%] rounded-full opacity-80 blur-3xl"
                style={{ backgroundColor: product.tint }}
                aria-hidden
              />
              {product.image ? (
                <Image
                  src={thumb(product.image, 900)}
                  alt={`${product.name}, ${product.size}`}
                  fill
                  preload
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="object-contain p-[9%] drop-shadow-[0_24px_28px_rgba(11,59,60,0.28)]"
                />
              ) : (
                <span className="relative" aria-hidden>
                  {product.emoji}
                </span>
              )}
              {save > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-rani px-3.5 py-1.5 text-sm font-bold text-white shadow-md">
                  {percentOff}% off
                </span>
              )}
            </div>
            {product.image && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Product image is for reference. The pack at the shop may look slightly different.
              </p>
            )}
          </div>

          <div>
            <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-saffron-soft px-3 py-1.5 text-sm font-bold text-ink">
              <Clock className="size-4 text-leaf" aria-hidden />
              {store?.eta ?? "Quick delivery"}
            </p>
            {product.brand && (
              <p className="mb-1 text-sm font-black uppercase tracking-wider text-rani">{product.brand}</p>
            )}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">{product.size}</p>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-heading text-4xl font-bold">{formatPrice(product.price)}</span>
              {save > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="font-semibold text-leaf">You save {formatPrice(save)}</span>
                </>
              )}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Inclusive of all taxes</p>

            <div className="mt-6 hidden md:block">
              <AddToBasket product={product} />
            </div>

            {shelfMates.length > 0 && (
              <section className="mt-8" aria-labelledby="other-options">
                <h2 id="other-options" className="text-sm font-semibold text-muted-foreground">
                  Other options on this shelf
                </h2>
                <ul className="-mx-1 mt-3 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
                  {shelfMates.map((p) => (
                    <li key={p.id} className="w-32 shrink-0">
                      <Link
                        href={`/product/${p.id}`}
                        className="block rounded-2xl bg-white p-2 ring-1 ring-border outline-none transition hover:-translate-y-0.5 hover:ring-ink/30 focus-visible:ring-2 focus-visible:ring-ink"
                      >
                        <span
                          className="relative grid aspect-square place-items-center overflow-hidden rounded-xl text-4xl"
                          style={{ backgroundColor: p.tint }}
                        >
                          {p.image ? (
                            <Image src={thumb(p.image, 240)} alt="" fill sizes="128px" className="object-contain p-1.5" />
                          ) : (
                            <span aria-hidden>{p.emoji}</span>
                          )}
                        </span>
                        <span className="mt-2 line-clamp-2 block min-h-[2.5em] text-xs font-bold leading-tight">{p.name}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{p.size}</span>
                        <span className="block text-sm font-bold">{formatPrice(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {store && (
              <section
                aria-labelledby="sold-by"
                className="mt-8 rounded-3xl border bg-white p-5"
              >
                <h2 id="sold-by" className="text-sm font-semibold text-muted-foreground">
                  Sold and packed by
                </h2>
                <div className="mt-3 flex items-center gap-4">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-2xl font-heading text-lg font-extrabold text-ink"
                    style={{ backgroundColor: store.tint }}
                    aria-hidden
                  >
                    {store.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-bold">{store.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {store.owner} · {store.area}
                    </p>
                  </div>
                </div>
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <dt className="sr-only">Rating</dt>
                    <Star className="size-4 fill-saffron text-saffron" aria-hidden />
                    <dd className="font-semibold">{store.rating}</dd>
                    <dd className="text-muted-foreground">{store.orders}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <dt className="sr-only">Delivery time</dt>
                    <Clock className="size-4 text-muted-foreground" aria-hidden />
                    <dd className="font-semibold">{store.eta}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <dt className="sr-only">Distance</dt>
                    <MapPin className="size-4 text-muted-foreground" aria-hidden />
                    <dd>{store.distance} from you</dd>
                  </div>
                </dl>
                <p className="mt-4 flex items-center gap-2 border-t pt-4 text-sm font-medium text-leaf">
                  <span className="size-2 rounded-full bg-leaf" aria-hidden />
                  In stock · {store.closes}
                </p>
              </section>
            )}

            {details && (
              <section className="mt-8" aria-labelledby="about">
                <h2 id="about" className="text-xl font-bold">
                  About this item
                </h2>
                <p className="mt-2 max-w-[60ch] text-lg leading-relaxed text-foreground/80">
                  {details.description}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {details.highlights.map((h) => (
                    <li key={h} className="rounded-2xl bg-white px-4 py-3 text-sm font-medium ring-1 ring-border">
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <li className="flex items-start gap-3 rounded-2xl bg-saffron-soft p-4 text-sm">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
                <span>
                  <strong className="block">Check it at the door</strong>
                  Not happy? Return it to the rider and get a refund.
                </span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-saffron-soft p-4 text-sm">
                <Wallet className="mt-0.5 size-5 shrink-0 text-ink" aria-hidden />
                <span>
                  <strong className="block">Pay your way</strong>
                  UPI, card, or cash on delivery.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-14 lg:mt-20" aria-labelledby="related">
            <h2 id="related" className="text-2xl font-bold tracking-tight sm:text-3xl">
              You may also need
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ul>
          </section>
        )}
      </div>

      <StickyAddBar product={product} />
    </main>
  );
}
