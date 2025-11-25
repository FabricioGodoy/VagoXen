import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
const phone = '+5491133779222'; // sin +, correcto para AR
const defaultMsg = 'AWANTE BOKITA, QUIERO COMPRAR UNA REMERA'; // mensaje por defecto

 
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario, por ejemplo, con EmailJS
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({ name: '', email: '', message: '' });
  };
 
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Duración ajustada
        when: "beforeChildren",
        staggerChildren: 0.15 // Stagger ajustado
      }
    },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }, // Duración ajustada
  };
 
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-extrabold text-center text-gray-800 mb-12"
        >
          Contáctanos <span className="text-blue-600">Ahora</span>
        </motion.h2>
 
        <motion.div
          variants={itemVariants}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Tienes alguna pregunta?</h3>
              <p className="text-gray-600 leading-relaxed">
                Estamos aquí para ayudarte a planificar tu próxima aventura. No dudes en enviarnos un mensaje o contactarnos directamente.
              </p>
            </div>
            <div className="space-y-4">
              <motion.div variants={itemVariants} className="flex items-center text-gray-700">
                <Mail size={24} className="mr-4 text-blue-500" />
                <span>santi_elmejor95@hotmail.com</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center text-gray-700">
                <Phone size={24} className="mr-4 text-purple-500" />
                <span>+54 (261) 532 7815</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center text-gray-700">
                <MapPin size={24} className="mr-4 text-pink-500" />
                <span>Donde el puchero se cocina a los balazos</span>
              </motion.div>
            </div>
          </motion.div>
 
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Tu nombre completo"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="tu.email@ejemplo.com"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-y"
                placeholder="Escribe tu mensaje aquí..."
                required
              ></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              Enviar Mensaje
            </motion.button>
          </motion.form>
        </motion.div>
      </div> */}


  {/*     <a href="https://wa.me/+5492612131392" className="btn-flotante" target="_blank" rel="noopener noreferrer">
        <img src="https://img.icons8.com/office/40/whatsapp--v1.png" alt="wpp"></img>
      </a> */}




    </section>
  );
};
 
export default ContactSection;