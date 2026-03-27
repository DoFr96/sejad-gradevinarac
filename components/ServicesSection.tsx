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

const services = [
  {
    icon: "🏢",
    title: "VISOKOGRADNJA",
    desc: "Stambeni i poslovni objekti od temelja do krova. Zidanje, betoniranje, armiranje — sve iz vlastitog tima.",
  },
  {
    icon: "🔧",
    title: "REKONSTRUKCIJA",
    desc: "Adaptacije, dogradnje i kompletne rekonstrukcije postojećih objekata. Vraćamo zgrade u život.",
  },
  {
    icon: "🧱",
    title: "ROH-BAU",
    desc: "Gruba građevinska faza — temelji, nosive konstrukcije, zidovi, stropovi. Solidna baza za sve što dolazi.",
  },
  {
    icon: "🏗️",
    title: "FASADE",
    desc: "Postavljanje fasadnih sustava, toplinska izolacija i završna obrada. Estetika i energetska učinkovitost.",
  },
];

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
            Kompletan raspon građevinskih usluga pod jednim krovom
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="grain relative rounded-2xl p-6 border border-stone-200 bg-stone-50 overflow-hidden"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display text-2xl text-stone-900 tracking-wide mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed font-light">
                {s.desc}
              </p>
            </motion.div>
          ))}

          {/* CTA dark card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="grain relative rounded-2xl overflow-hidden p-6"
            style={{ background: "var(--card-dark)", minHeight: 180 }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-20"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-light), transparent 70%)",
              }}
            />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="font-display text-3xl text-white tracking-wide">
                NISTE SIGURNI?
              </div>
              <div>
                <p className="text-stone-400 text-sm mb-4 font-light">
                  Kontaktirajte nas za besplatne konzultacije.
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
