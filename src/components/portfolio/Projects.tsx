import { Play } from "lucide-react";
import fps1 from "@/assets/project-fps-1.jpg";
import fps2 from "@/assets/project-fps-2.jpg";
import drift from "@/assets/project-drift.jpg";
import commercial from "@/assets/project-commercial.jpg";
import music from "@/assets/project-music.jpg";
import travel from "@/assets/project-travel.jpg";

const projects = [
  { id: "01", title: "Apex Velocity", cat: "FPS Edit", year: "2025", img: fps1, runtime: "01:48" },
  { id: "02", title: "Tokyo Drift Nights", cat: "JDM", year: "2025", img: drift, runtime: "02:34", featured: true },
  { id: "03", title: "Optic Vol. III", cat: "Commercial", year: "2024", img: commercial, runtime: "00:45" },
  { id: "04", title: "Smoke & Iron", cat: "FPS Edit", year: "2024", img: fps2, runtime: "01:22" },
  { id: "05", title: "Echoes In Motion", cat: "Music Video", year: "2024", img: music, runtime: "03:12" },
  { id: "06", title: "Mountain Run", cat: "Travel", year: "2023", img: travel, runtime: "02:00" },
];

export const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-40 bg-cream">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div>
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-foreground/40">04 /</span> Selected Work
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl">
              The reel
              <br />
              <span className="text-ember">in motion.</span>
            </h2>
          </div>
          <div className="mono-text text-xs uppercase tracking-widest text-foreground/60 flex items-center gap-3">
            <span className="rec-dot" />
            <span>06 projects · 2023 — 2025</span>
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
                  {/* Color grade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 bg-ember/0 group-hover:bg-ember/15 transition-colors duration-500 mix-blend-overlay" />

                  {/* Top meta */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between mono-text text-[10px] uppercase tracking-widest text-cream/90">
                    <span className="bg-ink/70 backdrop-blur-sm px-2 py-1">{p.cat}</span>
                    <span>{p.runtime}</span>
                  </div>

                  {/* Play button (hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream/95 flex items-center justify-center shadow-warm scale-90 group-hover:scale-100 transition-transform duration-500">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-ink fill-ink ml-1" />
                    </div>
                  </div>

                  {/* Bottom title */}
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
                        VIEW →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center reveal">
          <a href="#social" className="btn-brutal">
            <span>Full Reel on YouTube</span>
            <span className="text-ember">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
