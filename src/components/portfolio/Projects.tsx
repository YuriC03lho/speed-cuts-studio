import { useState } from "react";
import { Play, X } from "lucide-react";
import { projects } from "@/data/projects";

// Converte URLs do YouTube/Vimeo em URL de embed
function toEmbed(url: string): { src: string; type: "iframe" | "video" } {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (yt) return { src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`, type: "iframe" };
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`, type: "iframe" };
  return { src: url, type: "video" };
}

export const Projects = () => {
  const [active, setActive] = useState<string | null>(null);
  const current = projects.find((p) => p.id === active);

  return (
    <section id="projects" className="relative py-24 md:py-40 bg-cream">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div>
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-foreground/40">04 /</span> Trabalhos Selecionados
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl">
              O reel
              <br />
              <span className="text-ember">em movimento.</span>
            </h2>
          </div>
          <div className="mono-text text-xs uppercase tracking-widest text-foreground/60 flex items-center gap-3">
            <span className="rec-dot" />
            <span>06 projetos · 2023 — 2025</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {projects.map((p, i) => {
            const span = p.featured
              ? "col-span-12 md:col-span-8"
              : i === 0
              ? "col-span-12 md:col-span-4"
              : "col-span-12 sm:col-span-6 md:col-span-4";
            return (
              <article
                key={p.id}
                className={`${span} reveal group cursor-pointer`}
                style={{ transitionDelay: `${i * 70}ms` }}
                onClick={() => setActive(p.id)}
              >
                <div className="relative overflow-hidden bg-ink aspect-[4/3] md:aspect-[16/10]">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 bg-ember/0 group-hover:bg-ember/15 transition-colors duration-500 mix-blend-overlay" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between mono-text text-[10px] uppercase tracking-widest text-cream/90">
                    <span className="bg-ink/70 backdrop-blur-sm px-2 py-1">{p.cat}</span>
                    <span>{p.runtime}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream/95 flex items-center justify-center shadow-warm scale-90 group-hover:scale-100 transition-transform duration-500">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-ink fill-ink ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-cream">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="mono-text text-[10px] uppercase tracking-widest text-cream/60 mb-2">
                          / {p.id} · {p.year}
                        </p>
                        <h3 className="display-text text-2xl md:text-4xl leading-tight">
                          {p.title}
                        </h3>
                      </div>
                      <span className="mono-text text-xs text-ember translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                        ASSISTIR →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center reveal">
          <a href="#social" className="btn-brutal">
            <span>Reel completo no YouTube</span>
            <span className="text-ember">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-[200] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in-up"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Fechar"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 border-2 border-cream text-cream flex items-center justify-center hover:bg-ember hover:border-ember transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-6xl aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const { src, type } = toEmbed(current.videoUrl);
              return type === "iframe" ? (
                <iframe
                  src={src}
                  title={current.title}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video src={src} controls autoPlay className="w-full h-full" />
              );
            })()}
            <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-between mono-text text-xs uppercase tracking-widest text-cream/70">
              <span>
                <span className="text-ember">/ {current.id}</span> · {current.title}
              </span>
              <span>{current.cat} · {current.year} · {current.runtime}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
