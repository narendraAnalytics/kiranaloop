import Image from "next/image";
import { SectionHeading } from "@/components/landing/section-heading";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { categories } from "@/lib/mock-data";

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <SectionHeading
        title="Shop by aisle"
        subtitle="Everything your local shelf has, sorted the way you look for it."
      />

      <RevealList
        stagger={0.04}
        className="-mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-6 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-11"
      >
        {categories.map((c) => (
          <RevealItem key={c.slug} className="w-28 shrink-0 snap-start sm:w-auto">
            <a
              href={`#${c.slug}`}
              className="group flex flex-col gap-2 rounded-[1.75rem] outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span
                className="relative block aspect-square overflow-hidden rounded-[1.75rem] transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_30px_-18px_rgba(11,59,60,0.5)]"
                style={{ backgroundColor: c.tint }}
              >
                {c.image ? (
                  <Image
                    src={c.image.replace("/upload/", "/upload/f_auto,q_auto,w_500/")}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 130px, 112px"
                    className="scale-[1.12] object-cover transition-transform duration-300 group-hover:scale-[1.22]"
                  />
                ) : (
                  <span className="grid h-full place-items-center text-5xl" aria-hidden>
                    <span className="inline-block transition-transform duration-300 group-hover:scale-110 group-hover:animate-wiggle">
                      {c.emoji}
                    </span>
                  </span>
                )}
              </span>
              <span className="px-1 text-center text-[0.82rem] font-bold leading-tight text-ink">{c.name}</span>
            </a>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  );
}
