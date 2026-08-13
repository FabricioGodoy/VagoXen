import React from "react";
import { motion } from "framer-motion";
import { Eye, MessageCircle } from "lucide-react";
import { WHATSAPP_PHONE } from "../config";

const COLORS = {
  dark: "#000110",
  surface: "#050b1a",
  text: "#f7f4e6",
  muted: "rgba(247, 244, 230, 0.66)",
  gold: "#d2983a",
  line: "rgba(237, 229, 218, 0.14)",
};

const price = (value) =>
  value ? `$${Number(String(value).replace(/\./g, "")).toLocaleString("es-AR")}` : "Consultar";

const buildWhatsAppLink = (pkg) => {
  const digits = (pkg.whatsappPhone || WHATSAPP_PHONE).replace(/\D/g, "");
  const message = pkg.whatsappMessage || `Hola! Me interesa la remera ${pkg.name}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
};

export default function PackageCard({ pkg, onSelectPackage, disableAnimation = false }) {
  const Wrapper = disableAnimation ? "article" : motion.article;
  const imgSrc = pkg?.imageCard?.src || pkg?.image;
  const imgSrcSet = pkg?.imageCard?.srcSet || undefined;
  const hasDiscount =
    pkg.originalPrice &&
    Number(String(pkg.originalPrice).replace(/\./g, "")) > Number(String(pkg.price).replace(/\./g, ""));

  return (
    <Wrapper
      {...(!disableAnimation && {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.28 },
      })}
      className="group flex h-full min-h-[520px] flex-col overflow-hidden rounded-md border"
      style={{ backgroundColor: COLORS.surface, borderColor: COLORS.line }}
    >
      <button
        type="button"
        onClick={() => onSelectPackage(pkg)}
        className="relative block aspect-[4/5] w-full overflow-hidden text-left"
      >
        <img
          src={imgSrc}
          srcSet={imgSrcSet}
          sizes="(min-width: 1024px) 29vw, (min-width: 768px) 42vw, 92vw"
          alt={pkg.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,1,16,0)_42%,rgba(0,1,16,0.82)_100%)]" />
        {hasDiscount && (
          <span
            className="absolute left-3 top-3 rounded-sm px-2 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ backgroundColor: COLORS.gold, color: COLORS.dark }}
          >
            Oferta
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: COLORS.gold }}>
              {pkg.duration}
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight" style={{ color: COLORS.text }}>
              {pkg.name}
            </h3>
          </div>
          <div className="text-right">
            {hasDiscount && (
              <p className="text-xs line-through" style={{ color: COLORS.muted }}>
                {price(pkg.originalPrice)}
              </p>
            )}
            <p className="text-lg font-black" style={{ color: COLORS.text }}>
              {price(pkg.price)}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6" style={{ color: COLORS.muted }}>
          {pkg.description}
        </p>

        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-6">
          <button
            type="button"
            onClick={() => onSelectPackage(pkg)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition-colors duration-200 hover:bg-white/10"
            style={{ borderColor: COLORS.line, color: COLORS.text }}
          >
            <Eye size={16} />
            Detalles
          </button>
          <a
            href={buildWhatsAppLink(pkg)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar ${pkg.name} por WhatsApp`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: COLORS.gold, color: COLORS.dark }}
          >
            <MessageCircle size={17} />
          </a>
        </div>
      </div>
    </Wrapper>
  );
}
