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

const PHONE_DISPLAY = "+385 95 806 7078";
const PHONE_NUMBER = "385958067078";
const WHATSAPP_MESSAGE =
  "Pozdrav, zanima me ponuda za roh-bau / renovaciju ku\u0107e.";

export default function ContactSection() {
  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section id="kontakt" className="py-16 px-4 sm:px-6 pb-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="accent-line mb-3" />
          <h2 className="font-display text-5xl text-stone-900 tracking-wide mb-2">
            KONTAKT
          </h2>
          <p className="text-stone-500 text-sm font-light mb-8">
            Dostupni smo svaki radni dan — odgovaramo unutar 2 sata.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {/* WhatsApp card */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grain relative rounded-2xl p-8 overflow-hidden flex flex-col justify-between"
            style={{ background: "#25D366", minHeight: 200 }}
          >
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/80">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.525 5.843L.057 23.486a.5.5 0 00.609.61l5.757-1.505A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.498-5.202-1.37l-.373-.217-3.876 1.013 1.029-3.764-.235-.388A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            <div>
              <div className="font-display text-3xl text-white tracking-wide mb-1">
                WHATSAPP
              </div>
              <div className="text-white/80 text-sm font-light">
                Javite nam se odmah →
              </div>
            </div>
          </motion.a>

          {/* Phone card */}
          <motion.a
            variants={itemVariants}
            whileHover={{ y: -4 }}
            href={`tel:+${PHONE_NUMBER}`}
            className="grain relative rounded-2xl p-8 overflow-hidden flex flex-col justify-between"
            style={{ background: "var(--card-dark)", minHeight: 200 }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 opacity-20"
              style={{
                background:
                  "radial-gradient(circle, var(--accent-light), transparent 70%)",
              }}
            />
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 relative z-10"
              style={{ fill: "var(--accent-light)" }}
            >
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <div className="relative z-10">
              <div className="font-display text-3xl text-white tracking-wide mb-1">
                NAZOVITE
              </div>
              <div className="text-stone-300 text-sm font-light">
                {PHONE_DISPLAY}
              </div>
            </div>
          </motion.a>

          {/* Info cards stacked */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            {/* Owner */}
            <div
              className="grain rounded-2xl p-5 border border-stone-200 flex items-center gap-4"
              style={{ background: "var(--card)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-0.5">
                  Vlasnik
                </div>
                <div className="text-sm text-stone-800 font-medium">
                  Sejad — glavni građevinar
                </div>
              </div>
            </div>

            {/* Address */}
            <div
              className="grain rounded-2xl p-5 border border-stone-200 flex items-center gap-4"
              style={{ background: "var(--card)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-0.5">
                  Adresa
                </div>
                <div className="text-sm text-stone-800 font-medium">
                  Humanski put 5, 51000 Rijeka
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              className="grain rounded-2xl p-5 border border-stone-200 flex items-center gap-4"
              style={{ background: "var(--card)" }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-stone-800">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-0.5">
                  Radno vrijeme
                </div>
                <div className="text-sm text-stone-800 font-medium">
                  Pon – Sub · 08:00 – 17:00
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
