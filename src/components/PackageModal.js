import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, MapPin, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_PHONE } from "../config";

const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#d2983a",
  sand: "#EDE5DA",
  backdrop: "rgba(43, 48, 54, 0.30)",
  modalBorder: "rgba(43, 48, 54, 0.40)",
  modalBgTop: "#1c4985",
  modalBgBottom: "#000110",
  modalShadow: "0 24px 80px rgba(0, 0, 0, 0.70)",
  topStripeFrom: "#d2983a",
  topStripeTo: "#000110",
  closeBg: "rgba(0, 0, 0, 0.55)",
  closeBgHover: "rgba(0, 0, 0, 0.85)",
  closeBorder: "rgba(255, 255, 255, 0.25)",
  sliderOverlayStop1: "rgba(0, 0, 0, 0.55)",
  sliderOverlayStop2: "rgba(0, 0, 0, 0.10)",
  sliderOverlayStop3: "rgba(0, 0, 0, 0)",
  sliderTitle: "#d0d0d0ff",
  sliderBadgeBg: "rgba(0, 0, 0, 0.55)",
  sliderBadgeText: "#d0d0d0ff",
  sliderArrowBg: "rgba(0, 0, 0, 0.55)",
  sliderArrowBgHover: "rgba(0, 0, 0, 0.80)",
  sliderArrowBorder: "rgba(255, 255, 255, 0.20)",
  sliderArrowIcon: "#FFFFFF",
  sliderDotActive: "#d2983a",
  sliderDotInactive: "rgba(255, 255, 255, 0.70)",
  bodyText: "#f4e3b0",
  bodyTextStrong: "#f7e9c8",
  chipBg: "rgba(0, 0, 0, 0.45)",
  chipBorder: "rgba(255, 255, 255, 0.25)",
  chipShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
  chipLabel: "#f4e3b0",
  sectionTitle: "#f2c567",
  listText: "#f4e3b0",
  ctaPrimaryBg: "#d2983a",
  ctaPrimaryText: "#141416",
  ctaSecondaryBg: "#d0d0d0ff",
  ctaSecondaryText: "#2b3036",
  ctaSecondaryBorder: "rgba(255, 255, 255, 0.35)",
  sizeGuideBg: "rgba(210, 152, 58, 0.10)",
  sizeGuideBgHover: "rgba(210, 152, 58, 0.20)",
  sizeGuideBorder: "rgba(210, 152, 58, 0.60)",
  sizeGuideText: "#f7e9c8",
};

const buildWhatsAppLink = (message = "", phone) => {
  const digits = (phone || "").replace(/\D/g, "");
  const base = digits ? `https://wa.me/${digits}` : "https://wa.me/";
  const params = new URLSearchParams({ text: message });
  return `${base}?${params.toString()}`;
};

// Hook para detectar mobile
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

// Helpers para soportar objetos responsive o strings legacy
const toResponsiveObj = (item, fallbackAlt = "") => {
  if (!item) return null;
  if (typeof item === "string") return { src: item, srcSet: undefined, alt: fallbackAlt };
  return { src: item.src, srcSet: item.srcSet, alt: item.alt || fallbackAlt };
};

const preloadImage = (src) => {
  if (!src) return;
  const img = new Image();
  img.src = src;
};

