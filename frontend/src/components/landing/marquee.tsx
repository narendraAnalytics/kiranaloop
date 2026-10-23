const words = [
  ["🥛", "Doodh"],
  ["🍅", "Tamatar"],
  ["🌾", "Atta"],
  ["🍵", "Chai patti"],
  ["🧅", "Pyaaz"],
  ["🍞", "Bread"],
  ["🧀", "Paneer"],
  ["🍌", "Kela"],
];

const chips = ["bg-saffron-soft", "bg-mint-soft", "bg-lilac-soft", "bg-rani-soft"];

function Row() {
  return (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {words.map(([emoji, word], i) => (
        <li key={word} className="flex items-center gap-8 whitespace-nowrap">
          <span
            className={`flex items-center gap-3 rounded-full py-2 pl-2 pr-6 font-heading text-xl font-bold text-ink shadow-[0_10px_24px_-12px_rgba(11,59,60,0.55)] sm:gap-4 sm:text-3xl ${chips[i % chips.length]}`}
          >
            <span className="grid size-11 place-items-center rounded-full bg-white text-2xl shadow-sm sm:size-12 sm:text-3xl" aria-hidden>
              {emoji}
            </span>
            {word}
          </span>
          <span className="text-2xl text-white sm:text-3xl" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Scrolling band of everyday groceries. Pauses on hover; still for reduced motion. */
export function Marquee() {
  return (
    <section aria-label="Everyday groceries, delivered" className="relative mt-10 overflow-hidden py-4 lg:mt-14">
      <div className="-mx-4 -rotate-2 bg-gradient-to-r from-rani via-saffron to-rani py-5 shadow-[0_20px_40px_-24px_rgba(11,59,60,0.6)]">
        <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
          <Row />
          <div aria-hidden className="flex">
            <Row />
          </div>
        </div>
      </div>
    </section>
  );
}
