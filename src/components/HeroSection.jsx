import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { remerasDescripcion } from "../mock/packages";
import { WHATSAPP_PHONE } from "../config";

const PUBLIC = process.env.PUBLIC_URL || "";

const heroBannerArt = (webBase, mobBase, productId) => ({
  productId,
  web: {
    src: `${PUBLIC}/img/generated/${webBase}-1280.webp`,
    srcSet: [
      `${PUBLIC}/img/generated/${webBase}-640.webp 640w`,
      `${PUBLIC}/img/generated/${webBase}-960.webp 960w`,
      `${PUBLIC}/img/generated/${webBase}-1280.webp 1280w`,
      `${PUBLIC}/img/generated/${webBase}-1600.webp 1600w`,
      `${PUBLIC}/img/generated/${webBase}-1920.webp 1920w`,
      `${PUBLIC}/img/generated/${webBase}-2560.webp 2560w`,
    ].join(", "),
  },
  mob: {
    src: `${PUBLIC}/img/generated/${mobBase}-1280.webp`,
    srcSet: [
      `${PUBLIC}/img/generated/${mobBase}-640.webp 640w`,
      `${PUBLIC}/img/generated/${mobBase}-960.webp 960w`,
      `${PUBLIC}/img/generated/${mobBase}-1280.webp 1280w`,
      `${PUBLIC}/img/generated/${mobBase}-1600.webp 1600w`,
      `${PUBLIC}/img/generated/${mobBase}-1920.webp 1920w`,
      `${PUBLIC}/img/generated/${mobBase}-2560.webp 2560w`,
    ].join(", "),
  },
});

const BANNERS = [
  heroBannerArt("hero_banner1-web", "hero_banner1-mob", "01"),
  heroBannerArt("hero_banner2-web", "hero_banner2-mob", "02"),
  heroBannerArt("hero_banner3-web", "hero_banner3-mob", "03"),
  heroBannerArt("hero_banner4-web", "hero_banner4-mob", "01"),
];

const COLORS = {
  dark: "#000110",
  gold: "#d2983a",
  text: "#f7f4e6",
  muted: "rgba(247, 244, 230, 0.72)",
};

const buildWhatsAppLink = (message) => {
  const digits = WHATSAPP_PHONE.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const banner = BANNERS[index];
  const product = useMemo(
    () => remerasDescripcion.find((item) => item.id === banner.productId) || remerasDescripcion[0],
    [banner.productId]
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % BANNERS.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  const goToProducts = (event) => {
    event.preventDefault();
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
  };

  const goPrev = () => setIndex((current) => (current - 1 + BANNERS.length) % BANNERS.length);
  const goNext = () => setIndex((current) => (current + 1) % BANNERS.length);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: COLORS.dark }}>
      <div className="relative min-h-[calc(100svh-72px)] pt-[72px]">
        <motion.div
          key={banner.web.src}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <picture>
            <source media="(max-width: 767px)" srcSet={banner.mob.srcSet} sizes="100vw" />
            <source media="(min-width: 768px)" srcSet={banner.web.srcSet} sizes="100vw" />
            <img
              src={banner.web.src}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,1,16,0.92)_0%,rgba(0,1,16,0.68)_42%,rgba(0,1,16,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,1,16,0.20)_0%,rgba(0,1,16,0.22)_55%,#000110_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.28em]"
              style={{ color: COLORS.gold }}
            >
              VAGOS / Primera coleccion
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.05 }}
              className="max-w-[12ch] text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl"
              style={{ color: COLORS.text }}
            >
              Remeras para vivir A LO BOCA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.1 }}
              className="mt-6 max-w-xl text-base leading-7 sm:text-lg"
              style={{ color: COLORS.muted }}
            >
              Disenos originales, calce comodo y produccion pensada para hinchas que quieren llevar los colores todos los dias.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#packages"
                onClick={goToProducts}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: COLORS.gold, color: COLORS.dark }}
              >
                Ver remeras
                <ArrowDown size={17} />
              </a>
              <a
                href={buildWhatsAppLink(product.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border px-6 text-sm font-semibold backdrop-blur-md transition-colors duration-200 hover:bg-white/10"
                style={{ borderColor: "rgba(237, 229, 218, 0.28)", color: COLORS.text }}
              >
                <MessageCircle size={17} />
                Consultar ahora
              </a>
            </motion.div>

            <div className="mt-10 grid max-w-lg grid-cols-3 border-y border-white/12 py-5">
              <div>
                <p className="text-2xl font-black" style={{ color: COLORS.text }}>
                  4
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em]" style={{ color: COLORS.muted }}>
                  Modelos
                </p>
              </div>
              <div>
                <p className="text-2xl font-black" style={{ color: COLORS.text }}>
                  UNISEX
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em]" style={{ color: COLORS.muted }}>
                  Calce
                </p>
              </div>
              <div>
                <p className="text-2xl font-black" style={{ color: COLORS.text }}>
                TODO el pais
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em]" style={{ color: COLORS.muted }}>
                  Envios
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-4 z-20 flex items-center gap-2 sm:right-6 lg:right-8">
          <button
            type="button"
            onClick={goPrev}
            className="grid h-10 w-10 place-items-center rounded-md border bg-black/35 backdrop-blur-md transition-colors duration-200 hover:bg-black/60"
            style={{ borderColor: "rgba(237, 229, 218, 0.22)", color: COLORS.text }}
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2 px-2">
            {BANNERS.map((item, itemIndex) => (
              <button
                key={item.web.src}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className="h-1.5 rounded-full transition-all duration-200"
                style={{
                  width: itemIndex === index ? 26 : 8,
                  backgroundColor: itemIndex === index ? COLORS.gold : "rgba(237, 229, 218, 0.42)",
                }}
                aria-label={`Ver imagen ${itemIndex + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="grid h-10 w-10 place-items-center rounded-md border bg-black/35 backdrop-blur-md transition-colors duration-200 hover:bg-black/60"
            style={{ borderColor: "rgba(237, 229, 218, 0.22)", color: COLORS.text }}
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
