"use client";

const navLinks = [
  { label: "Usluge", id: "usluge" },
  { label: "Projekti", id: "projekti" },
  { label: "O nama", id: "o-nama" },
  { label: "Kontakt", id: "kontakt" },
];

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      className="border-t border-stone-200 py-8 px-4 sm:px-6"
      style={{ background: "var(--card)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display text-xl tracking-widest text-stone-900">
          S.A.M. Gradnja
        </div>
        <div className="text-xs text-stone-400">
          © {new Date().getFullYear()} S.A.M. Gradnja j.d.o.o. · Rijeka
        </div>
        <div className="flex gap-6">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
