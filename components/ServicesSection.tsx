"use client";

import { motion, Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function ServicesSection() {
  return (
    <section id="usluge" className="py-16 px-4 sm:px-6">
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
              USLUGE
            </h2>
          </div>
          <p className="hidden sm:block text-sm text-stone-500 max-w-xs text-right font-light">
            Ne radimo sve — radimo dvije stvari, ali njih radimo bolje od ikoga
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-3"
        >
          {/* ROH-BAU — glavna usluga */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="grain relative rounded-2xl p-8 overflow-hidden"
            style={{ background: "var(--card-dark)", minHeight: 260 }}
          >
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-15"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-light), transparent 70%)",
              }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between gap-6">
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-3"
                  style={{ color: "var(--accent-light)" }}
                >
                  01 · Novogradnja
                </div>
                <h3 className="font-display text-4xl text-white tracking-wide mb-3">
                  ROH-BAU
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed font-light max-w-md">
                  Gruba građevinska faza od nule — temelji, betoniranje,
                  armiranje, nosivi zidovi, stropovi i krovna konstrukcija. Sve
                  što kuća mora imati da stoji sto godina, izvedeno precizno i
                  po pravilima struke.
                </p>
              </div>
              <div className="flex gap-4 flex-wrap">
                {["Temelji", "Betoniranje", "Armiranje", "Zidanje"].map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-xs uppercase tracking-widest text-stone-400">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RENOVACIJA STARIH KUĆA — glavna usluga */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="grain relative rounded-2xl p-8 overflow-hidden"
            style={{ background: "var(--accent)", minHeight: 260 }}
          >
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 bg-white rounded-full blur-3xl" />
            <div className="relative z-10 h-full flex flex-col justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/70 mb-3">
                  02 · Postojeći objekti
                </div>
                <h3 className="font-display text-4xl text-white tracking-wide mb-3">
                  RENOVACIJA STARIH KUĆA
                </h3>
                <p className="text-sm text-white/85 leading-relaxed font-light max-w-md">
                  Stare kuće su naša specijalnost. Sanacija temelja i zidova,
                  rušenje i ponovna izgradnja dotrajalih dijelova, nove ploče i
                  konstrukcije — vraćamo starim kućama čvrstoću i život, a
                  zadržavamo im dušu.
                </p>
              </div>
              <div className="flex gap-4 flex-wrap">
                {["Sanacija", "Rušenje", "Dogradnja", "Rekonstrukcija"].map(
                  (v) => (
                    <div key={v} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="text-xs uppercase tracking-widest text-white/80">
                        {v}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          {/* Što sve ulazi u posao */}
          <motion.div
            variants={itemVariants}
            className="grain rounded-2xl p-8 border border-stone-200"
            style={{ background: "var(--card)" }}
          >
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-5">
              Što sve radimo unutar toga
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                "Iskopi i temelji",
                "Betonski radovi",
                "Armirački radovi",
                "Zidarski radovi",
                "Betonske ploče i stropovi",
                "Sanacija vlage i zidova",
                "Rušenja i demontaže",
                "Priprema za završne radove",
              ].map((v) => (
                <div key={v} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  <span className="text-sm text-stone-600 font-light">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA dark card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="grain relative rounded-2xl overflow-hidden p-8"
            style={{ background: "var(--card-dark)", minHeight: 180 }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-20"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-light), transparent 70%)",
              }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between gap-6">
              <div className="font-display text-3xl text-white tracking-wide">
                IMATE STARU KUĆU
                <br />
                ILI GRADITE NOVU?
              </div>
              <div>
                <p className="text-stone-400 text-sm mb-4 font-light">
                  Dođemo, pogledamo i kažemo vam iskreno što treba — i koliko
                  košta. Konzultacije su besplatne.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("kontakt")}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium px-4 py-2 rounded-full border transition-all hover:text-stone-900 hover:bg-amber-400 hover:border-amber-400"
                  style={{
                    borderColor: "var(--accent)",
                    color: "var(--accent-light)",
                  }}
                >
                  Razgovarajmo →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
