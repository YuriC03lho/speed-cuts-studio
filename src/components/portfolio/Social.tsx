import { Youtube, Instagram, Twitch, Music } from "lucide-react";

const socials = [
  { name: "YouTube", handle: "@yuricoelho", followers: "48.2K", icon: Youtube, href: "#", color: "from-ember to-ember-glow" },
  { name: "Instagram", handle: "@yuri.edits", followers: "32.7K", icon: Instagram, href: "#", color: "from-peach to-ember" },
  { name: "TikTok", handle: "@yuricuts", followers: "120K", icon: Music, href: "#", color: "from-ember-glow to-peach-light" },
  { name: "Twitch", handle: "yuriclips", followers: "8.4K", icon: Twitch, href: "#", color: "from-ember to-peach" },
];

export const Social = () => {
  return (
    <section id="social" className="relative py-24 md:py-40 bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-40" />

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 reveal">
          <p className="mono-text text-xs uppercase tracking-[0.4em] text-ember mb-6">
            <span className="text-cream/40">05 /</span> Let's Connect
          </p>
          <h2 className="display-text text-5xl md:text-7xl lg:text-8xl mb-8">
            Follow the
            <br />
            <span className="text-transparent bg-gradient-sunset bg-clip-text">
              rhythm.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-cream/70 max-w-xl mx-auto">
            New cuts, behind-the-scenes and full reels — every week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {socials.map((s, i) => (
            <a
              key={s.name}
              href={s.href}
              className="reveal group relative block bg-ink-soft border border-cream/10 p-6 md:p-8 hover:border-ember transition-all duration-300 hover:-translate-y-2"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative flex flex-col h-full">
                <div className="flex items-start justify-between mb-12">
                  <s.icon className="w-9 h-9 text-ember" strokeWidth={1.5} />
                  <span className="mono-text text-xs text-cream/40">0{i + 1}</span>
                </div>

                <div className="flex-1">
                  <p className="mono-text text-[10px] uppercase tracking-widest text-cream/40 mb-1">
                    {s.handle}
                  </p>
                  <h3 className="display-text text-3xl md:text-4xl mb-4 group-hover:text-ember transition-colors">
                    {s.name}
                  </h3>
                </div>

                <div className="flex items-end justify-between pt-6 border-t border-cream/10">
                  <div>
                    <div className="display-text text-2xl">{s.followers}</div>
                    <div className="mono-text text-[10px] uppercase tracking-widest text-cream/40">
                      followers
                    </div>
                  </div>
                  <span className="mono-text text-sm text-ember group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Email CTA */}
        <div className="mt-20 text-center reveal">
          <p className="mono-text text-xs uppercase tracking-widest text-cream/50 mb-4">
            For collaborations
          </p>
          <a
            href="mailto:hello@yuricoelho.com"
            className="display-text text-3xl md:text-5xl lg:text-6xl text-cream hover:text-ember transition-colors glitch inline-block"
          >
            hello@yuricoelho.com
          </a>
        </div>
      </div>
    </section>
  );
};
