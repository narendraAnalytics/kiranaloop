import { categories } from "@/lib/mock-data";

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Shop by aisle</h2>
      <p className="mt-1 text-muted-foreground">Everything your local shelf has, sorted the way you look for it.</p>

      <ul className="-mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-10">
        {categories.map((c) => (
          <li key={c.slug} className="w-24 shrink-0 snap-start sm:w-auto">
            <a
              href={`#${c.slug}`}
              className="group flex flex-col items-center gap-2 rounded-2xl p-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-indigo"
            >
              <span
                className="grid aspect-square w-full place-items-center rounded-3xl text-4xl transition-transform group-hover:-translate-y-1 sm:text-5xl"
                style={{ backgroundColor: c.tint }}
                aria-hidden
              >
                {c.emoji}
              </span>
              <span className="text-sm font-semibold leading-tight">{c.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
