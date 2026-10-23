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

function Row() {
  return (
    <ul className="flex shrink-0 items-center gap-8 pr-8">
      {words.map(([emoji, word]) => (
        <li key={word} className="flex items-center gap-4 whitespace-nowrap font-heading text-2xl font-bold sm:text-4xl">
          <span className="grid size-12 place-items-center rounded-full bg-white/10 text-2xl sm:size-14 sm:text-3xl" aria-hidden>
            {emoji}
          </span>
          {word}
          <span className="text-saffron" aria-hidden>
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
      <div className="-mx-4 -rotate-2 bg-ink py-5 text-white">
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
