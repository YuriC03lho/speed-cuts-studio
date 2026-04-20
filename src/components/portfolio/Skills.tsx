import { useTranslation } from "react-i18next";
import { Scissors, Music2, Crosshair, Film } from "lucide-react";

const skills = [
  { icon: Scissors, name: "Edição", level: 95, desc: "Premiere · CapCut", size: "lg" },
  { icon: Music2, name: "Sound Design", level: 30, desc: "Foley · SFX · Mix", size: "md" },
  { icon: Crosshair, name: "GAME EDITS", level: 90, desc: "Sync · Beat drops", size: "lg" },
  { icon: Film, name: "Storytelling", level: 90, desc: "Ritmo · Narrativa", size: "md" },
];

export const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="relative py-24 md:py-40 bg-ink text-cream overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-radial-glow opacity-60 animate-drift-float" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div>
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-cream/40">{t("skills.section").split(" ")[0]} </span> 
              {t("skills.section").split(" ").slice(1).join(" ")}
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl">
              {t("skills.title")}
              <br />
              <span className="text-transparent bg-gradient-sunset bg-clip-text">
                {t("skills.titleHighlight")}
              </span>
            </h2>
          </div>
          <p className="mono-text text-xs uppercase tracking-widest text-cream/50 max-w-xs">
            {t("skills.tagline")}
          </p>
        </div>

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


                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
