"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen lg:min-h-[85vh] flex flex-col justify-end pb-12 pt-24 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-3">
          {/* Main hero card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="col-span-12 lg:col-span-8 grain relative rounded-2xl overflow-hidden min-h-[340px] sm:min-h-[480px]"
            style={{ background: "var(--card-dark)" }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-10"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-light), transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 opacity-5"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-light), transparent 70%)",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full opacity-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div className="relative z-10 flex flex-col justify-end h-full px-8 py-12 sm:p-12 min-h-[340px] sm:min-h-[480px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
                className="mb-4"
              >
                <span className="inline-block text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-amber-400/30 text-amber-400 mb-6">
                  · Rijeka, HR
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease }}
                className="font-display text-6xl sm:text-8xl text-white tracking-wide leading-none mb-6"
              >
                GRADNJA
                <br />
                <span style={{ color: "var(--accent-light)" }}>KOJA</span>
                <br />
                TRAJE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease }}
                className="text-stone-400 max-w-md text-sm leading-relaxed font-light"
              >
                Od temelja do završnih radova — gradimo i isporučujemo
                objekte koji odolijevaju testu vremena.
              </motion.p>
            </div>
          </motion.div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-4 flex flex-row lg:flex-col gap-3">
            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="flex-1 grain relative rounded-2xl overflow-hidden p-6 flex flex-col justify-between"
              style={{ background: "var(--accent)", minHeight: 200 }}
            >
              <div className="font-display text-4xl text-white/20 tracking-widest">
                25+
              </div>
              <div>
                <div className="font-display text-3xl text-white tracking-wide leading-tight mb-3">
                  GODINA
                  <br />
                  ISKUSTVA
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("kontakt")}
                  className="inline-flex items-center gap-2 bg-white text-stone-900 md:text-xs text-[10px] font-medium uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-stone-100 transition-colors"
                >
                  Zatražite ponudu <span>→</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="flex-1 grain relative rounded-2xl overflow-hidden p-6 border border-stone-200"
              style={{ minHeight: 200, background: "var(--card)" }}
            >
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-4">
                Naš doseg
              </div>
              <div className="space-y-3">
                {[
                  { label: "Završenih projekata", val: "50+" },
                  { label: "Direktan dogovor", val: "0 posrednika" },
                  { label: "Svaki projekt", val: "osobno" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-stone-500">{s.label}</span>
                    <span
                      className="font-display text-xl"
                      style={{ color: "var(--accent)" }}
                    >
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom certifications strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="col-span-12 grain rounded-2xl border border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4"
            style={{ background: "var(--card)" }}
          >
            <div className="text-xs uppercase tracking-widest text-stone-500">
              Certificirani i ovlašteni
            </div>
            <div className="flex flex-wrap gap-6 items-center">
              {[
                "ISO 9001:2015",
                "ISO 14001:2015",
                "OHSAS 18001",
                "HZN Ovlaštenje",
              ].map((c) => (
                <div key={c} className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <span className="text-xs text-stone-600 font-medium">
                    {c}
                  </span>
                </div>
              ))}
            </div>
            <motion.button
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={() => scrollTo("usluge")}
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1"
            >
              Istraži ↓
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
