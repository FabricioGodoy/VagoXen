import React from "react";
import { motion } from "framer-motion";
import { Palette, Heart, Sparkles } from "lucide-react";


// 🔗 Redes (cambiá estos handles por los tuyos reales)
const INSTAGRAM_USER_1 = "vagos.ar"; // ej: "vagos.remeras"
const INSTAGRAM_USER_2 = "vagoxeneize"; // ej: "vagos.boca"
const TWITTER_USER = "vagoxeneize12";    // ej: "vagos_ok";



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
               <span className="font-semibold" style={{ color: COLORS.gold }}>
               VAGOS{" "}
              </span> es una marca soñada, diseñada y llevada a cabo por Vago Xeneize, una comunidad de Boca para hinchas de Boca. Somos dos bosteros que buscan vivir  <span className="font-semibold" style={{ color: COLORS.gold }}>
               A LO BOCA{" "}
              </span> todos los días, y  <span className="font-semibold" style={{ color: COLORS.gold }}>
               VAGOS{" "}
              </span> es nuestra manera de materializar ese estilo de vida. Una forma de llevar a Boca con uno, siempre, en cualquier momento y lugar.
              
              <br/>
              <br/>
              
             <span className="font-semibold" style={{ color: COLORS.gold }}>
               VAGOS{" "}
              </span> nace de bosteros para bosteros. Para los que caminan, sienten y viven azul y oro. No somos diseñadores, no tenemos fábricas ni sabemos editar reels o TikToks… pero acá estamos, haciendo lo que sentimos, convencidos de que <span className="font-semibold" style={{ color: COLORS.gold }}>
               A LO BOCA{" "}
              </span> se vive mejor y de que era hora de crear algo que nos represente de verdad.
               <br/>
              <br/>
              Esta es nuestra primera colección, y confiamos en que será la primera de muchas. Si estás leyendo esto, gracias por el aguante en estos primeros pasos.
 <br/>
              <br/>
              Del Puente de La Boca al mundo.
            Esto es <span className="font-semibold" style={{ color: COLORS.gold }}>
               VAGOS{" "}
              </span>.


            </p>
{/* 
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
            </div> */}
          </div>
        </motion.div>

        {/* Feature Cards */}
{/* Redes sociales embebidas */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 justify-items-center">

  {/* Instagram 1 */}
  <div className="rounded-2xl border border-white/10 bg-black/40 p-3 md:p-4 shadow-lg">
    <h3 className="text-sm font-semibold mb-2 text-[#EDE5DA]">
      Vagos
    </h3>
    <div className="w-full rounded-xl overflow-hidden bg-black aspect-[4/3]">
      <iframe
        src={`https://www.instagram.com/${INSTAGRAM_USER_1}/embed`}
        title="Instagram feed 1"
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
      />
    </div>
  </div>

  {/* Instagram 2 */}
  <div className="rounded-2xl border border-white/10 bg-black/40 p-3 md:p-4 shadow-lg">
    <h3 className="text-sm font-semibold mb-2 text-[#EDE5DA]">
      Vago Xeneize
    </h3>
    <div className="w-full rounded-xl overflow-hidden bg-black aspect-[4/3]">
      <iframe
        src={`https://www.instagram.com/${INSTAGRAM_USER_2}/embed`}
        title="Instagram feed 2"
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        loading="lazy"
      />
    </div>
  </div>

  {/* Twitter */}
{/* <div className="rounded-2xl border border-white/10 bg-black/40 p-3 md:p-4 shadow-lg">
  <h3 className="text-sm font-semibold mb-2 text-[#EDE5DA]">
    Twitter / X
  </h3>
  <TwitterFrame />
</div>
 */}


</div>



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
