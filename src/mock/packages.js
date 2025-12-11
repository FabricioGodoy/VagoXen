const PUBLIC = process.env.PUBLIC_URL || '';

export const remerasDescripcion = [
{
    id: '01',
    name: 'Azul y Oro',
    description:
      '100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.',
    longDescription:
      '100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.',
 // HORIZONTALES → para desktop
    images: [
      `${PUBLIC}/img/remeras/fotosAzulesHorizontal/azul.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesHorizontal/azul2.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesHorizontal/azul3.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesHorizontal/azul4.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesHorizontal/azul5.webp`,
    ],

    // VERTICALES → para mobile
    imagesMobile: [
      `${PUBLIC}/img/remeras/fotosAzulesVerticales/azul.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesVerticales/azul2.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesVerticales/azul3.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesVerticales/azul4.webp`,
      `${PUBLIC}/img/remeras/fotosAzulesVerticales/azul5.webp`,
    ],
    image: `${PUBLIC}/img/VAGOS/verticalAzul.webp`,
    price: `48.000`,
    originalPrice: '60.000', 
    duration: 'Oversize',
    destination: 'UNISEX',
    includes: [
      'remera azul'
    ],
    whatsappMessage:
      'AGUANTE BOCA LOCO, me interesa la remera Azul y Oro',
      guiaTalle: `${PUBLIC}/img/guitaTalle/guiaTalle1.webp`
  },

   {
    id: '02',
    name: 'Vago Xeneize',
    description:
      'En homenaje a Vago Xeneize. Diseño moderno, con tipografía romana y flow abstracto. Estilo artístico y callejero.',
    longDescription:
      'En homenaje a Vago Xeneize. Diseño moderno, con tipografía romana y flow abstracto. Estilo artístico y callejero.',
     images: [
      `${PUBLIC}/img/remeras/fotosAmarillasHorizontal/amarilla.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasHorizontal/amarilla2.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasHorizontal/amarilla3.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasHorizontal/amarilla4.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasHorizontal/amarilla5.webp`,
    ],

    imagesMobile: [
      `${PUBLIC}/img/remeras/fotosAmarillasVerticales/amarilla.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasVerticales/amarilla2.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasVerticales/amarilla3.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasVerticales/amarilla4.webp`,
      `${PUBLIC}/img/remeras/fotosAmarillasVerticales/amarilla5.webp`,
    ],
    image: `${PUBLIC}/img/VAGOS/horizontalAmarilla.webp`,
    price: `58.000`,
    originalPrice: '65.000', 
    duration: 'Remeron',
    destination: 'UNISEX',
    includes: [
      'remera amarilla'
    ],
    whatsappMessage:
      'AGUANTE BOCA LOCO, me interesa la remera Vago Xeneize',
      guiaTalle: `${PUBLIC}/img/guitaTalle/guiaTalle1.webp`
  },
  {
    id: '03',
    name: '1905',
    description:
      'Un diseño que representa el nacimiento del Club Atlético Boca Juniors y sus hazañas en el Continente Asiático.',
    longDescription:
      'Un diseño que representa el nacimiento del Club Atlético Boca Juniors y sus hazañas en el Continente Asiático.',
    // 🔴 NUEVO: array de imágenes para el slider
    images: [
      `${PUBLIC}/img/remeras/fotosNegrasHorizontal/negra.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasHorizontal/negra2.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasHorizontal/negra3.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasHorizontal/negra4.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasHorizontal/negra5.webp`,
    ],

    imagesMobile: [
      `${PUBLIC}/img/remeras/fotosNegrasVerticales/negra.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasVerticales/negra2.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasVerticales/negra3.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasVerticales/negra4.webp`,
      `${PUBLIC}/img/remeras/fotosNegrasVerticales/negra5.webp`,
    ],
    // podés dejar "image" como primera imagen para compatibilidad
    image:`${PUBLIC}/img/VAGOS/horizontalNegra.webp`,
    price: `48.000`,
    originalPrice: '60.000', 
    duration: 'Oversize',
    destination: 'UNISEX',
    includes: [
      'remera negra'
    ],
    whatsappMessage:
      'AGUANTE BOCA LOCO, me interesa la remera 1905',
      guiaTalle: `${PUBLIC}/img/guitaTalle/guiaTalle1.webp`
  }
];
