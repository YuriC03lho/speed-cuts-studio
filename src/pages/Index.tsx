import { useEffect } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Social } from "@/components/portfolio/Social";
import { Footer } from "@/components/portfolio/Footer";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();

  useEffect(() => {
    document.title = "Yuri Coelho — Video Editor · Portfolio";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Yuri Coelho — Video editor portfolio. Cinematic edits, FPS montages, motion graphics, sound design and color grading."
    );
    if (!meta.parentElement) document.head.appendChild(meta);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee
        items={["Drift", "Cut", "Grade", "Sound", "Motion", "Story", "Velocity"]}
        variant="ember"
      />
      <About />
      <Marquee
        items={["FPS Edits", "JDM Cinema", "Commercial", "Music Video", "Brand Films"]}
        reverse
        variant="default"
      />
      <Skills />
      <Projects />
      <Marquee
        items={["Available 2025", "Open for collabs", "Hire", "Let's create", "@yuri.edits"]}
        variant="dark"
      />
      <Social />
      <Footer />
    </main>
  );
};

export default Index;
