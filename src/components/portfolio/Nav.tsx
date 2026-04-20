import { useEffect, useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Social", href: "#social" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-foreground/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Monogram */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-display text-lg shadow-brutal-sm group-hover:bg-ember transition-colors">
            YC
          </div>
          <div className="hidden sm:flex items-center gap-2 mono-text text-xs uppercase tracking-widest text-muted-foreground">
            <span className="rec-dot" />
            <span>REC · 4K · 24fps</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 mono-text text-xs uppercase tracking-widest text-foreground/80 hover:text-ember transition-colors relative group"
            >
              <span className="text-ember mr-1">0{i + 1}</span>
              {l.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-ember scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="#projects"
          className="hidden md:inline-flex btn-brutal"
        >
          <span>Reel 2025</span>
          <span className="text-ember">→</span>
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border-2 border-foreground"
        >
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-foreground/10 bg-cream/95 backdrop-blur-md animate-fade-in-up">
          <nav className="container py-6 flex flex-col gap-2">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 py-3 border-b border-foreground/10 font-display text-3xl uppercase"
              >
                <span className="mono-text text-xs text-ember">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
