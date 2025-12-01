import React from "react";
import { motion } from "framer-motion";
import { Palette, Heart, Sparkles } from "lucide-react";

const COLORS = {
  // Fondo base (similar al modal)
  backgroundFrom: "#000110",
  backgroundMid: "#041024",
  backgroundTo: "#1c4985",

  // Texto (clarito para fondo oscuro)
  textMain: "#f7f4e6",
  textMain80: "rgba(247, 244, 230, 0.80)",
  textMain70: "rgba(247, 244, 230, 0.70)",
  textMain60: "rgba(247, 244, 230, 0.60)",

  // Dorados
  gold: "#d2983a",
  goldAlt: "#f0a840",

  goldSoft5: "rgba(210, 152, 58, 0.05)",
  goldSoft10: "rgba(210, 152, 58, 0.10)",
  goldSoft20: "rgba(210, 152, 58, 0.20)",
  goldGlow1: "rgba(210, 152, 58, 0.12)",
  goldGlow2: "rgba(210, 152, 58, 0.10)",

  // Fondos de tarjetas / bloques
  cardBg: "rgba(4, 16, 36, 0.95)",      // navy casi sólido
  contentBg: "rgba(2, 10, 26, 0.95)",   // bloque principal

  // Líneas divisorias
  divider: "rgba(210, 152, 58, 0.35)",
};

const AboutSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const FeatureCard = ({ Icon, title, desc }) => (
    <motion.div
      variants={itemVariants}
      className="group relative rounded-2xl p-6 backdrop-blur-sm border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(12, 32, 68, 0.95), rgba(0, 1, 16, 0.95))`,
        color: COLORS.textMain,
        borderColor: COLORS.goldSoft20,
      }}
    >
      <div
        className="absolute inset-x-0 -top-px h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
        }}
      />

      <div
        className="w-14 h-14 mb-5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(210,152,58,0.25), rgba(210,152,58,0.05))`,
        }}
      >
        <Icon className="w-7 h-7" color={COLORS.gold} strokeWidth={2} />
      </div>

      <h3
        className="text-xl font-bold mb-2 transition-colors duration-300"
        style={{ color: COLORS.textMain }}
      >
        {title}
      </h3>
      <p
        className="leading-relaxed text-sm"
        style={{ color: COLORS.textMain70 }}
      >
        {desc}
      </p>
    </motion.div>
  );

  return (
    <motion.section
      id="about"
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(
          135deg,
          ${COLORS.backgroundFrom} 0%,
          ${COLORS.backgroundMid} 45%,
          ${COLORS.backgroundTo} 100%
        )`,
      }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Glows dorados suaves */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 15%, ${COLORS.goldGlow1}, transparent 55%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 80% 85%, ${COLORS.goldGlow2}, transparent 55%)`,
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
            style={{
              backgroundColor: "rgba(3, 14, 32, 0.85)",
              borderColor: COLORS.goldSoft20,
            }}
          >
            <Sparkles className="w-4 h-4" color={COLORS.gold} />
            <span
              className="text-sm font-semibold"
              style={{ color: COLORS.goldAlt }}
            >
              Sobre nosotros
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
            style={{ color: COLORS.textMain }}
          >
            Ropa para{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${COLORS.gold}, ${COLORS.goldAlt})`,
              }}
            >
              el hincha
            </span>
            <br />
            de BOCA
          </h2>

          <div className="flex justify-center mb-8">
            <span
              className="h-1 w-20 rounded-full"
              style={{
                background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
              }}
            />
          </div>
        </motion.div>

        {/* Content principal */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-16">
          <div
            className="rounded-3xl p-8 md:p-12 border shadow-xl backdrop-blur-sm"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(5, 18, 40, 0.96), rgba(0, 1, 16, 0.96))",
              borderColor: COLORS.goldSoft20,
            }}
          >
            <p
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: COLORS.textMain80 }}
            >
              No tenemos décadas de historia.{" "}
              <span className="font-semibold" style={{ color: COLORS.gold }}>
                Tenemos algo mejor
              </span>
              : ganas, pasión genuina y el sueño de dos hinchas de Boca que
              dijeron "hagámoslo".
            </p>

            <p
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: COLORS.textMain80 }}
            >
              Cada remera que hacemos lleva horas de diseño, ajustes hasta que
              quede perfecta, y ese{" "}
              <span className="font-semibold" style={{ color: COLORS.textMain }}>
                amor bostero
              </span>{" "}
              que solo entiende quien vivió La Bombonera desde adentro.
            </p>

            <p
              className="text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: COLORS.textMain80 }}
            >
              No somos una marca gigante ni pretendemos serlo. Somos auténticos,
              trabajamos de verdad en cada detalle, y estamos orgullosos de
              empezar desde abajo,{" "}
              <span className="font-semibold" style={{ color: COLORS.gold }}>
                como Boca nos enseñó
              </span>
              .
            </p>

            <div
              className="pt-6 border-t"
              style={{ borderColor: COLORS.divider }}
            >
              <p
                className="text-xl md:text-2xl font-bold text-center"
                style={{ color: COLORS.textMain }}
              >
                Si sos hincha de verdad, esto es para vos. 💙💛
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            Icon={Palette}
            title="Diseños únicos"
            desc="Cada estampa es exclusiva, pensada con criterio bostero y diseñada con amor al detalle. Nada de copiar y pegar."
          />
          <FeatureCard
            Icon={Heart}
            title="Calidad real"
            desc="Usamos telas premium y técnicas de estampado duraderas. No vendemos promesas: vendemos remeras que van a durar."
          />
          <FeatureCard
            Icon={Sparkles}
            title="Fresh & auténtico"
            desc="Somos nuevos, sí. Pero eso nos hace más genuinos, más cercanos y con más hambre de hacer las cosas bien."
          />
        </div>

        {/* CTA opcional (siguiendo paleta oscura) */}
        {/*
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p
            className="text-sm md:text-base mb-6"
            style={{ color: COLORS.textMain60 }}
          >
            Seguimos creciendo, diseño a diseño, hincha a hincha. ¿Te sumás?
          </p>
          <a
            href="#remeras"
            className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            style={{
              backgroundColor: COLORS.gold,
              color: COLORS.midnight,
            }}
          >
            Ver Remeras
            <span className="text-xl">→</span>
          </a>
        </motion.div>
        */}
      </div>

      {/* WhatsApp Button (se mantiene igual, apoyado sobre el fondo oscuro) */}
      <a
        href="https://wa.me/+5491133779222"
        className="btn-flotante"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://img.icons8.com/office/40/whatsapp--v1.png"
          alt="wpp"
        />
      </a>
    </motion.section>
  );
};

export default AboutSection;
