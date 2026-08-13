import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const SERVICE_ID = "service_6nlisl4";
const TEMPLATE_ID = "template_svse0xk";
const PUBLIC_KEY = "5tS8UDmLXl4gZ4ZcG";

const COLORS = {
  dark: "#000110",
  surface: "#050b1a",
  text: "#f7f4e6",
  muted: "rgba(247, 244, 230, 0.68)",
  soft: "rgba(247, 244, 230, 0.48)",
  gold: "#d2983a",
  line: "rgba(237, 229, 218, 0.16)",
};

const phone = "+5491133779222";
const defaultMsg = "AGUANTE BOCA LOCO. Me interesa una remera de Vagos.";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const normalizedPhone = phone.replace(/\D/g, "");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name,
          email,
          message,
          from_name: name,
          reply_to: email,
          sent_at: new Date().toLocaleString(),
        },
        PUBLIC_KEY
      )
      .then(
        () => {
          alert("Mensaje enviado con exito.");
          setFormData({ name: "", email: "", message: "" });
        },
        () => {
          alert("Hubo un error al enviar el mensaje. Proba de nuevo en un rato.");
        }
      );
  };

  const inputStyle = {
    backgroundColor: "rgba(0, 1, 16, 0.66)",
    borderColor: COLORS.line,
    color: COLORS.text,
  };

  return (
    <section className="relative overflow-hidden py-32" style={{ backgroundColor: COLORS.dark }}>
      <div className="absolute inset-x-0 top-[72px] h-px" style={{ backgroundColor: "rgba(210, 152, 58, 0.24)" }} />
      <div className="absolute right-0 top-0 h-96 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(28,73,133,0.32),transparent_64%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: COLORS.gold }}>
            Contacto
          </p>
          <h1 className="mt-4 text-5xl font-black leading-none sm:text-6xl" style={{ color: COLORS.text }}>
            Compra simple, sin vueltas
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7" style={{ color: COLORS.muted }}>
            Escribinos para consultar stock, talles, combos o envios. Respondemos por WhatsApp o email y coordinamos el pedido directo.
          </p>

          <div className="mt-10 grid gap-5 border-y py-6" style={{ borderColor: COLORS.line }}>
            <a
              href={`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(defaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4"
            >
              <Phone size={20} color={COLORS.gold} />
              <span>
                <span className="block text-sm font-semibold" style={{ color: COLORS.text }}>
                  WhatsApp directo
                </span>
                <span className="mt-1 block text-sm" style={{ color: COLORS.muted }}>
                  {phone}
                </span>
              </span>
            </a>
            <div className="flex items-start gap-4">
              <Mail size={20} color={COLORS.gold} />
              <span>
                <span className="block text-sm font-semibold" style={{ color: COLORS.text }}>
                  Email
                </span>
                <span className="mt-1 block text-sm" style={{ color: COLORS.muted }}>
                  vagosx12@gmail.com
                </span>
              </span>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={20} color={COLORS.gold} />
              <span>
                <span className="block text-sm font-semibold" style={{ color: COLORS.text }}>
                  Envios
                </span>
                <span className="mt-1 block text-sm" style={{ color: COLORS.muted }}>
                  A todo el pais
                </span>
              </span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          onSubmit={handleSubmit}
          className="rounded-md border p-5 sm:p-7"
          style={{ backgroundColor: COLORS.surface, borderColor: COLORS.line }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: COLORS.soft }}>
                Nombre
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md border px-4 text-sm outline-none transition-shadow duration-200 focus:shadow-[0_0_0_1px_rgba(210,152,58,0.75)]"
                style={inputStyle}
                placeholder="Como te llamas"
                required
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: COLORS.soft }}>
                Email
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 h-12 w-full rounded-md border px-4 text-sm outline-none transition-shadow duration-200 focus:shadow-[0_0_0_1px_rgba(210,152,58,0.75)]"
                style={inputStyle}
                placeholder="tu.email@ejemplo.com"
                required
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: COLORS.soft }}>
              Mensaje
            </span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="7"
              className="mt-2 w-full resize-y rounded-md border px-4 py-3 text-sm outline-none transition-shadow duration-200 focus:shadow-[0_0_0_1px_rgba(210,152,58,0.75)]"
              style={inputStyle}
              placeholder="Contanos que estas buscando..."
              required
            />
          </label>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-md text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: COLORS.gold, color: COLORS.dark }}
            >
              Enviar mensaje
            </button>
            <a
              href={`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(defaultMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border px-5 text-sm font-semibold transition-colors duration-200 hover:bg-white/10"
              style={{ borderColor: COLORS.line, color: COLORS.text }}
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>

          <p className="mt-4 text-xs leading-5" style={{ color: COLORS.soft }}>
            Usamos tus datos solo para responder la consulta y coordinar tu pedido.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
