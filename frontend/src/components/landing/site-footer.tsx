import { Logo } from "@/components/landing/site-header";

const columns = [
  { title: "Shop", links: ["Shops near me", "Categories", "Your usual basket"] },
  { title: "Shop owners", links: ["List your shop", "Owner dashboard", "How payouts work"] },
  { title: "Help", links: ["Contact us", "Delivery areas", "Refunds"] },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-indigo text-white lg:mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div>
          <div className="inline-block rounded-2xl bg-white p-2.5">
            <Logo />
          </div>
          <p className="mt-4 max-w-[34ch] text-white/75">
            Neighbourhood kirana shops, delivered with the speed you expect today.
          </p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h3 className="font-bold">{c.title}</h3>
            <ul className="mt-3 space-y-2 text-white/75">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="rounded outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-marigold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-white/60 sm:px-6">
        © 2026 KiranaLoop. A demo build with sample shops and prices.
      </div>
    </footer>
  );
}
