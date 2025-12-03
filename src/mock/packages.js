const PUBLIC = process.env.PUBLIC_URL || '';

export const remerasDescripcion = [
{
    id: '01',
    name: 'Azul y Oro',
    description:
      '100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.',
    longDescription:
      '100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.',
    images: [
       `${PUBLIC}/img/azul/azul.webp`,
       `${PUBLIC}/img/azul/azul2.webp`,
       `${PUBLIC}/img/azul/azul3.webp`,
       `${PUBLIC}/img/azul/azul4.webp`,
       `${PUBLIC}/img/azul/azul5.webp`,
    ],
    image: `${PUBLIC}/img/azul/azul.webp`,
    price: `48.000`,
    originalPrice: '80.000', 
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
      `${PUBLIC}/img/amarillo/amarilla2.webp`,
      `${PUBLIC}/img/amarillo/amarilla4.webp`,
      `${PUBLIC}/img/amarillo/amarilla.webp`,
      `${PUBLIC}/img/amarillo/amarilla5.webp`,
      `${PUBLIC}/img/amarillo/amarilla3.webp`,
    ],
    image: `${PUBLIC}/img/VAGOS/horizontalAmarilla.webp`,
    price: `58.000`,
    originalPrice: '80.000', 
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
      `${PUBLIC}/img/negro/negra4.webp`,
      `${PUBLIC}/img/negro/negra2.webp`,
      `${PUBLIC}/img/negro/negra.webp`,
      `${PUBLIC}/img/negro/negra3.webp`,
      `${PUBLIC}/img/negro/negra5.webp`,
    ],
    // podés dejar "image" como primera imagen para compatibilidad
    image:`${PUBLIC}/img/negro/negra4.webp`,
    price: `48.000`,
    originalPrice: '80.000', 
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
