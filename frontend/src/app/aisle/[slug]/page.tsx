import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Clock, Store as StoreIcon } from "lucide-react";
import { AisleView } from "@/components/aisle/aisle-view";
import { aisleTheme } from "@/lib/aisle-theme";
import { categories, getAisleProducts, getCategory, getStore, type Store } from "@/lib/mock-data";

type Props = { params: Promise<{ slug: string }> };

/** Every slug is prerendered by generateStaticParams; let the route block rather than stream. */
export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Aisle not found" };
  return {
    title: `${category.name} from shops near you — KiranaLoop`,
    description: `Order ${category.name.toLowerCase()} from kirana shops in your neighbourhood, delivered in minutes.`,
  };
}

/** Cloudinary originals are 2 to 3 MB, so ask for a small resize. */
function thumb(url: string, w: number) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
}

export default async function AislePage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const theme = aisleTheme(slug);
  const items = getAisleProducts(slug);
  const shops = [...new Set(items.map((p) => p.storeId))].flatMap((id) => getStore(id) ?? []) as Store[];
  const fastest = shops.map((s) => s.eta).sort((a, b) => parseInt(a) - parseInt(b))[0];
  const text = theme.dark ? "text-white" : "text-ink";
  const others = categories.filter((c) => c.slug !== slug && getAisleProducts(c.slug).length > 0);

  return (
    <main className="flex-1 pb-28 md:pb-12">
      <div className="mx-auto max-w-7xl px-3 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="inline-flex items-center gap-1 rounded hover:text-ink hover:underline">
                <ArrowLeft className="size-4 sm:hidden" aria-hidden />
                Home
              </Link>
            </li>
            <ChevronRight className="hidden size-4 sm:block" aria-hidden />
            <li className="hidden sm:block">
              <Link href="/#categories" className="rounded hover:text-ink hover:underline">
                Aisles
              </Link>
            </li>
            <ChevronRight className="size-4" aria-hidden />
            <li aria-current="page" className="font-semibold text-ink">
              {category.name}
            </li>
          </ol>
        </nav>

        <header
          className={`relative isolate mt-3 overflow-hidden rounded-[2rem] px-5 py-5 sm:rounded-[2.5rem] sm:px-8 sm:py-7 lg:px-10 ${text}`}
          style={{ backgroundImage: `linear-gradient(120deg, ${theme.from}, ${theme.to})` }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
            <span className="animate-blob absolute -right-10 -top-16 size-64 rounded-full bg-white/40 blur-3xl" />
            <span className="animate-blob absolute -bottom-20 left-1/4 size-56 rounded-full bg-white/25 blur-3xl [animation-delay:-6s]" />
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-70">Aisle</p>
              <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-4xl">{category.name}</h1>
              {items.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold sm:mt-4 sm:gap-2 sm:text-sm">
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-white/45 px-3 py-1.5 backdrop-blur">
                    {items.length} items
                  </li>
                  {fastest && (
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-white/45 px-3 py-1.5 backdrop-blur">
                      <Clock className="size-3.5" aria-hidden />
                      From {fastest}
                    </li>
                  )}
                  <li className="inline-flex items-center gap-1.5 rounded-full bg-white/45 px-3 py-1.5 backdrop-blur">
                    <StoreIcon className="size-3.5" aria-hidden />
                    {shops.map((s) => s.short).join(", ")}
                  </li>
                </ul>
              ) : (
                <p className="mt-2 max-w-[44ch] text-sm opacity-80 sm:text-base">
                  Coming soon from your neighbourhood shops.
                </p>
              )}
            </div>
            {category.image && (
              <span className="relative block size-24 shrink-0 sm:size-36 lg:size-44" aria-hidden>
                <span className="absolute inset-[12%] rounded-full bg-white/60 blur-2xl" />
                <span className="animate-float relative block size-full">
                  <Image
                    src={thumb(category.image, 400)}
                    alt=""
                    fill
                    preload
                    sizes="(min-width: 1024px) 176px, (min-width: 640px) 144px, 96px"
                    className="rounded-[1.75rem] object-cover drop-shadow-[0_18px_20px_rgba(11,59,60,0.25)]"
                  />
                </span>
              </span>
            )}
          </div>
        </header>

        {items.length > 0 ? (
          <AisleView slug={slug} emoji={category.emoji} image={category.image} />
        ) : (
          <section
            className="mt-5 rounded-[2rem] px-6 py-10 text-center ring-1 ring-ink/5 sm:py-14"
            style={{ backgroundColor: theme.soft }}
          >
            <p className="text-5xl" aria-hidden>
              {category.emoji}
            </p>
            <h2 className="mt-4 text-xl font-bold sm:text-2xl">Your shops haven&apos;t listed {category.name.toLowerCase()} yet</h2>
            <p className="mx-auto mt-2 max-w-[48ch] text-ink/70">
              Ask your kirana owner to add them, or pick another aisle below.
            </p>
          </section>
        )}

        <section aria-labelledby="more-aisles" className="mt-12">
          <h2 id="more-aisles" className="text-lg font-bold sm:text-xl">
            More aisles
          </h2>
          <ul className="-mx-3 mt-4 flex snap-x gap-3 overflow-x-auto px-3 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {others.map((c) => (
              <li key={c.slug} className="w-24 shrink-0 snap-start sm:w-28">
                <Link
                  href={`/aisle/${c.slug}`}
                  className="group flex flex-col gap-2 rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-ink"
                >
                  <span
                    className="relative block aspect-square overflow-hidden rounded-[1.5rem] transition duration-300 group-hover:-translate-y-1"
                    style={{ backgroundColor: c.tint }}
                  >
                    {c.image ? (
                      <Image
                        src={thumb(c.image, 300)}
                        alt=""
                        fill
                        sizes="112px"
                        className="scale-[1.12] object-cover transition-transform duration-300 group-hover:scale-[1.22]"
                      />
                    ) : (
                      <span className="grid h-full place-items-center text-4xl" aria-hidden>
                        {c.emoji}
                      </span>
                    )}
                  </span>
                  <span className="text-center text-xs font-bold leading-tight">{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
