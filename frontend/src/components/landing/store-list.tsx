import { Clock, Phone, Star } from "lucide-react";
import { stores } from "@/lib/mock-data";

export function StoreList() {
  return (
    <section id="shops" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Shops open near you</h2>
      <p className="mt-1 text-muted-foreground">Real neighbours, real counters. Pick the shop you trust.</p>

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {stores.map((s) => (
          <li key={s.id} className="flex flex-col rounded-3xl border bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-indigo/10">
            <div className="flex items-center gap-4">
              <span
                className="grid size-14 shrink-0 place-items-center rounded-2xl font-heading text-lg font-extrabold text-indigo"
                style={{ backgroundColor: s.tint }}
                aria-hidden
              >
                {s.initials}
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold">{s.name}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  {s.owner} · {s.area}
                </p>
              </div>
            </div>

            <p className="mt-4 text-base">{s.known}</p>

            <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Rating</dt>
                <Star className="size-4 fill-marigold text-marigold" aria-hidden />
                <dd className="font-semibold">{s.rating}</dd>
                <dd className="text-muted-foreground">{s.orders}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <dt className="sr-only">Delivery time</dt>
                <Clock className="size-4 text-muted-foreground" aria-hidden />
                <dd className="font-semibold">{s.eta}</dd>
                <dd className="text-muted-foreground">· {s.distance}</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between gap-3 border-t pt-4">
              <span className="flex items-center gap-2 text-sm font-medium text-leaf">
                <span className="size-2 rounded-full bg-leaf" aria-hidden />
                {s.closes}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Phone className="size-4" aria-hidden />
                Call shop
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
