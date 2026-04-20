export const Footer = () => {
  return (
    <footer className="relative bg-cream border-t-2 border-foreground/15 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-display text-lg shadow-brutal-sm">
              YC
            </div>
            <div className="mono-text text-xs uppercase tracking-widest text-foreground/60">
              <div>Yuri Coelho — Video Editor</div>
              <div className="text-foreground/40">© {new Date().getFullYear()} · All rights reserved</div>
            </div>
          </div>

          <div className="flex items-center gap-6 mono-text text-xs uppercase tracking-widest text-foreground/60">
            <span className="flex items-center gap-2">
              <span className="rec-dot" />
              REC
            </span>
            <span>00:14:22:08</span>
            <a href="#home" className="hover:text-ember transition-colors">
              ↑ Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
