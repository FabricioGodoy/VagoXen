import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// 🎨 Paleta centralizada SOLO con los colores que usa este Hero
const COLORS = {
  heroBg: "#000000",
  heroOverlayFrom: "rgba(0, 0, 0, 0.10)",
  heroOverlayVia: "rgba(0, 0, 0, 0.40)",
  heroOverlayTo: "rgba(0, 0, 0, 0.80)",
  heroArrowBorder: "rgba(255, 255, 255, 0.30)",
  heroArrowBg: "rgba(0, 0, 0, 0.60)",
  heroArrowIcon: "rgba(255, 255, 255, 0.90)",
  heroDotActive: "#ffffff",
  heroDotInactive: "rgba(255, 255, 255, 0.40)",
};

const PUBLIC = process.env.PUBLIC_URL || "";

const heroBannerArt = (webBase, mobBase) => ({
  web: {
    src: `${PUBLIC}/img/generated/${webBase}-1280.webp`,
    srcSet: `
      ${PUBLIC}/img/generated/${webBase}-640.webp 640w,
      ${PUBLIC}/img/generated/${webBase}-960.webp 960w,
      ${PUBLIC}/img/generated/${webBase}-1280.webp 1280w,
      ${PUBLIC}/img/generated/${webBase}-1600.webp 1600w,
      ${PUBLIC}/img/generated/${webBase}-1920.webp 1920w,
      ${PUBLIC}/img/generated/${webBase}-2560.webp 2560w
    `.trim(),
  },
  mob: {
    src: `${PUBLIC}/img/generated/${mobBase}-1280.webp`,
    srcSet: `
      ${PUBLIC}/img/generated/${mobBase}-640.webp 640w,
      ${PUBLIC}/img/generated/${mobBase}-960.webp 960w,
      ${PUBLIC}/img/generated/${mobBase}-1280.webp 1280w,
      ${PUBLIC}/img/generated/${mobBase}-1600.webp 1600w,
      ${PUBLIC}/img/generated/${mobBase}-1920.webp 1920w,
      ${PUBLIC}/img/generated/${mobBase}-2560.webp 2560w
    `.trim(),
  },
});


// BANNERS (NOMBRES EXACTOS SEGÚN TU CARPETA /img/generated)
const BANNERS = [
  heroBannerArt("hero_banner1-web", "hero_banner1-mob"),
  heroBannerArt("hero_banner2-web", "hero_banner2-mob"),
  heroBannerArt("hero_banner3-web", "hero_banner3-mob"),
  heroBannerArt("hero_banner4-web", "hero_banner4-mob"),
];


export default function HeroModern() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const userInteracted = useRef(false);

  // ✅ Cache de preloads para no repetir requests
  const preloadedKeysRef = useRef(new Set());

  const modIndex = useCallback((i) => {
    const n = BANNERS.length;
    return ((i % n) + n) % n;
  }, []);

  const preloadBannerAt = useCallback(
    (i) => {
      const idx = modIndex(i);
      const banner = BANNERS[idx];
      if (!banner?.web?.src) return;

      // clave única (si cambiás srcSet en el futuro, no rompe)
      const key = `${idx}|${banner.web.src}`;
      if (preloadedKeysRef.current.has(key)) return;
      preloadedKeysRef.current.add(key);

      const img = new Image();

      // Importante: setear srcset/sizes ANTES del src
      // para que el browser elija el mejor recurso a bajar.
      img.srcset = banner.web.srcSet;
      img.src = banner.web.src;
      img.sizes = "100vw";
      img.decoding = "async";
      img.loading = "eager";
     },
    [modIndex]
  );

  // ✅ PRELOAD “VENTANA”:
  // - Siempre: actual
  // - Ya: siguiente y anterior
  // - También: la 3ra (siguiente de la siguiente y anterior de la anterior)
  useEffect(() => {
    // 0: visible, ±1: siguiente/anterior, ±2: tercera
    const targets = [index, index + 1, index - 1, index + 2, index - 2];

    // Si querés aún más suave, esto evita competir con render:
    const run = () => targets.forEach(preloadBannerAt);

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 700 });
    } else {
      setTimeout(run, 0);
    }
  }, [index, preloadBannerAt]);

  // AUTO-SLIDE con pausa si el usuario toca las flechas
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

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
      <div className="relative h-[85vh] min-h-[520px] overflow-hidden">
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {BANNERS.map((banner, i) => (
            <a key={i} href={banner.link || "#"} className="block h-full w-full flex-shrink-0">
           <picture>
  {/* MOBILE */}
  <source
    media="(max-width: 767px)"
    srcSet={banner.mob.srcSet}
    sizes="100vw"
  />

  {/* DESKTOP */}
  <source
    media="(min-width: 768px)"
    srcSet={banner.web.srcSet}
    sizes="100vw"
  />

  {/* FALLBACK */}
  <img
    src={banner.web.src}
    alt={`Remera ${i + 1}`}
    className="h-full w-full object-cover"
    loading={i === index ? "eager" : "lazy"}
    decoding="async"
    fetchPriority={i === index ? "high" : "low"}
  />
</picture>

            </a>
          ))}
        </motion.div>

        {/* Overlay */}
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

        {/* Flechas */}
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
                  backgroundColor: active ? COLORS.heroDotActive : COLORS.heroDotInactive,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
