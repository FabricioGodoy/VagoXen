// import React from 'react';
// import Navbar from './components/Navbar';
// import AboutSection from './components/AboutSection';
// import PackagesSection from './components/PackagesSection';
// /* import ContactSection from './components/ContactSection'; */
// import Footer from './components/Footer';
// import Hero from "./components/HeroSection.jsx";

 
// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className="pt-20"> {/* Add padding-top to account for fixed navbar */}
//         <Hero/>
//         <AboutSection />
//         <PackagesSection />
//         {/* <ContactSection /> */}
//       </main>
//       <Footer />
//     </div>
//   );
// }


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import PackagesSection from "./components/PackagesSection";
import Footer from "./components/Footer";
import Hero from "./components/HeroSection.jsx";

// Página Home – SOLO Hero + Paquetes
function HomePage() {
  return (
    <>
      <Hero />
      <PackagesSection />
    </>
  );
}

// Página Nosotros – SOLO la AboutSection
function NosotrosPage() {
  return (
    <>
      <AboutSection />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="pt-20">
          <Routes>
            {/* Ruta del Home */}
            <Route path="/" element={<HomePage />} />

            {/* Ruta de Nosotros */}
            <Route path="/nosotros" element={<NosotrosPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
