import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ruler, Truck } from "lucide-react";
import PackageCard from "./PackageCard";
import PackageModal from "./PackageModal";
import { remerasDescripcion } from "../mock/packages";

const COLORS = {
  dark: "#000110",
  panel: "#050b1a",
  blue: "#1c4985",
  text: "#f7f4e6",
  muted: "rgba(247, 244, 230, 0.68)",
  gold: "#d2983a",
  line: "rgba(237, 229, 218, 0.14)",
};

export default function PackagesSection() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const visiblePackages = remerasDescripcion;

  return (
    <section id="packages" className="relative overflow-hidden py-20 sm:py-24" style={{ backgroundColor: COLORS.dark }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "rgba(210, 152, 58, 0.25)" }} />
      <div className="absolute right-0 top-0 h-96 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(28,73,133,0.34),transparent_62%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="mb-10 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: COLORS.gold }}>
              Tienda
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-black leading-none sm:text-5xl" style={{ color: COLORS.text }}>
              La coleccion VAGOS
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 border-y py-4" style={{ borderColor: COLORS.line }}>
              <Truck size={20} color={COLORS.gold} />
              <p className="text-sm leading-5" style={{ color: COLORS.muted }}>
                Envios a todo el pais y coordinacion directa por WhatsApp.
              </p>
            </div>
            <div className="flex items-center gap-3 border-y py-4" style={{ borderColor: COLORS.line }}>
              <Ruler size={20} color={COLORS.gold} />
              <p className="text-sm leading-5" style={{ color: COLORS.muted }}>
                Talles y detalles visibles en cada modelo antes de comprar.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {visiblePackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={[
                "lg:col-span-2",
                visiblePackages.length === 5 && index === 3 ? "lg:col-start-2" : "",
              ].join(" ")}
            >
              <PackageCard
                pkg={pkg}
                onSelectPackage={setSelectedPackage}
                disableAnimation={false}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPackage && <PackageModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />}
      </AnimatePresence>
    </section>
  );
}
