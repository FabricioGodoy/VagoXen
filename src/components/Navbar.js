import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const COLORS = {
  // Paleta base
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#C1121F", // rojo que ya venías usando acá
  sand: "#EDEDED",

  // Navbar desktop
  navBgFrom: "#ffffff",
  navBgTo: "rgba(182, 182, 182, 0.95)",
  navBorderBottom: "#d2983a", // dorado del resto del proyecto
  navText: "#ede350",
  navTextActive: "#d2983a",
  navTextHover: "#d2983a",
  navIndicator: "#d2983a",

  // Botón mobile (icono menú)
  mobileButtonText: "#ede350",
  mobileButtonTextHover: "#d2983a",
  focusRing: "#031c4f)",
  ringOffsetColor: "transparent",

  // Mobile menu
  mobileMenuBorder: "rgba(193, 18, 31, 0.25)",
  mobileMenuBgFrom: "rgba(20, 20, 22, 0.95)",   // midnight/95
  mobileMenuBgTo: "rgba(43, 48, 54, 0.95)",     // navy/95
  mobileItemText: "#EDEDED",
  mobileItemTextHover: "#d2983a",
  mobileItemBgHover: "rgba(255, 255, 255, 0.05)",
  mobileBottomBar: "#EDEDED",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { name: "Inicio", href: "/", type: "route" },
    { name: "Nosotros", href: "/nosotros", type: "route" },
    { name: "Remeras", href: "#packages", type: "home-section" },
    { name: "Contacto", href: "/contacto", type: "route" },
  ];

  const toggleMenu = () => setIsOpen((v) => !v);

  const handleScrollInSamePage = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(`#${id}`);
      setIsOpen(false);
    }
  };

  // Ir al Home y luego scrollear hasta #packages
  const goToHomeSection = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    setActive(`#${id}`);

    navigate("/");

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
/*     <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "bg-gradient-to-b",
        "backdrop-blur-xl",
        "shadow-lg",
        "border-b",
      ].join(" ")}
      style={{
        color: COLORS.navText,
        backgroundImage: `linear-gradient(to bottom, ${COLORS.navBgFrom}, ${COLORS.navBgTo})`,
        borderBottomColor: COLORS.navBorderBottom,
      }}
    > */
     
     <motion.nav
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3 }}
  className={[
    "fixed top-0 left-0 right-0 z-50",
    "bg-gradient-to-r",
    "backdrop-blur-xl",
    "shadow-lg",
    "border-b",
  ].join(" ")}
  style={{
    color: COLORS.navText,
    backgroundImage:
      "linear-gradient(to right, #000000)",/* , #031c4f, #cec53fff */
/* ede350f */    borderBottomColor: COLORS.navBorderBottom,
  }}
>

     <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("/");
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/logos/svg/puente_amarillo.svg`}
            alt="PUENTE logo"
            className="logoNavBar h-10vh w-auto select-none"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = active === item.href;
            const baseClasses =
              "relative group font-medium transition-colors duration-300 text-[color:var(--nav-color)] hover:text-[color:var(--nav-hover-color)]";

            const indicator = (
              <span
                className={[
                  "absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0",
                  "bg-[color:var(--nav-indicator-color)] transition-transform duration-300",
                  "group-hover:scale-x-100",
                  isActive ? "scale-x-100" : "",
                ].join(" ")}
                style={{
                  "--nav-indicator-color": COLORS.navIndicator,
                }}
              />
            );

            const commonStyle = {
              "--nav-color": isActive ? COLORS.navTextActive : COLORS.navText,
              "--nav-hover-color": COLORS.navTextHover,
            };

            if (item.type === "route") {
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setActive(item.href);
                    setIsOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={baseClasses}
                  style={commonStyle}
                >
                  {item.name}
                  {indicator}
                </Link>
              );
            }

            if (item.type === "home-section") {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) =>
                    item.href === "/"
                      ? handleScrollInSamePage(e, "")
                      : goToHomeSection(e, item.href.substring(1))
                  }
                  className={baseClasses}
                  style={commonStyle}
                >
                  {item.name}
                  {indicator}
                </a>
              );
            }

            return null;
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 text-[color:var(--nav-mobile-button-color)] hover:text-[color:var(--nav-mobile-button-hover-color)]"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            style={{
              "--nav-mobile-button-color": COLORS.mobileButtonText,
              "--nav-mobile-button-hover-color": COLORS.mobileButtonTextHover,
              "--tw-ring-color": COLORS.focusRing,
              "--tw-ring-offset-color": COLORS.ringOffsetColor,
            }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t"
            style={{ borderColor: COLORS.mobileMenuBorder }}
          >
            <div
              className="bg-gradient-to-b backdrop-blur-xl"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${COLORS.mobileMenuBgFrom}, ${COLORS.mobileMenuBgTo})`,
              }}
            >
              <div className="flex flex-col items-stretch py-2">
                {navItems.map((item) => {
                  const baseMobileClasses =
                    "px-6 py-3 text-lg font-medium transition-colors duration-200 text-[color:var(--mobile-link-color)] hover:text-[color:var(--mobile-link-hover-color)] hover:bg-[color:var(--mobile-link-hover-bg)]";

                  const mobileStyle = {
                    "--mobile-link-color": COLORS.mobileItemText,
                    "--mobile-link-hover-color": COLORS.mobileItemTextHover,
                    "--mobile-link-hover-bg": COLORS.mobileItemBgHover,
                  };

                  if (item.type === "route") {
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => {
                          setActive(item.href);
                          setIsOpen(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={baseMobileClasses}
                        style={mobileStyle}
                      >
                        {item.name}
                      </Link>
                    );
                  }

                  if (item.type === "home-section") {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) =>
                          goToHomeSection(e, item.href.substring(1))
                        }
                        className={baseMobileClasses}
                        style={mobileStyle}
                      >
                        {item.name}
                      </a>
                    );
                  }

                  return null;
                })}
              </div>

              <div
                className="h-1 w-full"
                style={{ background: COLORS.mobileBottomBar }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
