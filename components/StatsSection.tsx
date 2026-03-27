"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({
  value,
  suffix,
  label,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
}) {
  const count = useCountUp(value, 1800, inView);
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="grain relative flex flex-col justify-between p-6 rounded-2xl bg-stone-900 overflow-hidden"
    >
      <div className="accent-line mb-4" />
      <div>
        <div className="font-display text-5xl text-amber-400 tracking-wide leading-none">
          {count}
          {suffix}
        </div>
        <div className="mt-2 text-xs uppercase tracking-widest text-stone-400 font-light">
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-8 px-4 sm:px-6">
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <StatCard
            inView={inView}
            value={50}
            suffix="+"
            label="Završenih projekata"
          />
          <StatCard
            inView={inView}
            value={25}
            suffix="god"
            label="Na tržištu"
          />
          <StatCard
            inView={inView}
            value={95}
            suffix="%"
            label="Zadovoljnih klijenata"
          />
        </div>
      </motion.div>
    </section>
  );
}
