interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  variant?: "default" | "dark" | "ember";
}

export const Marquee = ({ items, reverse = false, variant = "default" }: MarqueeProps) => {
  const styles = {
    default: "bg-cream-soft text-foreground border-y border-foreground/15",
    dark: "bg-ink text-cream",
    ember: "bg-ember text-cream",
  }[variant];

  // duplicate for seamless loop
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden py-6 md:py-8 ${styles}`}>
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8 shrink-0">
            <span className="display-text text-3xl md:text-5xl lg:text-6xl whitespace-nowrap">
              {item}
            </span>
            <span className="text-2xl md:text-3xl opacity-60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
