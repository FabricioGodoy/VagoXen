import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const COLORS = {
  // Fondo general sección
  bgGradientFrom: "#141416", // midnight
  bgGradientTo: "#2b3036",   // navy

  // Panel principal
  cardBg: "rgba(20, 20, 22, 0.9)",
  cardBorder: "rgba(237, 229, 218, 0.12)",
  cardShadow: "0 24px 60px rgba(0, 0, 0, 0.65)",

  // Texto
  textMain: "#EDE5DA",                    // sand claro
  textMuted: "rgba(237, 229, 218, 0.7)",
  textSoft: "rgba(237, 229, 218, 0.55)",

  // Dorados
  gold: "#d2983a",
  goldSoft: "rgba(210, 152, 58, 0.16)",
  goldSoftBorder: "rgba(210, 152, 58, 0.45)",

  // Inputs
  inputBg: "rgba(10, 10, 12, 0.9)",
  inputBorder: "rgba(237, 229, 218, 0.22)",
  inputPlaceholder: "rgba(237, 229, 218, 0.4)",
  inputFocusRing: "rgba(210, 152, 58, 0.6)",

  // Botones
  buttonPrimaryBg: "#d2983a",
  buttonPrimaryBgHover: "#f0a840",
  buttonPrimaryText: "#141416",

  buttonOutlineBorder: "rgba(237, 229, 218, 0.5)",
  buttonOutlineBgHover: "rgba(237, 229, 218, 0.08)",

  // Iconos
  iconAccent: "#d2983a",

  // Separadores
  divider: "rgba(237, 229, 218, 0.16)",

  // Glow decorativo
  glow1: "rgba(210, 152, 58, 0.18)",
  glow2: "rgba(210, 152, 58, 0.12)",
};

const phone = "+5491133779222";
const defaultMsg = "AWANTE BOKITA, QUIERO COMPRAR UNA REMERA";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const normalizedPhone = phone.replace("+", "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="contact"
      className="relative py-20 overflow-hidden"
      style={{
        background: `radial-gradient(circle at top, ${COLORS.bgGradientTo}, ${COLORS.bgGradientFrom})`,
      }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Glows decorativos */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 10% 0%, ${COLORS.glow1}, transparent 55%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 90% 100%, ${COLORS.glow2}, transparent 55%)`,
        }}
      />

      <div className="relative container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border text-xs font-semibold tracking-wide uppercase"
            style={{
              backgroundColor: COLORS.goldSoft,
              borderColor: COLORS.goldSoftBorder,
              color: COLORS.textMain,
            }}
          >
            <span>Contacto</span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "999px",
                backgroundColor: COLORS.gold,
              }}
            />
            <span>Vagos 12</span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{ color: COLORS.textMain }}
          >
            Hablemos de{" "}
            <span style={{ color: COLORS.gold }}>remeras bostera</span>
          </h2>
          <p
            className="max-w-2xl mx-auto text-sm md:text-base"
            style={{ color: COLORS.textMuted }}
          >
            Tenés una idea, una duda o querés cerrar tu pedido ahora mismo. Nos
            escribís y lo resolvemos rápido, sin vueltas.
          </p>
        </motion.div>

        {/* Card principal */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 p-6 md:p-10 shadow-2xl"
          style={{
            backgroundColor: COLORS.cardBg,
            borderColor: COLORS.cardBorder,
            boxShadow: COLORS.cardShadow,
          }}
        >
          {/* Columna izquierda: info + WhatsApp */}
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: COLORS.textMain }}
              >
                ¿Querés hacer un pedido?
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: COLORS.textMuted }}
              >
                Escribinos por WhatsApp o dejá tu mensaje en el formulario y te
                respondemos a la brevedad. Podés consultar stock, talles,
                combos, envíos y lo que necesites.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: COLORS.goldSoft,
                    }}
                  >
                    <Phone
                      size={20}
                      strokeWidth={1.8}
                      style={{ color: COLORS.iconAccent }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase font-semibold tracking-wide mb-0.5"
                      style={{ color: COLORS.textSoft }}
                    >
                      WhatsApp directo
                    </p>
                    <a
                      href={`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
                        defaultMsg
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold"
                      style={{ color: COLORS.textMain }}
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: COLORS.goldSoft,
                    }}
                  >
                    <Mail
                      size={20}
                      strokeWidth={1.8}
                      style={{ color: COLORS.iconAccent }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase font-semibold tracking-wide mb-0.5"
                      style={{ color: COLORS.textSoft }}
                    >
                      Email
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: COLORS.textMain }}
                    >
                      vagos@masvagos.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: COLORS.goldSoft,
                    }}
                  >
                    <MapPin
                      size={20}
                      strokeWidth={1.8}
                      style={{ color: COLORS.iconAccent }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase font-semibold tracking-wide mb-0.5"
                      style={{ color: COLORS.textSoft }}
                    >
                      Desde
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: COLORS.textMain }}
                    >
                      Donde el puchero se cocina a los balazos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA WhatsApp */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
                  defaultMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm md:text-base font-bold transition-all duration-200 shadow-md hover:shadow-xl"
                style={{
                  backgroundColor: COLORS.buttonPrimaryBg,
                  color: COLORS.buttonPrimaryText,
                }}
              >
                Hablar por WhatsApp
                <span className="text-lg">↗</span>
              </a>
              <span
                className="text-xs md:text-sm"
                style={{ color: COLORS.textSoft }}
              >
                Respondemos lo antes posible. Si es día de partido, bancanos un
                poquito más. 💛💙
              </span>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: COLORS.textSoft }}
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: COLORS.inputBg,
                  border: `1px solid ${COLORS.inputBorder}`,
                  color: COLORS.textMain,
                }}
                placeholder="Cómo te llamás"
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow = `0 0 0 1px ${COLORS.inputFocusRing}`)
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: COLORS.textSoft }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: COLORS.inputBg,
                  border: `1px solid ${COLORS.inputBorder}`,
                  color: COLORS.textMain,
                }}
                placeholder="tu.email@ejemplo.com"
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow = `0 0 0 1px ${COLORS.inputFocusRing}`)
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="message"
                className="text-xs font-semibold tracking-wide uppercase"
                style={{ color: COLORS.textSoft }}
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-y transition-all duration-200"
                style={{
                  backgroundColor: COLORS.inputBg,
                  border: `1px solid ${COLORS.inputBorder}`,
                  color: COLORS.textMain,
                  caretColor: COLORS.gold,
                }}
                placeholder="Contanos qué estás buscando..."
                required
                onFocus={(e) =>
                  (e.target.style.boxShadow = `0 0 0 1px ${COLORS.inputFocusRing}`)
                }
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <motion.button
                type="submit"
                className="w-full rounded-xl py-3.5 text-sm md:text-base font-bold transition-all duration-200 shadow-md hover:shadow-xl"
                style={{
                  backgroundColor: COLORS.buttonPrimaryBg,
                  color: COLORS.buttonPrimaryText,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar mensaje
              </motion.button>

              <button
                type="button"
                className="w-full rounded-xl py-3 text-xs md:text-sm font-medium border transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  borderColor: COLORS.buttonOutlineBorder,
                  color: COLORS.textMuted,
                }}
                onClick={() =>
                  window.open(
                    `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(
                      defaultMsg
                    )}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    COLORS.buttonOutlineBgHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Prefiero WhatsApp
              </button>
            </div>

            <p
              className="text-[11px] leading-relaxed mt-1"
              style={{ color: COLORS.textSoft }}
            >
              No hacemos spam ni cadenas eternas. Solo usamos tus datos para
              responder tu consulta y coordinar tu pedido.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
