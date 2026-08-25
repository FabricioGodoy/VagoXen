import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";

import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminProductsPage from "./admin/pages/AdminProductsPage";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Hero from "./components/HeroSection.jsx";
import Navbar from "./components/Navbar";
import PackagesSection from "./components/PackagesSection";

const WHATSAPP_HOME_MESSAGE = "AGUANTE BOCA LOCO. Me interesa una remera de Vagos.";

function HomePage({ productFilter }) {
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
      <PackagesSection productFilter={productFilter} />
    </>
  );
}

function NosotrosPage() {
  return <AboutSection />;
}

function AppShell() {
  const [productFilter, setProductFilter] = useState("all");
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen Appbgc">
      {!isAdminRoute && (
        <Navbar productFilter={productFilter} onProductFilterChange={setProductFilter} />
      )}

      <main>
        <Routes>
          <Route path="/" element={<HomePage productFilter={productFilter} />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/contacto" element={<ContactSection />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/products" replace />} />
            <Route path="products" element={<AdminProductsPage />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && (
        <Footer />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
