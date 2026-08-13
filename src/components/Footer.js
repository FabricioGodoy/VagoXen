import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

const COLORS = {
  dark: "#000110",
  surface: "#050b1a",
  text: "#EDE5DA",
  muted: "rgba(237, 229, 218, 0.62)",
  gold: "#d2983a",
  line: "rgba(237, 229, 218, 0.14)",
};

const Social = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="grid h-10 w-10 place-items-center rounded-md border transition-colors duration-200 hover:bg-white/10"
    style={{ borderColor: COLORS.line, color: COLORS.text }}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.line, color: COLORS.text }}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/img/logos/svg/puente_amarillo.svg`}
            alt="Vagos"
            className="h-9 w-auto select-none"
          />
          <p className="mt-5 max-w-3xl text-sm leading-6" style={{ color: COLORS.muted }}>
            VAGOS es una marca y comunidad independiente creada por hinchas. No posee relacion oficial, comercial ni institucional con el Club Atletico Boca Juniors.
          </p>
          <p className="mt-3 text-xs" style={{ color: "rgba(237, 229, 218, 0.42)" }}>
            &copy; {new Date().getFullYear()} Vagos. Hecho con pasion azul y oro.
          </p>
        </div>

        <div className="flex gap-3">
          <Social href="https://instagram.com/vagoxeneize" label="Instagram Vago Xeneize">
            <FaInstagram size={17} />
          </Social>
          <Social href="https://instagram.com/vagos.ar" label="Instagram Vagos">
            <FaInstagram size={17} />
          </Social>
          <Social href="https://twitter.com/vagoxeneize12" label="Twitter">
            <FaTwitter size={17} />
          </Social>
        </div>
      </div>
    </footer>
  );
}
