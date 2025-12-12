import React from "react";
import { motion } from "framer-motion";

const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#d2983a",
  sand: "#EDE5DA",

  cardBgFrom: "rgba(43, 48, 54, 0.95)",
  cardBgTo: "rgba(20, 20, 22, 0.95)",

  textMain: "#EDE5DA",
  textSoft: "rgba(237, 229, 218, 0.80)",

  imgOverlayFrom: "rgba(20, 20, 22, 0.80)",
  imgOverlayVia: "rgba(20, 20, 22, 0.25)",
  imgOverlayTo: "transparent",

  borderSoft: "rgba(255, 255, 255, 0.10)",
  badgeBg: "rgba(255, 255, 255, 0.05)",
  badgeText: "rgba(237, 229, 218, 0.80)",

  topLine: "#d2983a",

  buttonBg: "#d2983a",
  buttonBgHover: "#c68a2f",
  buttonBgActive: "#b87f2c",
  buttonText: "#141416",
  buttonFocusRing: "rgba(210, 152, 58, 0.50)",
};

const PackageCard = ({ pkg, onSelectPackage, disableAnimation = false }) => {
  const Wrapper = disableAnimation ? "div" : motion.div;

  // ✅ Preferimos responsive (imageCard). Fallback a legacy (image).
  const imgSrc = pkg?.imageCard?.src || pkg?.image;
  const imgSrcSet = pkg?.imageCard?.srcSet || undefined;

  return (
    <Wrapper
      {...(!disableAnimation && {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.35 },
      })}
      onClick={() => onSelectPackage(pkg)}
      className="
        group relative cursor-pointer rounded-2xl overflow-hidden
        border shadow-xl hover:shadow-2xl hover:-translate-y-1
        transition-all duration-300 flex flex-col
        h-full min-h-[430px]
      "
      style={{
        backgroundImage: `linear-gradient(to bottom, ${COLORS.cardBgFrom}, ${COLORS.cardBgTo})`,
        color: COLORS.textMain,
        borderColor: COLORS.borderSoft,
      }}
    >
      {/* TOP LINE */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ backgroundColor: COLORS.topLine }}
      />

      {/* IMAGEN */}
      <div className="relative h-56 md:h-80 overflow-hidden flex-shrink-0">
        <img
          src={imgSrc}
          srcSet={imgSrcSet}
          sizes="(min-width: 768px) 33vw, 80vw"
          alt={pkg.name}
          className="h-full w-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to top,
              ${COLORS.imgOverlayFrom},
              ${COLORS.imgOverlayVia},
              ${COLORS.imgOverlayTo}
            )`,
          }}
        />

        <h3
          className="absolute bottom-3 left-3 right-3 text-xl md:text-2xl font-extrabold drop-shadow-xl"
          style={{ color: "#d0d0d0ff" }}
        >
          {pkg.name}
        </h3>
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-6 flex flex-col flex-1">
        <p className="mb-3 md:mb-4 flex-shrink-0" style={{ color: COLORS.textSoft }}>
          {pkg.description}
        </p>

        <br />

        <div className="flex-1" />

        {/* BOTÓN */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPackage(pkg);
          }}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 md:py-3 font-semibold shadow-sm hover:shadow transition-all duration-200 text-sm md:text-base"
          style={{
            backgroundColor: COLORS.buttonBg,
            color: COLORS.buttonText,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.buttonBgHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.buttonBg)}
          onMouseDown={(e) => (e.currentTarget.style.backgroundColor = COLORS.buttonBgActive)}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.buttonFocusRing}`)
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          Ver Detalles
        </motion.button>
      </div>
    </Wrapper>
  );
};

export default PackageCard;
