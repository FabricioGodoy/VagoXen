import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#C1121F",
  sand: "#EDEDED",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { name: "Inicio", href: "/", type: "home-section" },
    { name: "Nosotros", href: "/nosotros", type: "route" },
    { name: "Remeras", href: "#packages", type: "home-section" },
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

    // 1) Navego al home
    navigate("/");

    // 2) Espero un toque a que se renderice y scrolleo
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "bg-gradient-to-b from-[#ffffff] to-[#b6b6b6]/95",
        "backdrop-blur-xl",
        "shadow-lg",
        "border-b",
        "[border-bottom-color:#d2983a]",
      ].join(" ")}
      style={{ color: COLORS.sand }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
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
            const baseClasses = [
              "relative group font-medium transition-colors duration-300",
              "text-[#070942]/90 hover:text-[#d2983a]",
              isActive ? "text-[#0c158d]" : "",
            ].join(" ");

            const indicator = (
              <span
                className={[
                  "absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0",
                  "bg-[#d2983a] transition-transform duration-300",
                  "group-hover:scale-x-100",
                  isActive ? "scale-x-100" : "",
                ].join(" ")}
              />
            );

            if (item.type === "route") {
              // /nosotros
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
                >
                  {item.name}
                  {indicator}
                </Link>
              );
            }

            if (item.type === "home-section") {
              // Sección del home (Remeras)
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => goToHomeSection(e, item.href.substring(1))}
                  className={baseClasses}
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
            className="p-2 rounded-xl text-[#141416] hover:text-[#d2983a] focus:outline-none focus:ring-2 focus:ring-[#C1121F]/60 focus:ring-offset-2 [--ring-offset-color:transparent]"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
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
            className="md:hidden border-t [border-color:rgba(193,18,31,0.25)]"
          >
            <div className="bg-gradient-to-b from-[#141416]/95 to-[#2b3036]/95 backdrop-blur-xl">
              <div className="flex flex-col items-stretch py-2">
                {navItems.map((item) => {
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
                        className="px-6 py-3 text-lg font-medium text-[#EDEDED] hover:text-[#d2983a] hover:bg-white/5 transition-colors"
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
                        className="px-6 py-3 text-lg font-medium text-[#EDEDED] hover:text-[#d2983a] hover:bg-white/5 transition-colors"
                      >
                        {item.name}
                      </a>
                    );
                  }

                  return null;
                })}
              </div>

              <div className="h-1 w-full" style={{ background: COLORS.sand }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
