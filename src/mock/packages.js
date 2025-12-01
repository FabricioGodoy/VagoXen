const PUBLIC = process.env.PUBLIC_URL || '';

export const remerasDescripcion = [
{
    id: 'pkg-001',
    name: 'Azul y Oro',
    description:
      '100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.',
    longDescription:
      '100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.',
    images: [
       `${PUBLIC}/img/VAGOS/horizontalNegra.webp`,
      `${PUBLIC}/img/VAGOS/horizontalAmarilla.webp`, // cambialo por el nombre real
      `${PUBLIC}/img/VAGOS/verticalAzul.webp`, // idem
    ],
    image: `${PUBLIC}/img/VAGOS/verticalAzul.webp`,
    price: 0,
    duration: 'Oversize',
    destination: 'UNISEX',
    includes: [
      'remera azul'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera Brandsen 805. ¿Podés pasarme talles y precio?'
  },

   {
    id: 'pkg-002',
    name: 'Vago Xeneize',
    description:
      'En homenaje a Vago Xeneize. Diseño moderno, con tipografía romana y flow abstracto. Estilo artístico y callejero.',
    longDescription:
      'En homenaje a Vago Xeneize. Diseño moderno, con tipografía romana y flow abstracto. Estilo artístico y callejero.',
    images: [
      `${PUBLIC}/img/VAGOS/horizontalNegra.webp`,
      `${PUBLIC}/img/VAGOS/horizontalAmarilla.webp`, // cambialo por el nombre real
      `${PUBLIC}/img/VAGOS/verticalAzul.webp`, // idem
    ],
    image: `${PUBLIC}/img/VAGOS/horizontalAmarilla.webp`,
    price: 0,
    duration: 'Remeron',
    destination: 'UNISEX',
    includes: [
      'remera amarilla'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera Vago Xeneize. ¿Podés pasarme talles y precio?'
  },
  {
    id: 'pkg-003',
    name: '1905',
    description:
      'Un diseño que representa el nacimiento del Club Atlético Boca Juniors y sus hazañas en el Continente Asiático.',
    longDescription:
      'Un diseño que representa el nacimiento del Club Atlético Boca Juniors y sus hazañas en el Continente Asiático.',
    // 🔴 NUEVO: array de imágenes para el slider
    images: [
      `${PUBLIC}/img/VAGOS/horizontalNegra.webp`,
      `${PUBLIC}/img/VAGOS/horizontalAmarilla.webp`, // cambialo por el nombre real
      `${PUBLIC}/img/VAGOS/verticalAzul.webp`, // idem
    ],
    // podés dejar "image" como primera imagen para compatibilidad
    image: `${PUBLIC}/img/VAGOS/horizontalNegra.webp`,
    price: 0,
    duration: 'Oversize',
    destination: 'UNISEX',
    includes: [
      'remera negra'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera 1905. ¿Podés pasarme talles y precio?'
  }
];
