const PUBLIC = process.env.PUBLIC_URL || '';

export const remerasDescripcion = [
  {
    id: 'pkg-001',
    name: '1905',
    description:
      '- remera negra - El diseño más representativo del hincha. Azul profundo, franja dorada y detalles que gritan pasión xeneize.',
    longDescription:
      'Inspirada en la camiseta histórica del club, la Remera Clásica Azul y Oro combina comodidad y orgullo. Confeccionada en algodón peinado premium, cuello redondo reforzado y costuras de alta durabilidad. Ideal para llevar al estadio, al gimnasio o a cualquier lugar donde quieras mostrar tus colores.',
    // 🔴 NUEVO: array de imágenes para el slider
    images: [
      `${PUBLIC}/img/VAGOS/horizontalNegra.JPG`,
      `${PUBLIC}/img/VAGOS/horizontalAmarilla.JPG`, // cambialo por el nombre real
      `${PUBLIC}/img/VAGOS/verticalAzul.JPG`, // idem
    ],
    // podés dejar "image" como primera imagen para compatibilidad
    image: `${PUBLIC}/img/VAGOS/horizontalNegra.JPG`,
    price: 0,
    duration: 'Edición permanente',
    destination: 'Colección Tradicional',
    includes: [
      'remera negra'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera 1905. ¿Podés pasarme talles y precio?'
  },
  {
    id: 'pkg-002',
    name: 'Brandsen 805',
    description:
      '- remera azul - Un homenaje al Boca campeón del 81. Diseño retro con tipografía vintage y detalles históricos.',
    longDescription:
      'Esta edición especial revive la camiseta usada durante la era dorada del 81. Con materiales de alta calidad, cuello redondo acanalado y un diseño fiel a la original. Perfecta para coleccionistas o fanáticos que quieren llevar la historia puesta.',
    images: [
       `${PUBLIC}/img/VAGOS/horizontalNegra.JPG`,
      `${PUBLIC}/img/VAGOS/horizontalAmarilla.JPG`, // cambialo por el nombre real
      `${PUBLIC}/img/VAGOS/verticalAzul.JPG`, // idem
    ],
    image: `${PUBLIC}/img/VAGOS/verticalAzul.JPG`,
    price: 0,
    duration: 'Edición limitada',
    destination: 'Colección Retro',
    includes: [
      'remera azul'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera Brandsen 805. ¿Podés pasarme talles y precio?'
  },
  {
    id: 'pkg-003',
    name: 'Vago Xeneize',
    description:
      '- remera amarilla -Diseño moderno, con tipografía minimalista y el escudo tono sobre tono. Estilo callejero, 100% Boca.',
    longDescription:
      'La remera urbana combina la estética del lifestyle con el ADN xeneize. Su corte recto y el diseño discreto pero contundente la hacen ideal para todos los días. Con estampado soft-touch y tela liviana respirable. Estilo, comodidad y orgullo en una sola prenda.',
    images: [
      `${PUBLIC}/img/VAGOS/horizontalNegra.JPG`,
      `${PUBLIC}/img/VAGOS/horizontalAmarilla.JPG`, // cambialo por el nombre real
      `${PUBLIC}/img/VAGOS/verticalAzul.JPG`, // idem
    ],
    image: `${PUBLIC}/img/VAGOS/horizontalAmarilla.JPG`,
    price: 0,
    duration: 'Colección 2025',
    destination: 'Urban Collection',
    includes: [
      'remera amarilla'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera Vago Xeneize. ¿Podés pasarme talles y precio?'
  }
];
