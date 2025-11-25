import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// Paleta: base neutral + acentos del logo
const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#d2983a",
  sand: "#EDE5DA",
};

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const Social = ({ href, label, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border text-[#EDE5DA]/80 border-white/10 hover:text-[#d2983a] hover:border-[#d2983a]/60 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#d2983a]/60"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
    >
      {children}
    </a>
  );

  return (
    <footer
      className="border-t text-[#EDE5DA]"
      style={{
        borderTopColor: "rgba(210,152,58,0.35)", // dorado
        backgroundImage: `linear-gradient(to bottom, ${COLORS.midnight}, ${COLORS.navy})`,
      }}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 py-12 text-center">
        {/* Logo + descripción */}
        <div variants={itemVariants} className="mb-8 flex flex-col items-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/logos/svg/puente_amarillo.svg`}
            alt="Logo Xeneize"
            className="logoFooter mb-4 select-none"
          />
          <h3 className="sr-only">Vagos Xeneizes</h3>

          <p className="text-[#EDE5DA]/80 max-w-2xl leading-relaxed">
            Somos dos hinchas que crecimos soñando con estos colores. Diseñamos cada prenda con
            el amor, la pasión y el orgullo que nos despierta Boca. No somos una marca gigante:
            somos corazón, esfuerzo y sentimiento azul y oro. Gracias por bancar este proyecto
            hecho por y para xeneizes.
          </p>
        </div>

        {/* Iconos sociales */}
        <div variants={itemVariants} className="flex justify-center gap-4 mb-8">
          <Social href="https://facebook.com" label="Facebook">
            <FaFacebookF size={18} />
          </Social>
          <Social href="https://twitter.com" label="Twitter">
            <FaTwitter size={18} />
          </Social>
          <Social href="https://instagram.com" label="Instagram">
            <FaInstagram size={18} />
          </Social>
          <Social href="https://linkedin.com" label="LinkedIn">
            <FaLinkedinIn size={18} />
          </Social>
        </div>

        {/* Divider dorado */}
        <div variants={itemVariants} className="flex justify-center mb-4">
          <span className="h-[2px] w-24 bg-[#d2983a] rounded-full opacity-80" />
        </div>

        {/* Copyright */}
        <p variants={itemVariants} className="text-sm text-[#EDE5DA]/70">
          &copy; {new Date().getFullYear()} Vagos Xeneizes. Hecho con pasión azul y oro. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
