import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "./PackageCard";
import PackageModal from "./PackageModal";
import { remerasDescripcion } from "../mock/packages";

// Paleta: base neutral + acentos del logo
const COLORS = {
  midnight: "#141416", // grafito
  navy: "#2b3036",     // gris pizarra
  gold: "#d2983a",     // dorado
  sand: "#EDE5DA",     // arena

  // Fondo sección
  sectionBgStart: "#1c4985",
  sectionBgMiddle: "#000110",
  sectionBgEnd: "#000110",

  // Filetes
  topBorderLine: "rgba(210, 152, 58, 0.10)",
  bottomBorderLine: "rgba(210, 152, 58, 0.30)",

  // Manchas de luz
  glowTop: "rgba(43, 48, 54, 0.20)",
  glowBottom: "rgba(20, 20, 22, 0.10)",

  // Texto
  titleText: "#141416",
  titleAccentText: "#d2983a",
  titleAccentText2: "#d0d0d0ff",
  divider: "#d2983a",
};

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPackage = (pkg) => setSelectedPackage(pkg);
  const handleCloseModal = () => setSelectedPackage(null);

  // Sólo mostramos 3 productos
  const visiblePackages = remerasDescripcion.slice(0, 3);

  return (
    <section
      id="packages"
      className="relative pt-[2em] overflow-hidden bg-gradient-to-br"
      style={{
        backgroundImage: `linear-gradient(
          135deg,
          ${COLORS.sectionBgStart} 0%,
          ${COLORS.sectionBgMiddle} 55%,
          ${COLORS.sectionBgEnd} 100%
        )`,
      }}
    >
      {/* Filetes dorados sutiles */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: COLORS.topBorderLine }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: COLORS.bottomBorderLine }}
      />

      {/* manchas de luz */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: COLORS.glowTop }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: COLORS.glowBottom }}
      />

      {/* CONTENIDO que aparece al hacer scroll (texto + cards) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.35 }}
        className="relative"
      >
        {/* TÍTULO */}
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 1, y: 0 }} // ya viene animado por el wrapper
            className="text-4xl md:text-5xl font-extrabold text-center mb-6"
            style={{ color: COLORS.titleText }}
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-xl"
              style={{ color: COLORS.titleAccentText }}
            >
              VAGOS
            </span>
            <br />
            <br />
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-xl"
              style={{ color: COLORS.titleAccentText2 }}
            >
              Nuestras{" "}
            </span>

            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-xl"
              style={{ color: COLORS.titleAccentText }}
            >
              Remeras
            </span>
          </motion.h2>

          <div className="flex justify-center mb-12">
            <span
              className="h-[2px] w-24 rounded-full"
              style={{ background: COLORS.divider }}
            />
          </div>
        </div>

        {/* BLOQUE FULL-WIDTH PARA LAS CARDS */}
        <div className="w-full relative">
          {/* DESKTOP/TABLET: 3 columnas de borde a borde */}
          <div className="hidden md:grid grid-cols-3 gap-0 w-full items-stretch">
            {visiblePackages.map((pkg) => (
              <div key={pkg.id} className="w-full h-full">
                <PackageCard
                  pkg={pkg}
                  onSelectPackage={handleSelectPackage}
                  disableAnimation={true} // que entren junto con el texto
                />
              </div>
            ))}
          </div>

          {/* MOBILE: slider horizontal */}
          <div className="md:hidden w-full">
            <div className="flex overflow-x-auto snap-mandatory gap-4 px-4 pb-4">
              {visiblePackages.map((pkg) => (
                <div key={pkg.id} className="min-w-[80%] snap-center">
                  <PackageCard
                    pkg={pkg}
                    onSelectPackage={handleSelectPackage}
                    disableAnimation={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <PackageModal pkg={selectedPackage} onClose={handleCloseModal} />
        )}
      </AnimatePresence>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  );
};

export default PackagesSection;
