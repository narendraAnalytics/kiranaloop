import { Bike, ShoppingBasket, Store } from "lucide-react";
import { SectionHeading } from "@/components/landing/section-heading";
import { RevealItem, RevealList } from "@/components/motion/reveal";

const steps = [
  {
    icon: Store,
    title: "Pick your shop",
    body: "See which kirana shops near you are open and what they have on the shelf right now.",
    tone: "bg-saffron-soft",
    chip: "bg-saffron",
  },
  {
    icon: ShoppingBasket,
    title: "The owner packs it",
    body: "Your order goes straight to the shop counter. The owner packs it and can call you if something is missing.",
    tone: "bg-mint-soft",
    chip: "bg-mint",
  },
  {
    icon: Bike,
    title: "A rider brings it home",
    body: "Track the rider on your phone. Most orders arrive in 12 to 18 minutes.",
    tone: "bg-rani-soft",
    chip: "bg-rani text-white",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <SectionHeading title="How an order works" subtitle="Three steps from the shop shelf to your door." />
      <RevealList className="mt-8 grid gap-4 md:grid-cols-3" stagger={0.12}>
        {steps.map(({ icon: Icon, title, body, tone, chip }, i) => (
          <RevealItem key={title} className={`relative overflow-hidden rounded-[2rem] p-6 sm:p-8 ${tone}`}>
            <span
              className="pointer-events-none absolute -right-2 -top-6 font-heading text-[7.5rem] font-black leading-none text-ink/[0.07]"
              aria-hidden
            >
              {i + 1}
            </span>
            <span className={`relative grid size-14 place-items-center rounded-2xl text-ink ${chip}`}>
              <Icon className="size-6" aria-hidden />
            </span>
            <p className="relative mt-6 text-sm font-bold text-ink/60">Step {i + 1}</p>
            <h3 className="relative mt-1 text-xl font-bold">{title}</h3>
            <p className="relative mt-3 max-w-[38ch] text-ink/75">{body}</p>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  );
}
