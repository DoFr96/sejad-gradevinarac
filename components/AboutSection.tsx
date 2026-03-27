"use client";

import { motion, Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function AboutSection() {
  return (
    <section id="o-nama" className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="accent-line mb-3" />
          <h2 className="font-display text-5xl text-stone-900 tracking-wide mb-8">
            O NAMA
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-3"
        >
          {/* Main about card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 grain relative rounded-2xl p-8 sm:p-10 overflow-hidden"
            style={{ background: "var(--card-dark)" }}
          >
            <div
              className="absolute bottom-0 right-0 w-64 h-64 opacity-10"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-light), transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="font-display text-6xl text-amber-400/20 tracking-widest mb-4">
                S.A.M.
              </div>
              <p className="text-stone-300 text-sm leading-relaxed font-light mb-2">
                <span className="text-amber-400/60 text-xs uppercase tracking-widest">NKD 41.00</span>{" "}
                <span className="text-stone-400 text-xs">— Građenje stambenih i nestambenih zgrada</span>
              </p>
              <p className="text-stone-300 text-sm leading-relaxed font-light mb-4">
                S.A.M. Gradnja j.d.o.o. specijalizirana je za kompletne
                građevinske radove — od roh-bau faze do gotovog objekta.
                Zidanje, betoniranje, armiranje, fasaderski radovi i sve
                što dolazi između. Radimo brzo, čisto i po dogovoru.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed font-light">
                Sa sjedištem u Rijeci pokrivamo Primorsko-goransku županiju
                i šire. Vlasnik Sejad osobno vodi svaki projekt od početka
                do predaje — bez podizvođača, bez iznenađenja.
              </p>
              <div className="mt-6 flex gap-4 flex-wrap">
                {["Roh-bau", "Zidanje", "Betoniranje", "Fasade"].map((v) => (
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

          {/* Right column */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <motion.div
              variants={itemVariants}
              className="grain rounded-2xl p-6 border border-stone-200 flex-1"
              style={{ background: "var(--card)" }}
            >
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-4">
                Na\u0161 pristup
              </div>
              <div className="space-y-3">
                {[
                  {
                    step: "01",
                    text: "Slu\u0161amo i razumijemo va\u0161 projekt",
                  },
                  {
                    step: "02",
                    text: "Izra\u0111ujemo detaljan plan i tro\u0161kovnik",
                  },
                  {
                    step: "03",
                    text: "Gradimo uz dnevno izvje\u0161tavanje",
                  },
                  {
                    step: "04",
                    text: "Predajemo klju\u010Deve — bez iznena\u0111enja",
                  },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <span
                      className="font-display text-sm"
                      style={{ color: "var(--accent)" }}
                    >
                      {s.step}
                    </span>
                    <span className="text-sm text-stone-600 font-light">
                      {s.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grain rounded-2xl overflow-hidden"
              style={{ background: "var(--accent)", padding: "1.5rem" }}
            >
              <div className="text-xs uppercase tracking-widest text-white/70 mb-2">
                Direktno s vlasnikom
              </div>
              <div className="font-display text-3xl text-white tracking-wide">
                0 posrednika
              </div>
              <div className="text-sm text-white/80 font-light mt-1">
                dogovor, cijena i izvedba — sve na jednom mjestu
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
