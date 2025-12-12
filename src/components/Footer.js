import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// Paleta centralizada
const COLORS = {
  midnight: "#141416", /* parte de arriba degrade */
  navy: "#2b3036", /* parte de abajo degrade */
  gold: "#d2983a",
  // Footer
  footerText: "#EDE5DA",
  footerTextMuted: "rgba(237, 229, 218, 0.8)",
  footerTextMuted70: "rgba(237, 229, 218, 0.7)",
  footerBorderTop: "rgba(210, 152, 58, 0.35)",

  // Sociales
  socialText: "rgba(237, 229, 218, 0.8)",
  socialBorder: "rgba(255, 255, 255, 0.10)",
  socialHoverText: "#d2983a",
  socialHoverBorder: "rgba(210, 152, 58, 0.60)",
  socialHoverBg: "rgba(255, 255, 255, 0.05)",
  socialFocusRing: "rgba(210, 152, 58, 0.60)",

  // Divider
  divider: "#d2983a",
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
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border focus:outline-none"
      style={{
        color: COLORS.socialText,
        borderColor: COLORS.socialBorder,
        backgroundColor: "transparent",
      }}
      whileHover={{
        scale: 1.1,
        color: COLORS.socialHoverText,
        borderColor: COLORS.socialHoverBorder,
        backgroundColor: COLORS.socialHoverBg,
      }}
      whileTap={{ scale: 0.94 }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 2px ${COLORS.socialFocusRing}`;
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </motion.a>
  );

  return (
    <motion.footer
      className="border-t"
      style={{
        borderTopColor: COLORS.footerBorderTop,
        backgroundImage: `linear-gradient(to bottom, ${COLORS.midnight}, ${COLORS.navy})`,
        color: COLORS.footerText,
      }}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 py-12 text-center">
        {/* Logo + descripción */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/logos/svg/puente_amarillo.svg`}
            alt="Logo Xeneize"
            className="logoFooter mb-4 select-none"
          />
          <h3 className="sr-only">Vagos Xeneizes</h3>

          <p
            className="max-w-2xl leading-relaxed"
            style={{ color: COLORS.footerTextMuted }}
          >
             <span className="font-semibold" style={{ color: COLORS.gold }}>
               VAGOS{" "}
              </span> es una marca y comunidad independiente creada por hinchas.
            No posee relación oficial, comercial ni institucional con el Club Atlético Boca Juniors, ni con ninguna de sus marcas registradas.
            Todas las referencias culturales o deportivas se realizan con fines expresivos, editoriales y de identidad comunitaria.
          </p>
        </motion.div>

        {/* Iconos sociales */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mb-8"
        >
          
          <Social href="https://instagram.com/vagoxeneize" label="Instagram">
            <FaInstagram size={18} />
          </Social>
          <Social href="https://twitter.com/vagoxeneize12" label="Twitter">
            <FaTwitter size={18} />
          </Social>
          <Social href="https://instagram.com/vagos.ar" label="Instagram">
            <FaInstagram size={18} />
          </Social>
        
        </motion.div>

        {/* Divider dorado */}
        <motion.div variants={itemVariants} className="flex justify-center mb-4">
          <span
            className="h-[2px] w-24 rounded-full"
            style={{ backgroundColor: COLORS.divider, opacity: 0.8 }}
          />
        </motion.div>

        {/* Copyright */}
        <motion.p
          variants={itemVariants}
          className="text-sm"
          style={{ color: COLORS.footerTextMuted70 }}
        >
          &copy; {new Date().getFullYear()} Vagos. Hecho con pasión azul y oro. Todos los
          derechos reservados.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
