import { ArrowRight, BellRing, LineChart, Package } from "lucide-react";

const perks = [
  { icon: Package, text: "Update prices and stock from your phone" },
  { icon: BellRing, text: "Get a low-stock alert before the shelf is empty" },
  { icon: LineChart, text: "See what sells each week and what to reorder" },
];

export function OwnerCta() {
  return (
    <section id="owners" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <div className="grid gap-8 rounded-[2rem] bg-white p-6 ring-1 ring-border sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-14">
        <div>
          <h2 className="max-w-[18ch] text-3xl font-bold tracking-tight sm:text-4xl">
            Run a kirana? Put your shop online.
          </h2>
          <p className="mt-3 max-w-[46ch] text-lg text-muted-foreground">
            Keep your counter, your customers and your name. We add the app, the riders and a simple
            dashboard that tells you what to stock next.
          </p>
          <a
            href="#"
            className="mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-marigold px-7 text-lg font-bold text-indigo outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-indigo/30"
          >
            List your shop
            <ArrowRight className="size-5" aria-hidden />
          </a>
        </div>

        <ul className="space-y-3">
          {perks.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-4 rounded-2xl bg-chalk p-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-indigo">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="font-semibold">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
