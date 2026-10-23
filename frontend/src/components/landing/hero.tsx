import { ArrowRight, Check, Clock, MapPin, PackageCheck, Sparkles, Star } from "lucide-react";

function Awning({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-9 w-full overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className={`h-full min-w-0 flex-1 rounded-b-full ${i % 2 === 0 ? "bg-chilli" : "bg-white"}`}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-0 sm:px-6 sm:pt-6 lg:px-8">
      <div className="relative overflow-hidden bg-indigo text-white sm:rounded-[2rem]">
        <Awning />

        <div className="grid items-center gap-10 px-5 pb-12 pt-8 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:px-14 lg:pb-16 lg:pt-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/90">
              <span className="size-2 rounded-full bg-leaf ring-4 ring-leaf/30" aria-hidden />
              3 shops are open near Indiranagar
            </p>

            <h1 className="mt-5 max-w-[14ch] text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Your kirana, at your door in 15 minutes.
            </h1>

            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80">
              Order from the shops you already know. Ramesh-ji packs it, a rider brings it, and
              we remember what you buy every week.
            </p>

            <form
              className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              action="#shops"
            >
              <label htmlFor="pincode" className="sr-only">
                Your pincode
              </label>
              <div className="flex h-14 items-center gap-3 rounded-full bg-white sm:flex-1 px-5 text-foreground focus-within:ring-4 focus-within:ring-marigold/50">
                <MapPin className="size-5 shrink-0 text-chilli" aria-hidden />
                <input
                  id="pincode"
                  inputMode="numeric"
                  maxLength={6}
                  defaultValue="560038"
                  placeholder="Enter your pincode"
                  className="min-w-0 flex-1 bg-transparent text-lg font-semibold outline-none placeholder:font-normal placeholder:text-muted-foreground"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-marigold px-7 text-lg font-bold text-indigo outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-white/60 active:translate-y-0"
              >
                See shops near me
                <ArrowRight className="size-5" aria-hidden />
              </button>
            </form>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {["No delivery fee above ₹199", "Pay online or on delivery", "Shops you can call"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-marigold" aria-hidden />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          <ShopCard />
        </div>
      </div>
    </section>
  );
}

function ShopCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
      <div className="rotate-0 overflow-hidden rounded-3xl bg-white text-foreground shadow-2xl shadow-black/30 lg:rotate-2">
        <Awning className="h-5 [&>span:nth-child(odd)]:bg-marigold" />
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-marigold font-heading text-xl font-extrabold text-indigo">
              SG
            </span>
            <div className="min-w-0">
              <p className="truncate font-heading text-xl font-bold">Sharma General Store</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Star className="size-3.5 fill-marigold text-marigold" aria-hidden />
                4.8 · 400 m away · Ramesh-ji
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-chalk p-4">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="flex items-center gap-2">
                <PackageCheck className="size-4 text-leaf" aria-hidden />
                Packing your order
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-3.5" aria-hidden />
                Arrives in 12 min
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-border" role="presentation">
              <div className="h-full w-2/5 rounded-full bg-leaf" />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["🥛", "Full cream milk × 2"],
                ["🍞", "Brown bread"],
                ["🍵", "Assam chai patti"],
              ].map(([emoji, label]) => (
                <li key={label} className="flex items-center gap-3">
                  <span aria-hidden>{emoji}</span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 flex items-start gap-2 rounded-2xl bg-marigold-soft p-3 text-sm">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-chilli" aria-hidden />
            <span>
              <strong>Running low on eggs?</strong> You usually buy them on Sundays. Add 6 from
              Sharma Store.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
