import { useTranslation } from "react-i18next";
import heroPoster from "@/assets/hero-poster.jpg";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-ink text-cream flex flex-col"
    >
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-driving-on-the-highway-at-sunset-2633/1080p.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ember/30 via-transparent to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-radial-glow opacity-50" />
      </div>

      <div className="relative z-10 container pt-32 md:pt-36">
        <div className="flex flex-wrap items-center justify-between gap-4 mono-text text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/70">
          <div className="flex items-center gap-3">
            <span className="rec-dot" />
            <span>{t("hero.playing")} — REELS</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>{t("hero.location")}</span>
            <span className="text-ember">●</span>
            <span>{t("hero.available")}</span>
          </div>
          <div>00:01:24:12</div>
        </div>
      </div>

      <div className="relative z-10 container flex-1 flex flex-col justify-center py-16">
        <div className="max-w-[1400px]">
          <p className="mono-text text-xs md:text-sm uppercase tracking-[0.4em] text-peach mb-6 reveal">
            Portfólio / Vol. 01
          </p>

          <h1 className="display-text text-cream glitch text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[11rem] 2xl:text-[14rem] leading-[0.82] reveal">
            YURI
            <br />
            <span className="text-transparent bg-gradient-sunset bg-clip-text">COELHO</span>
          </h1>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 reveal">
            <div>
              <p className="mono-text text-sm md:text-base uppercase tracking-[0.3em] text-cream/90">
                {t("hero.role")}
              </p>
              <p className="mt-2 mono-text text-xs uppercase tracking-widest text-cream/50">
                {t("hero.marquee")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn-brutal !border-cream !text-cream !bg-transparent">
                <span>{t("hero.viewProjects")}</span>
                <span>→</span>
              </a>
              <a href="#about" className="mono-text text-xs uppercase tracking-widest text-cream/70 hover:text-ember transition-colors flex items-center gap-2">
                {t("hero.aboutMe")}
                <span className="text-ember">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container pb-10">
        <div className="flex items-end justify-between gap-6">
          <div className="mono-text text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/50 max-w-xs">
            {t("hero.tagline")}
          </div>
          <div className="hidden md:block mono-text text-xs uppercase tracking-[0.3em] text-cream/50 text-right">
            <div className="flex items-center gap-2 justify-end">
              <span>Role</span>
              <span className="block w-12 h-px bg-cream/50" />
            </div>
          </div>
        </div>
      </div>

      <Tick className="top-24 left-4" />
      <Tick className="top-24 right-4" />
      <Tick className="bottom-4 left-4" />
      <Tick className="bottom-4 right-4" />
    </section>
  );
};

const Tick = ({ className = "" }) => (
  <div className={`absolute z-10 w-6 h-6 ${className}`} aria-hidden>
    <span className="absolute top-0 left-0 w-full h-px bg-cream/40" />
    <span className="absolute top-0 left-0 w-px h-full bg-cream/40" />
  </div>
);
