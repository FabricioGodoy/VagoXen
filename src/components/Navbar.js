import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";

const COLORS = {
  bg: "rgba(0, 1, 16, 0.82)",
  border: "rgba(210, 152, 58, 0.28)",
  text: "#EDE5DA",
  muted: "rgba(237, 229, 218, 0.68)",
  gold: "#d2983a",
  blue: "#1c4985",
};

const navItems = [
  { name: "Inicio", href: "/", type: "route" },
  { name: "Remeras", href: "#packages", type: "section" },
  { name: "Nosotros", href: "/nosotros", type: "route" },
  { name: "Contacto", href: "/contacto", type: "route" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
    }
  }, [location.pathname]);

  const goToProducts = (event) => {
    event.preventDefault();
    closeMenu();
    setActiveSection("#packages");
    navigate("/");

    window.setTimeout(() => {
      document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const renderLink = (item, mobile = false) => {
    const isActive =
      item.type === "section"
        ? location.pathname === "/" && activeSection === item.href
        : !activeSection && location.pathname === item.href;
    const className = mobile
      ? "flex items-center justify-between border-b border-white/10 px-5 py-4 text-base font-medium"
      : "relative text-sm font-medium tracking-wide transition-colors duration-200";

    if (item.type === "section") {
      return (
        <a
          key={item.name}
          href={item.href}
          onClick={goToProducts}
          className={className}
          style={{ color: isActive ? COLORS.gold : mobile ? COLORS.text : COLORS.muted }}
        >
          {item.name}
          {!mobile && isActive && (
            <span
              className="absolute -bottom-2 left-0 h-px w-full"
              style={{ backgroundColor: COLORS.gold }}
            />
          )}
        </a>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => {
          closeMenu();
          setActiveSection("");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={className}
        style={{ color: isActive ? COLORS.gold : mobile ? COLORS.text : COLORS.muted }}
      >
        {item.name}
        {!mobile && isActive && (
          <span
            className="absolute -bottom-2 left-0 h-px w-full"
            style={{ backgroundColor: COLORS.gold }}
          />
        )}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl"
      style={{ backgroundColor: COLORS.bg, borderColor: COLORS.border }}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            setActiveSection("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3"
          aria-label="Vagos inicio"
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/logos/svg/puente_amarillo.svg`}
            alt="Vagos"
            className="h-9 w-auto select-none"
          />
          <span className="hidden text-sm font-semibold tracking-[0.22em] sm:inline" style={{ color: COLORS.text }}>
            VAGOS
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => renderLink(item))}
        </div>

        <a
          href="#packages"
          onClick={goToProducts}
          className="hidden h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 md:inline-flex"
          style={{ backgroundColor: COLORS.gold, color: "#000110" }}
        >
          <ShoppingBag size={17} />
          Comprar
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden"
          style={{ borderColor: "rgba(237, 229, 218, 0.18)", color: COLORS.text }}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t md:hidden"
            style={{
              borderColor: COLORS.border,
              background: `linear-gradient(180deg, ${COLORS.bg}, ${COLORS.blue})`,
            }}
          >
            <div>{navItems.map((item) => renderLink(item, true))}</div>
            <div className="p-4">
              <a
                href="#packages"
                onClick={goToProducts}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold"
                style={{ backgroundColor: COLORS.gold, color: "#000110" }}
              >
                <ShoppingBag size={17} />
                Ver remeras
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
