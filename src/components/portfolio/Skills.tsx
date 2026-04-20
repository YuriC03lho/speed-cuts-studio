import { Scissors, Music2, Palette, Wand2, Crosshair, Film } from "lucide-react";

const skills = [
  { icon: Scissors, name: "Editing", level: 95, desc: "Premiere · DaVinci · CapCut", size: "lg" },
  { icon: Palette, name: "Color Grading", level: 90, desc: "DaVinci Resolve", size: "md" },
  { icon: Music2, name: "Sound Design", level: 85, desc: "Foley · SFX · Mix", size: "md" },
  { icon: Wand2, name: "Motion Graphics", level: 80, desc: "After Effects", size: "md" },
  { icon: Crosshair, name: "FPS Edits", level: 92, desc: "Sync · Beat drops · VFX", size: "lg" },
  { icon: Film, name: "Storytelling", level: 88, desc: "Pacing · Narrative", size: "md" },
];

export const Skills = () => {
  return (
    <section id="skills" className="relative py-24 md:py-40 bg-ink text-cream overflow-hidden">
      {/* Drift gradient blob */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-radial-glow opacity-60 animate-drift-float" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div>
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-cream/40">03 /</span> Skills · Toolkit
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl">
              Built for
              <br />
              <span className="text-transparent bg-gradient-sunset bg-clip-text">
                speed & feel.
              </span>
            </h2>
          </div>
          <p className="mono-text text-xs uppercase tracking-widest text-cream/50 max-w-xs">
            Six disciplines, one signature. Every project is an exercise in pacing.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {skills.map((s, i) => {
            const span =
              s.size === "lg"
                ? "col-span-12 md:col-span-6"
                : "col-span-12 sm:col-span-6 md:col-span-4";
            return (
              <div
                key={s.name}
                className={`${span} reveal group`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="relative h-full bg-ink-soft border border-cream/10 p-6 md:p-8 hover:border-ember transition-colors">
                  {/* corner ember */}
                  <span className="absolute top-0 right-0 w-2 h-2 bg-ember" />

                  <div className="flex items-start justify-between mb-6">
                    <s.icon className="w-8 h-8 md:w-10 md:h-10 text-ember" strokeWidth={1.5} />
                    <span className="mono-text text-xs text-cream/40">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="display-text text-3xl md:text-4xl mb-2 group-hover:text-ember transition-colors">
                    {s.name}
                  </h3>
                  <p className="mono-text text-xs uppercase tracking-wider text-cream/50 mb-6">
                    {s.desc}
                  </p>

                  {/* Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between mono-text text-[10px] uppercase tracking-widest text-cream/40">
                      <span>Mastery</span>
                      <span>{s.level}%</span>
                    </div>
                    <div className="h-1 bg-cream/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-sunset origin-left transition-transform duration-1000 ease-out scale-x-0 group-[.is-visible]:scale-x-100"
                        style={{ width: `${s.level}%`, transitionDelay: `${300 + i * 80}ms` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
