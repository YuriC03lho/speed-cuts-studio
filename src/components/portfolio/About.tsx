import portrait from "@/assets/about-portrait.jpg";

export const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-40 bg-cream">
      <div className="container grid grid-cols-12 gap-6 lg:gap-12">
        {/* Left visual */}
        <div className="col-span-12 lg:col-span-6 relative reveal">
          <div className="relative aspect-[4/5] max-w-[520px] mx-auto lg:mx-0">
            <div className="absolute -inset-3 bg-ember translate-x-3 translate-y-3" />
            <img
              src={portrait}
              alt="Portrait of Yuri Coelho in studio"
              loading="lazy"
              width={1024}
              height={1280}
              className="relative w-full h-full object-cover grayscale-[20%] contrast-110"
            />
            {/* Frame ticks */}
            <div className="absolute top-2 left-2 mono-text text-[10px] uppercase tracking-widest text-cream bg-ink/80 px-2 py-1">
              FRAME 047
            </div>
            <div className="absolute bottom-2 right-2 mono-text text-[10px] uppercase tracking-widest text-cream bg-ink/80 px-2 py-1">
              ISO 800 · 35mm
            </div>
          </div>
        </div>

        {/* Right text */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
          <div className="reveal">
            <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
              <span className="text-foreground/40">02 /</span> About Me
            </p>
            <h2 className="display-text text-5xl md:text-7xl lg:text-8xl mb-8">
              Cuts that
              <br />
              <span className="text-ember">feel alive.</span>
            </h2>

            <div className="space-y-5 max-w-xl text-lg md:text-xl leading-relaxed text-foreground/80">
              <p>
                I'm Yuri — a video editor obsessed with rhythm, color, and the
                tension between silence and impact. My work blends cinematic
                storytelling with the raw energy of FPS edits and JDM motion.
              </p>
              <p className="text-foreground/60">
                Every cut is intentional. Every frame is a frame I'd watch twice.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "120+", l: "Projects" },
                { n: "06", l: "Years" },
                { n: "04", l: "Awards" },
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
