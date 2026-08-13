import React from "react";
import { motion } from "framer-motion";
import { Heart, Instagram, Sparkles } from "lucide-react";

const COLORS = {
  dark: "#000110",
  blue: "#1c4985",
  text: "#f7f4e6",
  muted: "rgba(247, 244, 230, 0.68)",
  gold: "#d2983a",
  line: "rgba(237, 229, 218, 0.14)",
};

const INSTAGRAM_USER_1 = "vagos.ar";
const INSTAGRAM_USER_2 = "vagoxeneize";

export default function AboutSection() {
  const items = [
    {
      icon: Heart,
      title: "De hinchas para hinchas",
      text: "Una marca independiente nacida desde la comunidad Vago Xeneize.",
    },
    {
      icon: Sparkles,
      title: "Diseno con identidad",
      text: "Grafica, color y referencias pensadas para usarse todos los dias.",
    },
    {
      icon: Instagram,
      title: "Comunidad primero",
      text: "El contacto, las novedades y el aguante pasan por nuestras redes.",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-24"
      style={{ background: `linear-gradient(145deg, ${COLORS.dark} 0%, #041024 58%, ${COLORS.blue} 100%)` }}
    >
      <div className="absolute inset-x-0 top-[72px] h-px" style={{ backgroundColor: "rgba(210, 152, 58, 0.24)" }} />
      <div className="absolute left-0 top-20 h-96 w-1/2 bg-[radial-gradient(circle_at_top_left,rgba(210,152,58,0.12),transparent_64%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: COLORS.gold }}>
              Nosotros
            </p>
            <h1 className="mt-4 text-5xl font-black leading-none sm:text-6xl" style={{ color: COLORS.text }}>
              Del Puente de La Boca al mundo
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-7 sm:text-lg" style={{ color: COLORS.muted }}>
            VAGOS es una marca sonada, disenada y llevada a cabo por Vago Xeneize: una comunidad de Boca para hinchas de Boca. Somos dos bosteros intentando materializar una forma de vida: llevar los colores con uno, siempre.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.3 }}
              className="rounded-md border p-5"
              style={{ borderColor: COLORS.line, backgroundColor: "rgba(0, 1, 16, 0.34)" }}
            >
              <Icon size={22} color={COLORS.gold} />
              <h2 className="mt-5 text-xl font-black" style={{ color: COLORS.text }}>
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6" style={{ color: COLORS.muted }}>
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {[INSTAGRAM_USER_1, INSTAGRAM_USER_2].map((user) => (
            <div key={user} className="overflow-hidden rounded-md border bg-black/35 p-3" style={{ borderColor: COLORS.line }}>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold" style={{ color: COLORS.text }}>
                  @{user}
                </p>
                <Instagram size={17} color={COLORS.gold} />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-black">
                <iframe
                  src={`https://www.instagram.com/${user}/embed`}
                  title={`Instagram ${user}`}
                  className="h-full w-full"
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
