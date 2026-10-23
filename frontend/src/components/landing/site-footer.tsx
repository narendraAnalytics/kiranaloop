import { Logo } from "@/components/landing/site-header";

const columns = [
  { title: "Shop", links: ["Shops near me", "Categories", "Your usual basket"] },
  { title: "Shop owners", links: ["List your shop", "Owner dashboard", "How payouts work"] },
  { title: "Help", links: ["Contact us", "Delivery areas", "Refunds"] },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 overflow-hidden rounded-t-[2.5rem] bg-ink text-white lg:mt-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-6 pt-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-[34ch] text-white/70">
            Neighbourhood kirana shops, delivered with the speed you expect today.
          </p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="font-sans text-sm font-bold tracking-normal text-saffron">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-white/75">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="rounded outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-saffron"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <p
        className="mx-auto max-w-7xl select-none px-4 font-heading text-[12.5vw] font-black leading-[0.9] tracking-tighter text-white/[0.06] sm:px-6 lg:px-8 xl:text-[11rem]"
        aria-hidden
      >
        kiranaloop
      </p>

      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/55 sm:px-6">
        © 2026 KiranaLoop. A demo build with sample shops and prices.
      </div>
    </footer>
  );
}
