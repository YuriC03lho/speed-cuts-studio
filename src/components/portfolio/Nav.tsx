import { useEffect, useState } from "react";

const links = [
  { label: "Início", href: "#home" },
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Redes", href: "#social" },
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
          ? "bg-ink/90 backdrop-blur-md border-b border-cream/10 py-3"
          : "bg-ink/70 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-cream text-ink flex items-center justify-center font-display text-lg shadow-brutal-sm group-hover:bg-ember group-hover:text-cream transition-colors">
            YC
          </div>
          <div className="hidden sm:flex items-center gap-2 mono-text text-xs uppercase tracking-widest text-cream/70">
            <span className="rec-dot" />
            <span>REC · 4K · 24fps</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 mono-text text-xs uppercase tracking-widest text-cream/85 hover:text-ember transition-colors relative group"
            >
              <span className="text-ember mr-1">0{i + 1}</span>
              {l.label}
              <span className="absolute bottom-1 left-4 right-4 h-px bg-ember scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="#projects"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-cream text-ink mono-text text-xs uppercase tracking-widest border-2 border-cream hover:bg-ember hover:text-cream hover:border-ember transition-colors shadow-brutal-sm"
        >
          <span>Reel 25 — 26</span>
          <span className="text-ember group-hover:text-cream">→</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border-2 border-cream text-cream"
        >
          <span className={`block w-5 h-0.5 bg-cream transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-5 h-0.5 bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-cream transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cream/10 bg-ink/95 backdrop-blur-md animate-fade-in-up">
          <nav className="container py-6 flex flex-col gap-2">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 py-3 border-b border-cream/10 font-display text-3xl uppercase text-cream"
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
