"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/* ─────────────────────────────────────────────────────────────
   MEDIJI S GRADILIŠTA
   Slike idu u  public/projects/  a videi u  public/videos/
   Slobodno promijeni naslove i opise — samo pazi da se
   nazivi datoteka poklapaju s onima u public mapi.

   ŠTO JE POPRAVLJENO:
   1) Lightbox više NE renderira svih 8 slika odjednom kao
      <Image fill priority>. To je bio uzrok da se dio slika
      ne učita — 8 istovremenih "priority" zahtjeva zaguši
      Next-ov image optimizer i dio otkaže. Sada se prikazuje
      SAMO trenutna slika (obični <img>), a susjedne se tiho
      predučitaju u cache pa je listanje i dalje trenutno.
   2) U gridu je "priority" samo na PRVOJ kartici; ostale se
      lijeno učitavaju kad dođu u vidokrug.
   ───────────────────────────────────────────────────────────── */

type MediaItem = { kind: "image" | "video"; src: string };

type Project = {
  id: number;
  title: string;
  type: string;
  year: string;
  fallback: string;
  span?: string;
  /* Za projekte s vertikalnim (9:16) slikama — kartica ih
     prikazuje dvije jednu pored druge preko cijele širine */
  portraitPair?: boolean;
  media: MediaItem[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Izgradnja novogradnje - stanovi",
    type: "Novogradnja",
    year: "2025",
    fallback: "from-stone-600 to-stone-800",
    span: "lg:col-span-2",
    media: [
      { kind: "image", src: "/projects/stara-kuca-1.jpg" },
      { kind: "image", src: "/projects/stara-kuca-2.jpg" },
    ],
  },
  {
    id: 2,
    title: "Roh-bau — temelji",
    type: "Roh-bau",
    year: "2025",
    fallback: "from-amber-800 to-stone-900",
    span: "lg:col-span-1",
    media: [
      { kind: "video", src: "/videos/gradiliste-2.mp4" },
      { kind: "video", src: "/videos/gradiliste-22.mp4" },
    ],
  },
  {
    id: 3,
    title: "Zidanje",
    type: "Roh-bau",
    year: "2026",
    fallback: "from-stone-700 to-stone-900",
    span: "lg:col-span-1",
    media: [{ kind: "video", src: "/videos/gradiliste-5.mp4" }],
  },
  {
    id: 4,
    title: "Radovi u tijeku",
    type: "S terena",
    year: "2026",
    fallback: "from-stone-500 to-amber-900",
    span: "lg:col-span-2",
    media: [{ kind: "video", src: "/videos/gradiliste-4.mp4" }],
  },
  {
    id: 6,
    title: "Obiteljska kuća — temelji do krova",
    type: "Roh-bau",
    year: "2025",
    fallback: "from-stone-800 to-stone-950",
    span: "sm:col-span-2 lg:col-span-3",
    media: [
      { kind: "image", src: "/projects/projekt-6a1.jpg" },
      { kind: "image", src: "/projects/projekt-6a2.jpg" },
      { kind: "image", src: "/projects/projekt-6a3.jpg" },
      { kind: "image", src: "/projects/projekt-6a4.jpg" },
      { kind: "image", src: "/projects/projekt-6a5.jpg" },
      { kind: "image", src: "/projects/projekt-6a6.jpg" },
      { kind: "image", src: "/projects/projekt-6a7.jpg" },
      { kind: "image", src: "/projects/projekt-6a8.jpg" },
    ],
  },
];

/* ───────────────────────── Lightbox ───────────────────────── */

function Lightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [errored, setErrored] = useState<Set<number>>(new Set());
  const n = project.media.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + n) % n), [n]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % n), [n]);

  /* Tipkovnica + zaključavanje scrolla iza modala */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  /* Predučitaj SAMO susjedne slike (prethodnu i sljedeću) u
     browser cache. Zato je listanje trenutno, a NE šaljemo
     svih 8 zahtjeva odjednom (to je bilo ono što je pucalo). */
  useEffect(() => {
    if (n < 2) return;
    [(current + 1) % n, (current - 1 + n) % n].forEach((i) => {
      const m = project.media[i];
      if (m?.kind === "image") {
        const img = new window.Image();
        img.src = m.src;
      }
    });
  }, [current, n, project.media]);

  const media = project.media[current];
  const isErrored = errored.has(current);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop — zamućena stranica iza */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6">
        <div>
          <div
            className="text-xs uppercase tracking-widest mb-0.5"
            style={{ color: "var(--accent-light)" }}
          >
            {project.type} · {project.year}
          </div>
          <div className="font-display text-lg sm:text-xl text-white tracking-wide">
            {project.title}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Zatvori"
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      {/* Glavni medij — prikazuje se SAMO trenutni.
          Za slike koristimo obični <img> (bez Next optimizera i
          bez "fill" stackanja) — tako se uvijek pouzdano učita.
          9:16 ostaje 9:16 jer je object-contain. */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4 sm:mx-8 h-[72vh] sm:h-[78vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {media.kind === "video" ? (
          <video
            key={media.src}
            src={media.src}
            className="max-h-full max-w-full object-contain"
            controls
            autoPlay
            playsInline
          />
        ) : isErrored ? (
          <div
            className={`flex items-center justify-center w-64 h-40 rounded-xl bg-gradient-to-br ${project.fallback} text-white/80 text-sm text-center px-4`}
          >
            Slika se ne može učitati:
            <br />
            {media.src}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={media.src}
            src={media.src}
            alt={`${project.title} — ${current + 1}`}
            className="max-h-full max-w-full object-contain select-none"
            draggable={false}
            onError={() => setErrored((s) => new Set(s).add(current))}
          />
        )}

        {/* Strelice */}
        {n > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Prethodna"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Sljedeća"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Točkice */}
      {n > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {project.media.map((_, i) => (
            <button
              key={i}
              aria-label={`Idi na ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === current
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ───────────────────────── Project Card ───────────────────────── */

function ProjectCard({
  project,
  priority,
  onOpen,
}: {
  project: Project;
  priority: boolean;
  onOpen: () => void;
}) {
  const [errored, setErrored] = useState<Set<number>>(new Set());
  const cover = project.media[0];
  const videoCount = project.media.filter((m) => m.kind === "video").length;

  const addError = (idx: number) => setErrored((s) => new Set(s).add(idx));

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${project.span ?? ""}`}
    >
      {project.portraitPair ? (
        /* ── Dvije vertikalne (9:16) slike jedna pored druge ── */
        <div className="relative w-full grid grid-cols-2">
          {project.media.slice(0, 2).map((m, i) => (
            <div key={i} className="relative" style={{ paddingBottom: "115%" }}>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.fallback}`}
              />
              {!errored.has(i) && (
                <Image
                  src={m.src}
                  alt={`${project.title} - ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  onError={() => addError(i)}
                />
              )}
            </div>
          ))}
          <div className="absolute inset-y-0 left-1/2 w-px bg-black/30 -translate-x-1/2" />
        </div>
      ) : (
        /* ── Standardna 16:9 kartica — prikazuje se SAMO naslovnica ── */
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.fallback}`}
          />
          {!errored.has(0) &&
            (cover.kind === "video" ? (
              <video
                src={cover.src}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => addError(0)}
              />
            ) : (
              <Image
                src={cover.src}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                priority={priority}
                onError={() => addError(0)}
              />
            ))}
        </div>
      )}

      {/* Overlay + naslov + badgevi */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5 sm:p-6">
        <div
          className="text-xs uppercase tracking-widest mb-1"
          style={{ color: "var(--accent-light)" }}
        >
          {project.type} · {project.year}
        </div>
        <div className="font-display text-xl sm:text-2xl text-white tracking-wide leading-tight">
          {project.title}
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white text-sm">
          ↗
        </div>
      </div>

      {/* Video badge */}
      {videoCount > 0 && (
        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white text-xs flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
          Video
        </div>
      )}
      {/* Broj slika (kartice samo sa slikama) */}
      {videoCount === 0 && project.media.length > 1 && (
        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white text-xs flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
          </svg>
          {project.media.length}
        </div>
      )}
    </motion.div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projekti" className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <div className="accent-line mb-3" />
            <h2 className="font-display text-5xl text-stone-900 tracking-wide">
              S GRADILIŠTA
            </h2>
          </div>
          <p className="hidden sm:block text-sm text-stone-500 max-w-xs text-right font-light">
            Stvarni radovi, stvarne kuće — slikano i snimano na našim
            gradilištima
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              priority={i === 0}
              onOpen={() => setActiveProject(p)}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeProject && (
          <Lightbox
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
