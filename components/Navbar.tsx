"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const navLinks = [
  { label: "Usluge", id: "usluge" },
  { label: "Projekti", id: "projekti" },
  { label: "O nama", id: "o-nama" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-stone-50/90 backdrop-blur-md border-b border-stone-200"
          : "py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="font-display text-2xl tracking-widest text-stone-900"
        >
          S.A.M. Gradnja
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l, i) => (
            <motion.button
              key={l.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
              onClick={() => scrollTo(l.id)}
              className="nav-link"
            >
              {l.label}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + navLinks.length * 0.07,
              ease,
            }}
            onClick={() => scrollTo("kontakt")}
            className="px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "var(--accent)" }}
          >
            Kontakt
          </motion.button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease }}
            className="block w-6 h-0.5 bg-stone-900"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.3, ease }}
            className="block w-6 h-0.5 bg-stone-900"
          />
          <motion.span
            animate={
              menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.3, ease }}
            className="block w-6 h-0.5 bg-stone-900"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 pb-6 pt-4 flex flex-col gap-6 border-t border-stone-200 bg-stone-50/95 backdrop-blur-md">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease }}
                  onClick={() => scrollTo(l.id)}
                  className="nav-link text-left text-base py-1"
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: navLinks.length * 0.05,
                  ease,
                }}
                onClick={() => scrollTo("kontakt")}
                className="mt-2 px-5 py-2.5 rounded-full text-sm uppercase tracking-widest font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95 w-full"
                style={{ background: "var(--accent)" }}
              >
                Kontakt
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
