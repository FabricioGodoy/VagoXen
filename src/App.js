import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Hero from "./components/HeroSection.jsx";
import Navbar from "./components/Navbar";
import PackagesSection from "./components/PackagesSection";

const WHATSAPP_HOME_MESSAGE = "AGUANTE BOCA LOCO. Me interesa una remera de Vagos.";

function HomePage() {
  return (
    <>
      <a
        href={`https://wa.me/5491133779222?text=${encodeURIComponent(WHATSAPP_HOME_MESSAGE)}`}
        className="btn-flotante"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consultar por WhatsApp"
      >
        <img src="https://img.icons8.com/office/40/whatsapp--v1.png" alt="" />
      </a>
      <p className="texto-flotante">Vivir A LO BOCA</p>

      <Hero />
      <PackagesSection />
    </>
  );
}

function NosotrosPage() {
  return <AboutSection />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen Appbgc">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/contacto" element={<ContactSection />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
