import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_PHONE } from "../config";

const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#d2983a",
  sand: "#EDE5DA",
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

  // 🔁 Auto-slide con pausa y reanudación
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

  // ESC + bloquear scroll del body
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
      style={{ backgroundColor: "rgba(43,48,54,0.30)" }}
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
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-gradient-to-b shadow-[0_24px_80px_rgba(20,20,22,0.20)]"
        style={{
          borderColor: "rgba(43,48,54,0.15)",
          backgroundImage: `linear-gradient(180deg, ${COLORS.sand}, #FFFFFF)`,
          color: COLORS.midnight,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* filete superior dorado */}
        <div
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.navy})`,
            opacity: 0.9,
          }}
        />

        {/* botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/75 border hover:bg-white transition-colors"
          style={{ color: COLORS.midnight, borderColor: "rgba(43,48,54,0.10)" }}
        >
          <X size={20} />
        </button>

        {/* SLIDER con más presencia */}
        <div className="relative h-72 md:h-[440px] overflow-hidden rounded-t-3xl">
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            alt={`${pkg.name} - diseño ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* overlay más sutil: se ve más la remera */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 5%, rgba(0,0,0,0.10) 45%, transparent 80%)",
            }}
          />

          {/* título + mini badge sobre la imagen */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/55 backdrop-blur-sm text-xs font-semibold text-white/90 w-fit">
              <span>
                Diseño {currentIndex + 1} de {images.length}
              </span>
            </div>
            <h2
              id="package-modal-title"
              className="text-3xl md:text-4xl font-extrabold drop-shadow-lg"
              style={{ color: "#FFFFFF" }}
            >
              {pkg.name}
            </h2>
          </div>

          {/* flechas solo si hay más de una imagen */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 border border-white/20 text-white shadow-sm hover:bg-black/80"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 border border-white/20 text-white shadow-sm hover:bg-black/80"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        idx === currentIndex ? COLORS.gold : "rgba(255,255,255,0.7)",
                      opacity: idx === currentIndex ? 1 : 0.7,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* CONTENIDO */}
        <div className="p-6 md:p-8">
          <p
            className="text-lg mb-6 leading-relaxed"
            style={{ color: "rgba(20,20,22,0.8)" }}
          >
            {pkg.longDescription}
          </p>

          {/* Chips info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div
              className="inline-flex items-center gap-3 text-sm bg-white/80 px-4 py-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border"
              style={{ borderColor: "rgba(43,48,54,0.10)" }}
            >
              <MapPin size={18} color={COLORS.gold} />
              <div className="font-medium" style={{ color: COLORS.navy }}>
                <span className="opacity-70">Colección:</span>{" "}
                <span style={{ color: COLORS.midnight }}>
                  {pkg.destination}
                </span>
              </div>
            </div>

            <div
              className="inline-flex items-center gap-3 text-sm bg-white/80 px-4 py-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border"
              style={{ borderColor: "rgba(43,48,54,0.10)" }}
            >
              <Clock size={18} color={COLORS.gold} />
              <div className="font-medium" style={{ color: COLORS.navy }}>
                <span className="opacity-70">Edición:</span>{" "}
                <span style={{ color: COLORS.midnight }}>
                  {pkg.duration}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.navy }}>
            Incluye
          </h3>

          <ul className="list-none space-y-2 mb-8">
            {pkg.includes.map((item, index) => (
              <li
                key={index}
                className="flex items-start"
                style={{ color: "rgba(20,20,22,0.85)" }}
              >
                <CheckCircle
                  size={18}
                  color={COLORS.gold}
                  className="mr-3 mt-0.5 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>

          {/* BOTONES CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold shadow-sm"
              style={{ backgroundColor: COLORS.gold, color: COLORS.midnight }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              <FaWhatsapp size={20} className="mr-2" />
              Consultar por WhatsApp
            </motion.a>

            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold bg-white border hover:text-[#141416]"
              style={{
                color: COLORS.navy,
                borderColor: "rgba(43,48,54,0.20)",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PackageModal;
