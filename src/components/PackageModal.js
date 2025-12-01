import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_PHONE } from "../config";

const COLORS = {
  // Base brand
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#d2983a",
  sand: "#EDE5DA",

  // Modal backdrop
  backdrop: "rgba(43, 48, 54, 0.30)",

  // Modal container (azul oscuro en degradé)
  modalBorder: "rgba(43, 48, 54, 0.40)",
  modalBgTop: "#1c4985",
  modalBgBottom: "#000110",
  modalShadow: "0 24px 80px rgba(0, 0, 0, 0.70)",

  // Top filete
  topStripeFrom: "#d2983a",
  topStripeTo: "#000110",

  // Close button
  closeBg: "rgba(0, 0, 0, 0.55)",
  closeBgHover: "rgba(0, 0, 0, 0.85)",
  closeBorder: "rgba(255, 255, 255, 0.25)",

  // Slider overlay
  sliderOverlayStop1: "rgba(0, 0, 0, 0.55)",
  sliderOverlayStop2: "rgba(0, 0, 0, 0.10)",
  sliderOverlayStop3: "rgba(0, 0, 0, 0)",

  // Text on image
  sliderTitle: "#d0d0d0ff",
  sliderBadgeBg: "rgba(0, 0, 0, 0.55)",
  sliderBadgeText: "#d0d0d0ff",

  // Slider arrows
  sliderArrowBg: "rgba(0, 0, 0, 0.55)",
  sliderArrowBgHover: "rgba(0, 0, 0, 0.80)",
  sliderArrowBorder: "rgba(255, 255, 255, 0.20)",
  sliderArrowIcon: "#FFFFFF",

  // Slider dots
  sliderDotActive: "#d2983a",
  sliderDotInactive: "rgba(255, 255, 255, 0.70)",

  // Body text
  bodyText: "#f4e3b0",
  bodyTextStrong: "#f7e9c8",

  // Chips
  chipBg: "rgba(0, 0, 0, 0.45)",
  chipBorder: "rgba(255, 255, 255, 0.25)",
  chipShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
  chipLabel: "#f4e3b0",

  // List / titles
  sectionTitle: "#f2c567",
  listText: "#f4e3b0",

  // CTA buttons
  ctaPrimaryBg: "#d2983a",
  ctaPrimaryText: "#141416",
  ctaSecondaryBg: "#d0d0d0ff",
  ctaSecondaryText: "#2b3036",
  ctaSecondaryBorder: "rgba(255, 255, 255, 0.35)",

  // Botón guía de talles
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

const PackageModal = ({ pkg, onClose }) => {
  if (!pkg) return null;

  const images =
    Array.isArray(pkg.images) && pkg.images.length > 0
      ? pkg.images
      : [pkg.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

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
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = COLORS.closeBgHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = COLORS.closeBg)
          }
        >
          <X size={20} />
        </button>

        {/* SLIDER */}
        <div
          className="relative w-full overflow-hidden rounded-t-3xl"
          style={{ aspectRatio: "3 / 2" }}
        >
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`${pkg.name} - diseño ${currentIndex + 1}`}
            className="w-full h-full object-contain bg-black"
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
              style={{
                backgroundColor: COLORS.sliderBadgeBg,
                color: COLORS.sliderBadgeText,
              }}
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    COLORS.sliderArrowBgHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    COLORS.sliderArrowBg)
                }
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
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    COLORS.sliderArrowBgHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    COLORS.sliderArrowBg)
                }
              >
                <ChevronRight size={18} />
              </button>

              <div className="absolute bottom-2.5 md:bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        idx === currentIndex
                          ? COLORS.sliderDotActive
                          : COLORS.sliderDotInactive,
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
          <p
            className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed"
            style={{ color: COLORS.bodyText }}
          >
            {pkg.longDescription}
          </p>

          {/* Chips info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {/* Chip: Colección */}
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
                <span
                  className="opacity-80"
                  style={{ color: COLORS.chipLabel }}
                >
                  Colección:
                </span>{" "}
                <span style={{ color: COLORS.bodyTextStrong }}>
                  {pkg.destination}
                </span>
              </div>
            </div>

            {/* Chip: Edición */}
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
                <span
                  className="opacity-80"
                  style={{ color: COLORS.chipLabel }}
                >
                  Edición:
                </span>{" "}
                <span style={{ color: COLORS.bodyTextStrong }}>
                  {pkg.duration}
                </span>
              </div>
            </div>

            {/* Chip: Precio */}
            <div
              className="inline-flex items-center gap-3 text-sm px-3 py-2.5 md:px-4 md:py-3 rounded-2xl border"
              style={{
                backgroundColor: COLORS.chipBg,
                borderColor: COLORS.chipBorder,
                boxShadow: COLORS.chipShadow,
              }}
            >
              <CheckCircle size={18} color={COLORS.gold} />
              <div className="font-medium">
                <span
                  className="opacity-80"
                  style={{ color: COLORS.chipLabel }}
                >
                  Precio:
                </span>{" "}
                <span style={{ color: COLORS.bodyTextStrong }}>
                  {pkg.price ? `$${pkg.price}` : "Consultar"}
                </span>
              </div>
            </div>
          </div>

          {/* Botón pequeño: Tabla guía de talles */}
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  COLORS.sizeGuideBgHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = COLORS.sizeGuideBg)
              }
            >
              Tabla guía de talles
            </button>
          </div>
    <h3
            className="text-lg md:text-xl font-bold mb-2 md:mb-3"
            style={{ color: COLORS.sectionTitle }}
          >
            Envíos a todo el país
          </h3>

          {/* <ul className="list-none space-y-1.5 md:space-y-2 mb-6 md:mb-8">
            {pkg.includes.map((item, index) => (
              <li
                key={index}
                className="flex items-start text-sm md:text-base"
                style={{ color: COLORS.listText }}
              >
                <CheckCircle
                  size={18}
                  color={COLORS.gold}
                  className="mr-3 mt-0.5 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul> */}

<br/>
          {/* BOTONES CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl px-3.5 py-2.5 md:px-4 md:py-3 font-semibold shadow-sm"
              style={{
                backgroundColor: COLORS.ctaPrimaryBg,
                color: COLORS.ctaPrimaryText,
              }}
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
              {/* botón cerrar del mini-modal */}
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full border border-white/40 bg-black/70 text-white hover:bg-black/90 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="w-full h-full flex items-center justify-center p-3 bg-black">
                <img
                  src={pkg.guiaTalle}
                  alt="Tabla guía de talles"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PackageModal;
