import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, Ruler, Truck, X } from "lucide-react";
import { WHATSAPP_PHONE } from "../config";

const COLORS = {
  dark: "#000110",
  surface: "#050b1a",
  surfaceAlt: "#08152c",
  text: "#f7f4e6",
  muted: "rgba(247, 244, 230, 0.68)",
  gold: "#d2983a",
  line: "rgba(237, 229, 218, 0.16)",
};

const price = (value) =>
  value ? `$${Number(String(value).replace(/\./g, "")).toLocaleString("es-AR")}` : "Consultar";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const normalizeImage = (item, fallbackAlt) => {
  if (!item) return null;
  if (typeof item === "string") return { src: item, srcSet: undefined, alt: fallbackAlt };
  return { src: item.src, srcSet: item.srcSet, alt: item.alt || fallbackAlt };
};

const buildWhatsAppLink = (pkg) => {
  const digits = (pkg.whatsappPhone || WHATSAPP_PHONE).replace(/\D/g, "");
  const message = pkg.whatsappMessage || `Hola! Me interesa la remera ${pkg.name}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

export default function PackageModal({ pkg, onClose }) {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const images = useMemo(() => {
    const desktop =
      Array.isArray(pkg.imagesResponsive) && pkg.imagesResponsive.length > 0
        ? pkg.imagesResponsive
        : pkg.images || [pkg.image];
    const mobile =
      Array.isArray(pkg.imagesMobileResponsive) && pkg.imagesMobileResponsive.length > 0
        ? pkg.imagesMobileResponsive
        : pkg.imagesMobile || desktop;
    const source = isMobile ? mobile : desktop;

    return source.map((item, index) => normalizeImage(item, `${pkg.name} ${index + 1}`)).filter(Boolean);
  }, [isMobile, pkg]);

  const current = images[currentIndex] || images[0];
  const hasDiscount =
    pkg.originalPrice &&
    Number(String(pkg.originalPrice).replace(/\./g, "")) > Number(String(pkg.price).replace(/\./g, ""));

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [pkg.id, isMobile]);

  const goPrev = () => setCurrentIndex((value) => (value - 1 + images.length) % images.length);
  const goNext = () => setCurrentIndex((value) => (value + 1) % images.length);

  const guide = pkg.guiaTalleResponsive
    ? { src: pkg.guiaTalleResponsive.src, srcSet: pkg.guiaTalleResponsive.srcSet }
    : { src: pkg.guiaTalle, srcSet: undefined };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/78 p-3 backdrop-blur-md sm:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-modal-title"
    >
      <motion.div
        initial={{ y: 22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 22, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="relative grid max-h-[92svh] w-full max-w-6xl overflow-hidden rounded-md border md:grid-cols-[1.1fr_0.9fr]"
        style={{
          background: `linear-gradient(145deg, ${COLORS.surface}, ${COLORS.surfaceAlt})`,
          borderColor: COLORS.line,
          color: COLORS.text,
          boxShadow: "0 24px 90px rgba(0,0,0,0.72)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-md border bg-black/45 backdrop-blur-md transition-colors duration-200 hover:bg-black/70"
          style={{ borderColor: COLORS.line, color: COLORS.text }}
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="relative min-h-[360px] bg-black md:min-h-[680px]">
          {current && (
            <motion.img
              key={current.src}
              src={current.src}
              srcSet={current.srcSet}
              sizes={isMobile ? "96vw" : "min(640px, 56vw)"}
              alt={current.alt}
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md border bg-black/45 backdrop-blur-md hover:bg-black/70"
                style={{ borderColor: COLORS.line, color: COLORS.text }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md border bg-black/45 backdrop-blur-md hover:bg-black/70"
                style={{ borderColor: COLORS.line, color: COLORS.text }}
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        <div className="flex max-h-[92svh] flex-col overflow-y-auto p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: COLORS.gold }}>
            {pkg.duration} / {pkg.destination}
          </p>

          <div className="mt-3 flex items-start justify-between gap-6 border-b pb-6" style={{ borderColor: COLORS.line }}>
            <div>
              <h2 id="package-modal-title" className="text-4xl font-black leading-none" style={{ color: COLORS.text }}>
                {pkg.name}
              </h2>
              <p className="mt-4 text-sm leading-6" style={{ color: COLORS.muted }}>
                {pkg.longDescription}
              </p>
            </div>
            <div className="shrink-0 text-right">
              {hasDiscount && (
                <p className="text-sm line-through" style={{ color: COLORS.muted }}>
                  {price(pkg.originalPrice)}
                </p>
              )}
              <p className="text-2xl font-black" style={{ color: COLORS.text }}>
                {price(pkg.price)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 border-b py-6" style={{ borderColor: COLORS.line }}>
            <div className="flex items-start gap-3">
              <Truck size={19} color={COLORS.gold} />
              <div>
                <p className="text-sm font-semibold" style={{ color: COLORS.text }}>
                  Envios a todo el pais
                </p>
                <p className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                  Coordinamos stock, pago y envio directo por WhatsApp.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Ruler size={19} color={COLORS.gold} />
              <div>
                <p className="text-sm font-semibold" style={{ color: COLORS.text }}>
                  Guia de talles
                </p>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="mt-1 text-sm underline underline-offset-4"
                  style={{ color: COLORS.gold }}
                >
                  Ver tabla antes de elegir
                </button>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <a
              href={buildWhatsAppLink(pkg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: COLORS.gold, color: COLORS.dark }}
            >
              <MessageCircle size={18} />
              Comprar por WhatsApp
            </a>

            <div className="mt-5 flex justify-center gap-2">
              {images.map((image, imageIndex) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setCurrentIndex(imageIndex)}
                  className="h-1.5 rounded-full transition-all duration-200"
                  style={{
                    width: imageIndex === currentIndex ? 28 : 8,
                    backgroundColor: imageIndex === currentIndex ? COLORS.gold : "rgba(237, 229, 218, 0.34)",
                  }}
                  aria-label={`Ver foto ${imageIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {showSizeGuide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/78 p-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-md border bg-black p-3"
            style={{ borderColor: COLORS.line }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-md border bg-black/70"
              style={{ borderColor: COLORS.line, color: COLORS.text }}
              aria-label="Cerrar guia de talles"
            >
              <X size={16} />
            </button>
            <img
              src={guide.src}
              srcSet={guide.srcSet}
              sizes="min(512px, 96vw)"
              alt="Guia de talles"
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
