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

const projects = [
  {
    id: 1,
    title: "Stambeni kompleks Savica",
    type: "Stambeno",
    year: "2024",
    fallback: "from-stone-600 to-stone-800",
    span: "lg:col-span-2",
    images: [
      "/projects/zgrada1.jpg",
      "/projects/zgrada1.jpg",
      "/projects/zgrada1.jpg",
    ],
  },
  {
    id: 2,
    title: "Poslovna zgrada Jankomir",
    type: "Poslovni",
    year: "2023",
    fallback: "from-amber-800 to-stone-900",
    span: "lg:col-span-1",
    images: [
      "/projects/temelji1.jpg",
      "/projects/temelji1.jpg",
      "/projects/temelji1.jpg",
    ],
  },
  {
    id: 3,
    title: "Sportski centar Sesvete",
    type: "Sport & Rekreacija",
    year: "2023",
    fallback: "from-stone-700 to-stone-900",
    span: "lg:col-span-1",
    images: [
      "/projects/img44.jpg",
      "/projects/img44.jpg",
      "/projects/img44.jpg",
    ],
  },
  {
    id: 4,
    title: "Rekonstrukcija \u017Dupne crkve",
    type: "Kulturna ba\u0161tina",
    year: "2022",
    fallback: "from-stone-500 to-amber-900",
    span: "lg:col-span-2",
    images: [
      "/projects/img20.jpg",
      "/projects/img20.jpg",
      "/projects/img20.jpg",
    ],
  },
];

type Project = (typeof projects)[number];

/* ───────────────────────── Lightbox ───────────────────────── */

function Lightbox({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const prev = useCallback(
    () =>
      setCurrent(
        (c) => (c - 1 + project.images.length) % project.images.length,
      ),
    [project.images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % project.images.length),
    [project.images.length],
  );

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

  const handleImgError = (idx: number) =>
    setImgErrors((s) => new Set(s).add(idx));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6">
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
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>

      {/* Main image */}
      <div
        className="relative z-10 w-full max-w-5xl mx-4 sm:mx-8"
        style={{ aspectRatio: "16/10" }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 rounded-xl overflow-hidden"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.fallback}`}
            />
            {!imgErrors.has(current) && (
              <Image
                src={project.images[current]}
                alt={`${project.title} - ${current + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 95vw, 1024px"
                onError={() => handleImgError(current)}
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {project.images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
          {project.images.map((_, i) => (
            <button
              key={i}
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
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${project.span ?? ""}`}
    >
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.fallback}`}
        />
        {!imgError && (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
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
        {/* Image count badge */}
        {project.images.length > 1 && (
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white text-xs flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
            </svg>
            {project.images.length}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Section ───────────────────────── */

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      projects.forEach((project) => {
        project.images.forEach((src) => {
          const img = new window.Image();
          img.src = src;
        });
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
              PROJEKTI
            </h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:block text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
          >
            Svi projekti →
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
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
