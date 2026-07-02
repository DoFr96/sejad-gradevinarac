"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const PHONE_NUMBER = "385958067078";
const WHATSAPP_MESSAGE =
  "Pozdrav, zanima me ponuda za roh-bau / renovaciju ku\u0107e.";

const bounceEase = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

const buttonVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.85,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      delay: i * 0.05,
      ease: bounceEase,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 8,
    scale: 0.85,
    transition: {
      duration: 0.2,
      delay: (1 - i) * 0.03,
    },
  }),
};

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#floating-contact")) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:+${PHONE_NUMBER}`;

  return (
    <motion.div
      id="floating-contact"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      initial={{ scale: 0 }}
      animate={visible ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.5, delay: 1.2, ease: bounceEase }}
    >
      {/* Expanded buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-2 items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* WhatsApp */}
            <motion.a
              custom={0}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
            >
              <span
                className="px-3 py-1.5 rounded-lg text-white text-xs font-medium tracking-wide shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "var(--card-dark)" }}
              >
                WhatsApp
              </span>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
                style={{ background: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.525 5.843L.057 23.486a.5.5 0 00.609.61l5.757-1.505A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.666-.498-5.202-1.37l-.373-.217-3.876 1.013 1.029-3.764-.235-.388A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              custom={1}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              href={phoneUrl}
              className="group flex items-center gap-3"
            >
              <span
                className="px-3 py-1.5 rounded-lg text-white text-xs font-medium tracking-wide shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "var(--card-dark)" }}
              >
                Nazovite nas
              </span>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
                style={{ background: "var(--accent)" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <div className="relative">
        {/* Pulse ring when closed */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{
              scale: [1, 1.45, 1],
              opacity: [0.45, 0, 0.45],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300"
          style={{
            background: isOpen ? "var(--card-dark)" : "var(--accent)",
          }}
          aria-label={isOpen ? "Zatvori kontakt" : "Kontaktirajte nas"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
