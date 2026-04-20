import { useTranslation } from "react-i18next";
import portrait from "@/assets/portrait-new.jpg";

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative py-24 md:py-40 bg-cream">
      <div className="container grid grid-cols-12 gap-6 lg:gap-12">
        <div className="col-span-12 lg:col-span-6 relative reveal">
          <div className="relative aspect-[4/5] max-w-[520px] mx-auto lg:mx-0">
            <div className="absolute -inset-3 bg-ember translate-x-3 translate-y-3" />
            <img
              src={portrait}
              alt="Retrato de Yuri Coelho no estúdio"
              loading="lazy"
              width={1024}
              height={1280}
              className="relative w-full h-full object-cover grayscale-[20%] contrast-110"
            />
            <div className="absolute top-2 left-2 mono-text text-[10px] uppercase tracking-widest text-cream bg-ink/80 px-2 py-1">
              FRAME 047
            </div>
            <div className="absolute bottom-2 right-2 mono-text text-[10px] uppercase tracking-widest text-cream bg-ink/80 px-2 py-1">
              ISO 800 · 35mm
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
          <div className="reveal">
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-foreground/40">{t("about.section").split(" ")[0]} </span> 
              {t("about.section").split(" ").slice(1).join(" ")}
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl mb-8">
              {t("about.title")}
              <br />
              <span className="text-ember">{t("about.titleHighlight")}</span>
            </h2>

            <div className="space-y-5 max-w-xl text-lg md:text-xl leading-relaxed text-foreground/80">
              <p>
                {t("about.p1").split(/(iniciante|beginner)/i).map((part, i) => 
                  part.toLowerCase() === "iniciante" || part.toLowerCase() === "beginner" ? (
                    <span key={i} className="text-ember font-bold">{part}</span>
                  ) : (
                    part
                  )
                )}
              </p>
              <p className="text-foreground/60">{t("about.p2")}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 max-w-[280px]">
              {[
                { n: "05", l: t("about.stats.projects") },
                { n: "02", l: t("about.stats.years") },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-ember pl-4">
                  <div className="display-text text-3xl md:text-4xl">{s.n}</div>
                  <div className="mono-text text-[10px] uppercase tracking-widest text-foreground/60 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
