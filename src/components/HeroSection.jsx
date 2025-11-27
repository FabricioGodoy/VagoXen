import React, { useState, useEffect, useRef } from "react";
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
    img: `${process.env.PUBLIC_URL}/img/banner/banner_1.JPG`,
  },
  {
    img: `${process.env.PUBLIC_URL}/img/banner/banner_2.jpg`,
  },
  {
    img: `${process.env.PUBLIC_URL}/img/banner/banner_3.jpg`,
  },
  {
    img: `${process.env.PUBLIC_URL}/img/banner/banner_4.jpg`,
  }
];

export default function HeroModern() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);


  // 🔥 flag para saber si el usuario tocó flechas
  const userInteracted = useRef(false);

  // 🔥 AUTO-SLIDE con pausa si el usuario toca las flechas
  useEffect(() => {
  if (isPaused) return; // mientras esté pausado, no corre

  const interval = setInterval(() => {
    setIndex((i) => (i + 1) % BANNERS.length);
  }, 5000);

  return () => clearInterval(interval);
}, [isPaused]);

  // 🔥 función para frenar 6 segundos
const pauseAutoSlide = () => {
  setIsPaused(true);
  setTimeout(() => setIsPaused(false), 6000);  // después de 6s vuelve a arrancar
};

 const goPrev = () => {
  pauseAutoSlide();
  setIndex((i) => (i - 1 + BANNERS.length) % BANNERS.length);
};

const goNext = () => {
  pauseAutoSlide();
  setIndex((i) => (i + 1) % BANNERS.length);
};

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
            key={index}
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80 pointer-events-none z-10" />

        {/* Flechas modernas */}
        <button
          type="button"
          className="group absolute top-1/2 left-6 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-sm text-white/90 text-lg transition-transform duration-200 hover:scale-110 hover:bg-black/80 hover:border-white/60"
          onClick={goPrev}
        >
          <span className="translate-x-[1px] group-hover:-translate-x-[2px] transition-transform">
            ‹
          </span>
        </button>

        <button
          type="button"
          className="group absolute top-1/2 right-6 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-sm text-white/90 text-lg transition-transform duration-200 hover:scale-110 hover:bg-black/80 hover:border-white/60"
          onClick={goNext}
        >
          <span className="-translate-x-[1px] group-hover:translate-x-[2px] transition-transform">
            ›
          </span>
        </button>

        {/* Puntitos */}
        <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-3">
          {BANNERS.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
               onClick={() => {
                  pauseAutoSlide();
                  setIndex(i);
                }}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  active ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
