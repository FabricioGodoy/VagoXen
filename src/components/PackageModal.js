import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, MapPin, Clock, /* DollarSign, */ CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_PHONE } from "../config";

// Paleta: base neutral + acentos del logo
const COLORS = {
  midnight: "#141416", // grafito (antes #0d112d)
  navy: "#2b3036",     // pizarra (antes #002155)
  gold: "#d2983a",     // dorado (se mantiene)
  sand: "#EDE5DA",     // arena (se mantiene)
};

const buildWhatsAppLink = (message = "", phone) => {
  // phone: en formato internacional sin + ni 0 ni 15. Ej AR: 54911XXXXXXXX
  const digits = (phone || "").replace(/\D/g, "");
  const base = digits ? `https://wa.me/${digits}` : "https://wa.me/";
  const params = new URLSearchParams({ text: message });
  return `${base}?${params.toString()}`;
};

const PackageModal = ({ pkg, onClose }) => {
  if (!pkg) return null;

  const whatsappLink = buildWhatsAppLink(
    pkg.whatsappMessage || `Hola! Me interesa el paquete: ${pkg.name}`,
    pkg.whatsappPhone || WHATSAPP_PHONE
  );

  // Cerrar con ESC y bloquear scroll del body
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
      style={{ backgroundColor: "rgba(43,48,54,0.30)" }} // antes bg-[#002155]/30
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
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border bg-gradient-to-b shadow-[0_24px_80px_rgba(20,20,22,0.20)]"
        style={{
          borderColor: "rgba(43,48,54,0.15)", // antes border-[#002155]/15
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
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/70 border hover:bg-white transition-colors focus:outline-none focus:ring-2"
          style={{
            color: COLORS.midnight,
            borderColor: "rgba(43,48,54,0.10)",
            boxShadow: "none",
            // focus ring dorado suave
            // (tailwind inline): usamos style para evitar clases extra
          }}
        >
          <X size={20} />
        </button>

        {/* Hero */}
        <div className="relative h-60 md:h-80 overflow-hidden rounded-t-3xl">
          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
          {/* overlay claro para lectura */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, rgba(237,229,218,0.92), rgba(237,229,218,0.35) 45%, transparent 75%)`,
            }}
          />
          <h2
            id="package-modal-title"
            className="absolute bottom-6 left-6 right-6 text-3xl md:text-4xl font-extrabold drop-shadow-sm"
            style={{ color: COLORS.navy }} // antes #002155
          >
            {pkg.name}
          </h2>
        </div>

        {/* Contenido */}
        <div className="p-6 md:p-8">
          <p className="text-lg mb-6 leading-relaxed" style={{ color: "rgba(20,20,22,0.8)" }}>
            {pkg.longDescription}
          </p>

          {/* Chips info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="inline-flex items-center gap-3 text-sm bg-white/80 px-4 py-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border"
                 style={{ borderColor: "rgba(43,48,54,0.10)" }}>
              <MapPin size={18} color={COLORS.gold} />
              <div className="font-medium" style={{ color: COLORS.navy }}>
                <span className="opacity-70">Destino:</span>{" "}
                <span style={{ color: COLORS.midnight }}>{pkg.destination}</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-3 text-sm bg-white/80 px-4 py-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border"
                 style={{ borderColor: "rgba(43,48,54,0.10)" }}>
              <Clock size={18} color={COLORS.gold} />
              <div className="font-medium" style={{ color: COLORS.navy }}>
                <span className="opacity-70">Duración:</span>{" "}
                <span style={{ color: COLORS.midnight }}>{pkg.duration}</span>
              </div>
            </div>
            {/**
            <div className="inline-flex items-center gap-3 text-sm bg-white/80 border px-4 py-3 rounded-2xl"
                 style={{ borderColor: "rgba(43,48,54,0.10)" }}>
              <DollarSign size={18} color={COLORS.gold} />
              <div className="font-medium" style={{ color: COLORS.navy }}>
                <span className="opacity-70">Precio:</span>{" "}
                <span style={{ color: COLORS.midnight }}>Desde ${pkg.price}</span>
              </div>
            </div>
            */}
          </div>

          <h3 className="text-xl font-bold mb-3" style={{ color: COLORS.navy }}>
            Incluye
          </h3>
          <ul className="list-none space-y-2 mb-8">
            {pkg.includes.map((item, index) => (
              <li key={index} className="flex items-start" style={{ color: "rgba(20,20,22,0.85)" }}>
                <CheckCircle
                  size={18}
                  color={COLORS.gold}
                  className="mr-3 mt-0.5 flex-shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
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
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold bg-white border hover:text-[#141416] botonCerrarModal"
              style={{
                color: COLORS.navy,
                borderColor: "rgba(43,48,54,0.20)",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* acentos suaves en el fondo (decorativos) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(closest-side, ${COLORS.gold}, transparent)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ background: `radial-gradient(closest-side, ${COLORS.navy}, transparent)` }} // ahora pizarra, no azul Boca
        />
      </motion.div>
    </motion.div>
  );
};

export default PackageModal;
