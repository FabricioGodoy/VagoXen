import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🎨 Paleta centralizada SOLO con los colores que usa este Hero
const COLORS = {
  // Fondo general del hero
  heroBg: "#000000",

  // Overlay (equivalente a from-black/10 via-black/40 to-black/80)
  heroOverlayFrom: "rgba(0, 0, 0, 0.10)",
  heroOverlayVia: "rgba(0, 0, 0, 0.40)",
  heroOverlayTo: "rgba(0, 0, 0, 0.80)",

  // Flechas
  heroArrowBorder: "rgba(255, 255, 255, 0.30)", // antes border-white/30
  heroArrowBg: "rgba(0, 0, 0, 0.60)",           // antes bg-black/60
  heroArrowIcon: "rgba(255, 255, 255, 0.90)",   // antes text-white/90

  // Puntitos
  heroDotActive: "#ffffff",                     // antes bg-white
  heroDotInactive: "rgba(255, 255, 255, 0.40)", // antes bg-white/40
};

// LAS REMERAS AQUÍ
const BANNERS = [
  {
    img: `${process.env.PUBLIC_URL}/img/banner/banner_1.webp`,
  },
  {
    img: `${process.env.PUBLIC_URL}/img/banner/bannerAmarillo.webp`,
  },
   {
    img: `${process.env.PUBLIC_URL}/img/banner/banner_3.webp`,
  },
  {
    img: `${process.env.PUBLIC_URL}/img/banner/banner_4.webp`,
  },
];

export default function HeroModern() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // (si en algún momento querés trackear interacción de usuario)
  const userInteracted = useRef(false);

  // AUTO-SLIDE con pausa si el usuario toca las flechas
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // función para frenar 6 segundos
  const pauseAutoSlide = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const goPrev = () => {
    userInteracted.current = true;
    pauseAutoSlide();
    setIndex((i) => (i - 1 + BANNERS.length) % BANNERS.length);
  };

  const goNext = () => {
    userInteracted.current = true;
    pauseAutoSlide();
    setIndex((i) => (i + 1) % BANNERS.length);
  };

  return (
    <section
      id="hero"
      className="relative"
      style={{ marginTop: "-2vh", backgroundColor: COLORS.heroBg }}
    >
      {/* Carrusel */}
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

        {/* Overlay con gradient desde COLORS */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(
              to bottom,
              ${COLORS.heroOverlayFrom},
              ${COLORS.heroOverlayVia},
              ${COLORS.heroOverlayTo}
            )`,
          }}
        />

        {/* Flecha izquierda */}
        <button
          type="button"
          className="group absolute top-1/2 left-6 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm text-lg transition-transform duration-200 hover:scale-110 hover:brightness-110"
          onClick={goPrev}
          style={{
            border: `1px solid ${COLORS.heroArrowBorder}`,
            backgroundColor: COLORS.heroArrowBg,
            color: COLORS.heroArrowIcon,
          }}
        >
          <span className="translate-x-[1px] group-hover:-translate-x-[2px] transition-transform">
            ‹
          </span>
        </button>

        {/* Flecha derecha */}
        <button
          type="button"
          className="group absolute top-1/2 right-6 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm text-lg transition-transform duration-200 hover:scale-110 hover:brightness-110"
          onClick={goNext}
          style={{
            border: `1px solid ${COLORS.heroArrowBorder}`,
            backgroundColor: COLORS.heroArrowBg,
            color: COLORS.heroArrowIcon,
          }}
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
                className={`h-2.5 rounded-full transition-all duration-200 hover:brightness-125 ${
                  active ? "w-6" : "w-2.5"
                }`}
                style={{
                  backgroundColor: active
                    ? COLORS.heroDotActive
                    : COLORS.heroDotInactive,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