const PackageModal = ({ pkg, onClose }) => {
  if (!pkg) return null;

  const isMobile = useIsMobile();

  // ✅ Preferimos los arrays responsive si existen, sino legacy
  const baseImagesRaw =
    Array.isArray(pkg.imagesResponsive) && pkg.imagesResponsive.length > 0
      ? pkg.imagesResponsive
      : Array.isArray(pkg.images) && pkg.images.length > 0
      ? pkg.images
      : [pkg.image];

  const mobileImagesRaw =
    Array.isArray(pkg.imagesMobileResponsive) && pkg.imagesMobileResponsive.length > 0
      ? pkg.imagesMobileResponsive
      : Array.isArray(pkg.imagesMobile) && pkg.imagesMobile.length > 0
      ? pkg.imagesMobile
      : baseImagesRaw;

  const imagesRaw = isMobile ? mobileImagesRaw : baseImagesRaw;

  // Normalizamos a {src, srcSet}
  const images = imagesRaw
    .map((it, idx) => toResponsiveObj(it, `Diseño ${idx + 1}`))
    .filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // ✅ Preload SOLO current + next (no todas)
  useEffect(() => {
    if (!images.length) return;

    const current = images[currentIndex];
    const next = images[(currentIndex + 1) % images.length];

    preloadImage(current?.src);
    preloadImage(next?.src);
  }, [pkg.id, images.length, currentIndex, isMobile]);

  // 🔁 Auto-slide
  useEffect(() => {
    if (images.length <= 1) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const pauseAutoslide = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  const goNext = () => {
    pauseAutoslide();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    pauseAutoslide();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const whatsappLink = buildWhatsAppLink(
    pkg.whatsappMessage || `Hola! Me interesa el paquete: ${pkg.name}`,
    pkg.whatsappPhone || WHATSAPP_PHONE
  );

  // ESC + bloquear scroll
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  const sliderAspectRatio = isMobile ? "3 / 4" : "3 / 2";
  const current = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ backgroundColor: COLORS.backdrop }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="package-modal-title"
    >
      <motion.div
        initial={{ y: 36, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 36, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-gradient-to-b"
        style={{
          borderColor: COLORS.modalBorder,
          backgroundImage: `linear-gradient(180deg, ${COLORS.modalBgTop}, ${COLORS.modalBgBottom})`,
          color: COLORS.sand,
          boxShadow: COLORS.modalShadow,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* filete superior */}
        <div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${COLORS.topStripeFrom}, ${COLORS.topStripeTo})`,
            opacity: 0.9,
          }}
        />

        {/* botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full border transition-colors"
          style={{
            backgroundColor: COLORS.closeBg,
            borderColor: COLORS.closeBorder,
            color: COLORS.sand,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.closeBgHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.closeBg)}
        >
          <X size={20} />
        </button>

        {/* SLIDER */}
        <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ aspectRatio: sliderAspectRatio }}>
          <motion.img
            key={current?.src}
            src={current?.src}
            srcSet={current?.srcSet}
            sizes={isMobile ? "90vw" : "min(896px, 100vw)"}
            alt={`${pkg.name} - ${current?.alt || `diseño ${currentIndex + 1}`}`}
            className={"h-full object-contain bg-black " + (isMobile ? "w-[90%] mx-auto" : "w-full")}
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to top,
                ${COLORS.sliderOverlayStop1} 5%,
                ${COLORS.sliderOverlayStop2} 45%,
                ${COLORS.sliderOverlayStop3} 80%
              )`,
            }}
          />

          {/* título y badge */}
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex flex-col gap-2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm text-[11px] md:text-xs font-semibold w-fit"
              style={{ backgroundColor: COLORS.sliderBadgeBg, color: COLORS.sliderBadgeText }}
            >
              <span>
                Diseño {currentIndex + 1} de {images.length}
              </span>
            </div>

            <h2
              id="package-modal-title"
              className="text-2xl md:text-4xl font-extrabold drop-shadow-lg"
              style={{ color: COLORS.sliderTitle }}
            >
              {pkg.name}
            </h2>
          </div>

          {/* flechas + dots */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full border shadow-sm transition-colors"
                style={{
                  backgroundColor: COLORS.sliderArrowBg,
                  borderColor: COLORS.sliderArrowBorder,
                  color: COLORS.sliderArrowIcon,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.sliderArrowBgHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.sliderArrowBg)}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full border shadow-sm transition-colors"
                style={{
                  backgroundColor: COLORS.sliderArrowBg,
                  borderColor: COLORS.sliderArrowBorder,
                  color: COLORS.sliderArrowIcon,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.sliderArrowBgHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.sliderArrowBg)}
              >
                <ChevronRight size={18} />
              </button>

              <div className="absolute bottom-2.5 md:bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                    style={{
                      backgroundColor: idx === currentIndex ? COLORS.sliderDotActive : COLORS.sliderDotInactive,
                      opacity: idx === currentIndex ? 1 : 0.7,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* CONTENIDO */}
        <div className="p-4 pt-5 md:p-8 md:pt-6">
          <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed" style={{ color: COLORS.bodyText }}>
            {pkg.longDescription}
          </p>

          {/* Chips info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            <div
              className="inline-flex items-center gap-3 text-sm px-3 py-2.5 md:px-4 md:py-3 rounded-2xl border"
              style={{
                backgroundColor: COLORS.chipBg,
                borderColor: COLORS.chipBorder,
                boxShadow: COLORS.chipShadow,
              }}
            >
              <MapPin size={18} color={COLORS.gold} />
              <div className="font-medium">
                <span className="opacity-80" style={{ color: COLORS.chipLabel }}>
                  Colección:
                </span>{" "}
                <span style={{ color: COLORS.bodyTextStrong }}>{pkg.destination}</span>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-3 text-sm px-3 py-2.5 md:px-4 md:py-3 rounded-2xl border"
              style={{
                backgroundColor: COLORS.chipBg,
                borderColor: COLORS.chipBorder,
                boxShadow: COLORS.chipShadow,
              }}
            >
              <Clock size={18} color={COLORS.gold} />
              <div className="font-medium">
                <span className="opacity-80" style={{ color: COLORS.chipLabel }}>
                  Edición:
                </span>{" "}
                <span style={{ color: COLORS.bodyTextStrong }}>{pkg.duration}</span>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-3 text-sm px-3 py-2.5 md:px-4 md:py-3 rounded-2xl border"
              style={{
                backgroundColor: COLORS.chipBg,
                borderColor: COLORS.chipBorder,
                boxShadow: COLORS.chipShadow,
              }}
            >
              <CheckCircle size={18} color={COLORS.gold} />
              <div className="font-medium flex flex-col">
                {pkg.originalPrice && Number(String(pkg.originalPrice).replace(/\./g, "")) > Number(String(pkg.price).replace(/\./g, "")) ? (
                  <>
                    <span
                      className="text-[11px] md:text-xs uppercase tracking-[0.08em] mb-0.5"
                      style={{ color: COLORS.chipLabel, opacity: 0.85 }}
                    >
                      OFERTA lanzamiento
                    </span>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs md:text-sm line-through" style={{ color: "rgba(244, 227, 176, 0.7)" }}>
                        ${Number(String(pkg.originalPrice).replace(/\./g, "")).toLocaleString("es-AR")}
                      </span>
                      <span className="text-base md:text-lg font-semibold" style={{ color: COLORS.bodyTextStrong }}>
                        ${Number(String(pkg.price).replace(/\./g, "")).toLocaleString("es-AR")}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="opacity-80" style={{ color: COLORS.chipLabel }}>
                      Precio:
                    </span>{" "}
                    <span style={{ color: COLORS.bodyTextStrong }}>
                      {pkg.price ? `$${Number(String(pkg.price).replace(/\./g, "")).toLocaleString("es-AR")}` : "Consultar"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Botón: Tabla guía de talles */}
          <div className="flex justify-start mb-6">
            <button
              type="button"
              onClick={() => setShowSizeGuide(true)}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-colors"
              style={{
                backgroundColor: COLORS.sizeGuideBg,
                borderColor: COLORS.sizeGuideBorder,
                color: COLORS.sizeGuideText,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.sizeGuideBgHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.sizeGuideBg)}
            >
              Tabla guía de talles
            </button>
          </div>

          <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3" style={{ color: COLORS.sectionTitle }}>
            Envíos a todo el país
          </h3>

          <br />

          {/* BOTONES CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 font-semibold shadow-sm"
              style={{ backgroundColor: COLORS.ctaPrimaryBg, color: COLORS.ctaPrimaryText }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              <FaWhatsapp size={20} className="mr-2" />
              Consultar por WhatsApp
            </motion.a>

            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 font-semibold border transition-colors"
              style={{
                backgroundColor: COLORS.ctaSecondaryBg,
                color: COLORS.ctaSecondaryText,
                borderColor: COLORS.ctaSecondaryBorder,
              }}
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* MINI-MODAL TABLA DE TALLES */}
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden bg-black border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full border border-white/40 bg-black/70 text-white hover:bg-black/90 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="w-full h-full flex items-center justify-center p-3 bg-black">
                {(() => {
                  const guide = pkg.guiaTalleResponsive
                    ? { src: pkg.guiaTalleResponsive.src, srcSet: pkg.guiaTalleResponsive.srcSet }
                    : { src: pkg.guiaTalle, srcSet: undefined };

                  return (
                    <img
                      src={guide.src}
                      srcSet={guide.srcSet}
                      sizes="min(448px, 100vw)"
                      alt="Tabla guía de talles"
                      className="w-full h-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PackageModal;
