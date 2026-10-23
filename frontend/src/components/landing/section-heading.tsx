import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="max-w-[22ch] text-2xl font-bold leading-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-[52ch] text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
      </div>
      {action}
    </Reveal>
  );
}
