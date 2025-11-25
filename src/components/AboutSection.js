import React from "react";
import { motion } from "framer-motion";
import { Palette, Heart, Sparkles } from "lucide-react";

const COLORS = {
  midnight: "#141416",
  navy: "#2b3036",
  gold: "#d2983a",
  sand: "#EDE5DA",
};

const AboutSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } 
    },
  };

  const FeatureCard = ({ Icon, title, desc }) => (
    <motion.div
      variants={itemVariants}
      className="group relative rounded-2xl p-6 bg-white/80 backdrop-blur-sm text-[#141416] border border-[#d2983a]/20 shadow-lg hover:shadow-2xl hover:border-[#d2983a]/40 hover:-translate-y-2 transition-all duration-300"
    >
      <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-[#d2983a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-[#d2983a]/20 to-[#d2983a]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7" color={COLORS.gold} strokeWidth={2} />
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-[#141416] group-hover:text-[#d2983a] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[#141416]/70 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );

  return (
    <motion.section
      id="about"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-[#EDE5DA]/30 to-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(210,152,58,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(210,152,58,0.06),transparent_50%)]" />

      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d2983a]/10 border border-[#d2983a]/20 mb-6">
            <Sparkles className="w-4 h-4" color={COLORS.gold} />
            <span className="text-sm font-semibold text-[#d2983a]">Nuestra Historia</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#141416] mb-6">
            Hecho por <span className="bg-gradient-to-r from-[#d2983a] to-[#f0a840] bg-clip-text text-transparent">hinchas</span>,<br />
            para hinchas
          </h2>
          
          <div className="flex justify-center mb-8">
            <span className="h-1 w-20 bg-gradient-to-r from-transparent via-[#d2983a] to-transparent rounded-full" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#d2983a]/10 shadow-xl">
            <p className="text-[#141416]/80 text-lg md:text-xl leading-relaxed mb-6">
              No tenemos décadas de historia. <span className="font-semibold text-[#d2983a]">Tenemos algo mejor</span>: 
              ganas, pasión genuina y el sueño de dos hinchas de Boca que dijeron "hagámoslo".
            </p>
            
            <p className="text-[#141416]/80 text-lg md:text-xl leading-relaxed mb-6">
              Cada remera que hacemos lleva horas de diseño, ajustes hasta que quede perfecta, 
              y ese <span className="font-semibold text-[#141416]">amor bostero</span> que solo entiende 
              quien vivió La Bombonera desde adentro.
            </p>
            
            <p className="text-[#141416]/80 text-lg md:text-xl leading-relaxed mb-6">
              No somos una marca gigante ni pretendemos serlo. Somos auténticos, 
              trabajamos de verdad en cada detalle, y estamos orgullosos de empezar desde abajo, 
              <span className="font-semibold text-[#d2983a]"> como Boca nos enseñó</span>.
            </p>
            
            <div className="pt-6 border-t border-[#d2983a]/20">
              <p className="text-[#141416] text-xl md:text-2xl font-bold text-center">
                Si sos hincha de verdad, esto es para vos. 💙💛
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            Icon={Palette}
            title="Diseños únicos"
            desc="Cada estampa es exclusiva, pensada con criterio bostero y diseñada con amor al detalle. Nada de copiar y pegar."
          />
          <FeatureCard
            Icon={Heart}
            title="Calidad real"
            desc="Usamos telas premium y técnicas de estampado duraderas. No vendemos promesas: vendemos remeras que van a durar."
          />
          <FeatureCard
            Icon={Sparkles}
            title="Fresh & auténtico"
            desc="Somos nuevos, sí. Pero eso nos hace más genuinos, más cercanos y con más hambre de hacer las cosas bien."
          />
        </div>

        {/* CTA */}
   {/*      <motion.div variants={itemVariants} className="text-center mt-16">
          <p className="text-[#141416]/60 text-sm md:text-base mb-6">
            Seguimos creciendo, diseño a diseño, hincha a hincha. ¿Te sumás?
          </p>
          <a
            href="#remeras"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#d2983a] hover:bg-[#f0a840] text-[#141416] font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Ver Remeras
            <span className="text-xl">→</span>
          </a>
        </motion.div> */}
      </div>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/+5491133779222"
        className="btn-flotante"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="https://img.icons8.com/office/40/whatsapp--v1.png" alt="wpp" />
      </a>
    </motion.section>
  );
};

export default AboutSection;
