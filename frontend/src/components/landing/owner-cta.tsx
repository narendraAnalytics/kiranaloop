import { ArrowRight, BellRing, LineChart, Package } from "lucide-react";
import { Reveal, RevealItem, RevealList } from "@/components/motion/reveal";

const perks = [
  { icon: Package, text: "Update prices and stock from your phone" },
  { icon: BellRing, text: "Get a low-stock alert before the shelf is empty" },
  { icon: LineChart, text: "See what sells each week and what to reorder" },
];

function SpinningBadge() {
  const text = "Sell on kiranaloop • Keep your counter • ";
  return (
    <div className="pointer-events-none relative hidden size-28 shrink-0 sm:block" aria-hidden>
      <svg viewBox="0 0 200 200" className="size-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-saffron font-heading text-[15px] font-bold tracking-[0.12em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto grid size-12 place-items-center rounded-full bg-saffron text-2xl">🏪</span>
    </div>
  );
}

export function OwnerCta() {
  return (
    <section id="owners" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-14 sm:px-6 lg:px-8 lg:pt-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-ink p-6 text-white sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-mint/20 blur-3xl" aria-hidden />

        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <Reveal>
            <h2 className="max-w-[16ch] text-3xl font-bold leading-tight sm:text-5xl">
              Run a kirana? Put your shop online.
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg text-white/75">
              Keep your counter, your customers and your name. We add the app, the riders and a
              simple dashboard that tells you what to stock next.
            </p>
            <div className="mt-8 flex items-center gap-6">
            <a
              href="#"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-saffron px-7 text-base font-bold text-ink outline-none transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(255,159,28,0.8)] focus-visible:ring-4 focus-visible:ring-white/40"
            >
              List your shop
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <SpinningBadge />
            </div>
          </Reveal>

          <RevealList className="space-y-3" stagger={0.1}>
            {perks.map(({ icon: Icon, text }) => (
              <RevealItem
                key={text}
                className="flex items-center gap-4 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/[0.12]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-mint text-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-semibold">{text}</span>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </div>
    </section>
  );
}
