// =============================================================
// EDITE AQUI os seus projetos de vídeo.
// - title: nome do projeto
// - cat: categoria (ex: Edit FPS, JDM, Comercial)
// - year: ano
// - runtime: duração no formato mm:ss
// - img: thumbnail (importe de src/assets ou use uma URL)
// - videoUrl: link do YouTube, Vimeo ou MP4 direto (abre ao clicar)
// - featured: true para ocupar 2 colunas no grid
// =============================================================

import fps1 from "@/assets/project-fps-1.jpg";
import fps2 from "@/assets/project-fps-2.jpg";
import drift from "@/assets/project-drift.jpg";
import commercial from "@/assets/project-commercial.jpg";
import music from "@/assets/project-music.jpg";
import travel from "@/assets/project-travel.jpg";

export interface Project {
  id: string;
  title: string;
  cat: string;
  year: string;
  runtime: string;
  img: string;
  videoUrl: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Apex Velocity",
    cat: "Edit FPS",
    year: "2025",
    img: fps1,
    runtime: "01:48",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "02",
    title: "Tokyo Drift Nights",
    cat: "JDM",
    year: "2025",
    img: drift,
    runtime: "02:34",
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "03",
    title: "Optic Vol. III",
    cat: "Comercial",
    year: "2024",
    img: commercial,
    runtime: "00:45",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "04",
    title: "Smoke & Iron",
    cat: "Edit FPS",
    year: "2024",
    img: fps2,
    runtime: "01:22",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "05",
    title: "Echoes In Motion",
    cat: "Videoclipe",
    year: "2024",
    img: music,
    runtime: "03:12",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "06",
    title: "Mountain Run",
    cat: "Travel",
    year: "2023",
    img: travel,
    runtime: "02:00",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];
