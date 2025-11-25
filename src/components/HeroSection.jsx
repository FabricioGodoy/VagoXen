import React, { useState, useEffect } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";

// Color palette constants
const COLORS = {
  gold: "#d2983a",
  cream: "#EDE5DA",
  darkBg: "#141416",
  borderLight: "rgba(237, 229, 218, 0.25)",
  goldLight: "rgba(210, 152, 58, 0.10)",
};

// LAS REMERAS AQUÍ
const BANNERS = [
  {
    img: `${process.env.PUBLIC_URL}/img/banner/horizontalRemeras.JPG`,
    /* link: "/remeras/remera-1", */
  },
  {
    img: `${process.env.PUBLIC_URL}/img/banner/JR10.jpg`,
   /*  link: "/remeras/remera-2", */
  },
  {
    img: `${process.env.PUBLIC_URL}/img/banner/AR12.jpg`,
   /*  link: "/remeras/remera-3", */
  },
];

export default function HeroModern() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  // Auto-slide cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animaciones del contenido (card)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section id="hero" className="relative bg-black" style={{ marginTop: "-2vh" }}>
      {/* 🔵 Carrusel con crossfade suave */}
      <div className="relative h-[85vh] min-h-[520px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.a
            key={index} // fuerza la animación en cada cambio
            href={BANNERS[index].link}
            className="absolute inset-0 block"
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <img
              src={BANNERS[index].img}
              alt={`Remera ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.a>
        </AnimatePresence>

        {/* Overlay de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80 pointer-events-none z-10" />

        {/* Flechas modernas */}
        <button
          type="button"
          className="group absolute top-1/2 left-6 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-sm text-white/90 text-lg transition-transform duration-200 hover:scale-110 hover:bg-black/80 hover:border-white/60"
          onClick={() =>
            setIndex((i) => (i - 1 + BANNERS.length) % BANNERS.length)
          }
        >
          <span className="translate-x-[1px] group-hover:-translate-x-[2px] transition-transform">
            ‹
          </span>
        </button>

        <button
          type="button"
          className="group absolute top-1/2 right-6 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-sm text-white/90 text-lg transition-transform duration-200 hover:scale-110 hover:bg-black/80 hover:border-white/60"
          onClick={() => setIndex((i) => (i + 1) % BANNERS.length)}
        >
          <span className=" -translate-x-[1px] group-hover:translate-x-[2px] transition-transform">
            ›
          </span>
        </button>

        {/* Puntitos tipo slider pro */}
        <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-3">
          {BANNERS.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  active ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Card de contenido */}
      {/* <div className="relative px-4 pt-10 pb-20">
        <div
          className="mx-auto max-w-5xl rounded-3xl border px-6 py-10 sm:px-10 sm:py-12 shadow-2xl bg-[#141416]/96 backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(210,152,58,0.3)]"
          style={{ borderColor: COLORS.borderLight }}
        > */}
       {/*    <motion.div
            initial={reduce ? "visible" : "hidden"}
            animate="visible"
            variants={reduce ? undefined : containerVariants}
            className="flex flex-col items-center justify-center gap-6 text-center"
          > */}
            {/* Badge */}
         {/*    <motion.div
              variants={reduce ? undefined : itemVariants}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs backdrop-blur-md transition-all duration-300 hover:scale-105"
              style={{
                borderColor: COLORS.gold,
                color: COLORS.cream,
                backgroundColor: COLORS.goldLight,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: COLORS.gold }}
                ></span>
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS.gold }}
                ></span>
              </span>
              <span>Pasión xeneize en cada detalle</span>
            </motion.div> */}

            {/* Headline */}
          {/*   <motion.h1
              variants={reduce ? undefined : itemVariants}
              className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${COLORS.cream}, ${COLORS.gold})`,
                }}
              >
                Vestite como late La Bombonera.
              </span>
            </motion.h1> */}

            {/* Subhead */}
         {/*    <motion.p
              variants={reduce ? undefined : itemVariants}
              className="max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed"
              style={{ color: COLORS.cream }}
            >
              Diseños exclusivos, calidad premium y la esencia del Xeneize en
              cada prenda. Elegí tu remera y llevá los colores más grandes del
              mundo en el pecho.
            </motion.p> */}

            {/* Botones */}
        {/*     <motion.div
              variants={reduce ? undefined : itemVariants}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#remeras"
                className="group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
                style={{ backgroundColor: COLORS.gold, color: COLORS.darkBg }}
              >
                <span className="relative z-10">Ver colección xeneize</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.gold}, #f0a840)`,
                  }}
                />
              </a>

              <a
                href="#modelos"
                className="group rounded-xl px-6 py-3 text-sm font-semibold border transition-all duration-300 hover:bg-white/5 hover:scale-105"
                style={{ borderColor: COLORS.cream, color: COLORS.cream }}
              >
                Todos los modelos
              </a>
            </motion.div> */}

            {/* Stats */}
          {/*   <motion.div
              variants={reduce ? undefined : itemVariants}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
            >
              <StatCard number="+3.000" label="Hinchas vistiendo nuestros diseños" />
              <StatCard number="5/5" label="Calidad en confección" />
              <StatCard number="24/48 hs" label="Envíos a todo el país" />
            </motion.div> */}
        {/*   </motion.div> */}
    {/*     </div>
      </div> */}
    </section>
  );
}

function StatCard({ number, label }) {
  return (
    <div
      className="group rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:border-opacity-60 hover:bg-white/5 hover:scale-105 cursor-default"
      style={{ borderColor: COLORS.borderLight }}
    >
      <div
        className="text-2xl sm:text-3xl font-extrabold mb-1 transition-all duration-300 group-hover:scale-110"
        style={{ color: COLORS.cream }}
      >
        {number}
      </div>
      <div
        className="text-xs sm:text-sm opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{ color: COLORS.cream }}
      >
        {label}
      </div>
    </div>
  );
}
