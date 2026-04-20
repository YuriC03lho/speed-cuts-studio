// =============================================================
// EDITE AQUI os seus projetos de vídeo.
// - title: nome do projeto
// - cat: categoria (ex: GAME EDITS, CINEMATICS, GAMEPLAYS)
// - year: ano
// - runtime: duração no formato mm:ss
// - img: thumbnail (importe de src/assets ou use uma URL)
// - videoUrl: link do YouTube, Vimeo ou MP4 direto (abre ao clicar)
// - featured: true para ocupar 2 colunas no grid
// =============================================================

export interface Project {
  id: string;
  title: string;
  cat: string;
  year: string;
  runtime: string;
  img: string;
  videoUrl: string;
  featured?: boolean;
  isVertical?: boolean;
  originLink?: string;
}

export const projects: Project[] = [
  {
    id: "05",
    title: "VOCÊ SABE COMO ESSE CARA MORREU?",
    cat: "CINEMATICS",
    year: "2025",
    img: "https://i.ytimg.com/vi/nafJ_gAr384/maxresdefault.jpg",
    runtime: "00:49",
    videoUrl: "https://youtube.com/shorts/nafJ_gAr384",
    isVertical: true,
    featured: true,
  },
  {
    id: "01",
    title: "Ｓ　Ｈ　Ｉ　Ｐ",
    cat: "GAME EDITS",
    year: "2026",
    img: "https://i.ytimg.com/vi/T1v5EE5IJco/maxresdefault.jpg",
    runtime: "00:58",
    videoUrl: "https://www.youtube.com/watch?v=T1v5EE5IJco",
  },
  {
    id: "03",
    title: "atirando em aviões com caça tanque",
    cat: "GAMEPLAYS",
    year: "2025",
    img: "https://i.ytimg.com/vi/CUE7iz59-Wk/maxresdefault.jpg",
    runtime: "00:34",
    videoUrl: "https://youtu.be/CUE7iz59-Wk",
    isVertical: true,
  },
  {
    id: "02",
    title: "Ｂ　Ｏ　Ｄ　Ｙ　Ｃ　Ａ　Ｍ",
    cat: "GAME EDITS",
    year: "2026",
    img: "https://i.ytimg.com/vi/LyZqeF2iINc/maxresdefault.jpg",
    runtime: "01:48",
    videoUrl: "https://www.youtube.com/watch?v=LyZqeF2iINc",
  },
  {
    id: "04",
    title: "Barra Clean",
    cat: "REELS",
    year: "2025",
    img: "https://i.ytimg.com/vi/Mkds88PW6IM/maxresdefault.jpg",
    runtime: "00:24",
    videoUrl: "/videos/barra_clean.mp4",
    isVertical: true,
    originLink: "https://www.instagram.com/p/DRuY-P4DW4l/",
  },
];
