import { useState, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Play, X, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const VideoPlayer = ({ current, isActive }: { current: any; isActive: boolean }) => {
  const [shouldRenderIframe, setShouldRenderIframe] = useState(isActive);
  
  const { src, type } = useMemo(() => {
    let url = current.videoUrl;
    const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    if (yt) return { src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`, type: "iframe" };
    const vimeo = url.match(/vimeo\.com\/(\d+)/);
    if (vimeo) return { src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`, type: "iframe" };
    const ig = url.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
    if (ig) return { src: `https://www.instagram.com/p/${ig[1]}/embed/`, type: "iframe" };
    return { src: url, type: "video" };
  }, [current.videoUrl]);

  useEffect(() => {
    if (isActive) {
      if (!shouldRenderIframe) {
        const timer = setTimeout(() => setShouldRenderIframe(true), 450);
        return () => clearTimeout(timer);
      }
    } else {
      setShouldRenderIframe(false);
    }
  }, [isActive, shouldRenderIframe]);

  return (
    <>
      <div className={`absolute inset-0 w-full h-full ${shouldRenderIframe ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {shouldRenderIframe && (
          type === "iframe" ? (
            <iframe
              src={src}
              title={current.title}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <video src={src} controls autoPlay className="w-full h-full" />
          )
        )}
      </div>
      <div className={`absolute inset-0 flex items-center justify-center bg-ink ${!shouldRenderIframe ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        <img src={current.img} alt={current.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream/95 flex items-center justify-center shadow-warm">
          <Play className="w-7 h-7 md:w-8 md:h-8 text-ink fill-ink ml-1" />
        </div>
      </div>
    </>
  );
};

export const Projects = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | string[] | null>(null);

  const currentList = useMemo(() => {
    return Array.isArray(active) 
      ? active.map(id => projects.find(p => p.id === id)).filter(Boolean) as typeof projects
      : active 
        ? [projects.find(p => p.id === active)].filter(Boolean) as typeof projects 
        : [];
  }, [active]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [active]);

  useEffect(() => {
    if (currentList.length <= 1) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentIndex(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { threshold: 0.6 }
    );

    const elements = document.querySelectorAll(".video-snap-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const handleOpenVideo = (e: CustomEvent<string>) => {
      if (e.detail.includes(',')) {
        setActive(e.detail.split(','));
      } else {
        setActive(e.detail);
      }
    };
    window.addEventListener("open-video", handleOpenVideo as EventListener);
    return () => window.removeEventListener("open-video", handleOpenVideo as EventListener);
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-40 bg-cream">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal">
          <div>
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-foreground/40">{t("projects.section").split(" ")[0]} </span> 
              {t("projects.section").split(" ").slice(1).join(" ")}
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl">
              {t("projects.title")}
              <br />
              <span className="text-ember">{t("projects.titleHighlight")}</span>
            </h2>
          </div>
          <div className="mono-text text-xs uppercase tracking-widest text-foreground/60 flex items-center gap-3">
            <span className="rec-dot" />
            <span>{t("projects.tagline")}</span>
          </div>
        </div>

        {/* Grid: 2 on top, 3 below */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {projects.map((p, i) => {
            // First 2: col-span-6 | Next 3: col-span-4
            const span = i < 2 
              ? "col-span-12 md:col-span-6" 
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
                        {t("projects.watch")} →
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Lightbox */}
      {currentList.length > 0 && (
        <div
          className="fixed inset-0 z-[200] bg-ink animate-fade-in-up overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Fechar"
            className="fixed top-4 right-4 md:top-6 md:right-6 w-12 h-12 border-2 border-cream text-cream flex items-center justify-center hover:bg-ember hover:border-ember transition-colors z-[210] bg-ink"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col w-full min-h-screen gap-[5dvh] py-[5dvh]">
            {currentList.map((current, index) => {
              const isActive = index === currentIndex;
              
              return (
              <div 
                key={current.id + index}
                data-index={index}
                className="video-snap-item w-full h-[85dvh] snap-center snap-always flex items-center justify-center flex-shrink-0 px-4 md:px-10 relative"
                onClick={() => setActive(null)}
              >
                <div
                  className={`relative w-full h-full transition-all duration-500 bg-black ${
                    current.isVertical 
                      ? "max-w-[420px] max-h-[85dvh]" 
                      : "max-w-6xl max-h-[85dvh] aspect-video object-contain flex items-center justify-center"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <VideoPlayer current={current} isActive={isActive} />

                  {current.originLink && (
                    <a
                      href={current.originLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-ink border border-cream/20 text-cream px-3 py-2 text-[10px] uppercase tracking-widest mono-text hover:border-ember hover:text-ember transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Ver Original</span>
                    </a>
                  )}

                  <div className={`absolute -bottom-12 left-0 right-0 flex items-center justify-between mono-text text-xs uppercase tracking-widest text-cream/70 ${current.isVertical ? 'px-4' : ''}`}>
                    <span>
                      <span className="text-ember">/ {current.id}</span> · {current.title}
                    </span>
                    <span>{current.cat} · {current.year} · {current.runtime}</span>
                  </div>
                </div>
                
                {currentList.length > 1 && index < currentList.length - 1 && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 mono-text text-[10px] uppercase tracking-widest text-cream/40">
                    ↓ Role para o próximo
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>
      )}
    </section>
  );
};
