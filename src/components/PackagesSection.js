import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PackageCard from "./PackageCard";
import PackageModal from "./PackageModal";
import { travelPackages } from "../mock/packages";

// Paleta: base neutral + acentos del logo
const COLORS = {
  midnight: "#141416", // grafito
  navy: "#2b3036",     // gris pizarra
  gold: "#d2983a",     // dorado
  sand: "#EDE5DA",     // arena
};

const PackagesSection = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPackage = (pkg) => setSelectedPackage(pkg);
  const handleCloseModal = () => setSelectedPackage(null);

  // Sólo mostramos 3 productos (como el ejemplo de Vans)
  const visiblePackages = travelPackages.slice(0, 3);

  return (
    <section
      id="packages"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="relative py-20 overflow-hidden bg-gradient-to-br"
      style={{
        backgroundImage: `linear-gradient(135deg, ${COLORS.sand} 0%, #ffffff 55%, ${COLORS.navy}1A 100%)`,
      }}
    >
      {/* Filetes dorados sutiles */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `${COLORS.gold}1A` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: `${COLORS.gold}4D` }}
      />

      {/* manchas de luz */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${COLORS.navy}33` }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${COLORS.midnight}1A` }}
      />

      {/* TÍTULO EN CONTAINER (LO MISMO QUE TENÍAS) */}
      <div className="container mx-auto px-4 max-w-6xl relative">
        <h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-6"
          style={{ color: COLORS.midnight }}
        >
          Nuestras{" "}
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-xl"
            style={{ color: COLORS.gold }}
          >
            Remeras
          </span>
        </h2>

        <div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex justify-center mb-12"
        >
          <span
            className="h-[2px] w-24 rounded-full"
            style={{ background: COLORS.gold }}
          />
        </div>
      </div>

      {/* BLOQUE FULL-WIDTH PARA LAS CARDS */}
      <div className="w-full relative h-50">
        {/* DESKTOP/TABLET: 3 columnas de borde a borde */}
        <div className="hidden md:grid grid-cols-3 gap-0 w-full">
          {visiblePackages.map((pkg) => (
            <div key={pkg.id} className="w-full">
              <PackageCard pkg={pkg} onSelectPackage={handleSelectPackage} />
            </div>
          ))}
        </div>

        {/* MOBILE: slider horizontal con snap */}
        <div className="md:hidden w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4">
            {visiblePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="min-w-[80%] snap-center"
              >
                <PackageCard pkg={pkg} onSelectPackage={handleSelectPackage} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <PackageModal pkg={selectedPackage} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default PackagesSection;
