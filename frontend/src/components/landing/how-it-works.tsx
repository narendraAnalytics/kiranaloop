import { Bike, ShoppingBasket, Store } from "lucide-react";

const steps = [
  {
    icon: Store,
    title: "Pick your shop",
    body: "See which kirana shops near you are open and what they have on the shelf right now.",
  },
  {
    icon: ShoppingBasket,
    title: "The owner packs it",
    body: "Your order goes straight to the shop counter. The owner packs it and can call you if something is missing.",
  },
  {
    icon: Bike,
    title: "A rider brings it home",
    body: "Track the rider on your phone. Most orders arrive in 12 to 18 minutes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How an order works</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="rounded-3xl border bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-indigo text-marigold">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="font-heading text-sm font-bold text-muted-foreground">Step {i + 1}</span>
            </div>
            <h3 className="mt-4 text-xl font-bold">{title}</h3>
            <p className="mt-2 max-w-[40ch] text-muted-foreground">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
