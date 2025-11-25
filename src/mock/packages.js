const PUBLIC = process.env.PUBLIC_URL || '';

export const travelPackages = [
  {
    id: 'pkg-001',
    name: 'Remera Clásica Negra y Oro',
    description:
      'El diseño más representativo del hincha. Azul profundo, franja dorada y detalles que gritan pasión xeneize.',
    longDescription:
      'Inspirada en la camiseta histórica del club, la Remera Clásica Azul y Oro combina comodidad y orgullo. Confeccionada en algodón peinado premium, cuello redondo reforzado y costuras de alta durabilidad. Ideal para llevar al estadio, al gimnasio o a cualquier lugar donde quieras mostrar tus colores.',
    image: `${PUBLIC}/img/VAGOS/IMG_4289.JPG`,
    price: 0,
    duration: 'Edición permanente',
    destination: 'Colección Tradicional',
    includes: [
      'Tela 100% algodón premium',
      'Corte unisex regular fit',
      'Logo bordado y escudo estampado de alta definición',
      'Disponible en talles S a XXL',
      'Diseñada y fabricada en Argentina'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera Clásica Azul y Oro (ID: pkg-001). ¿Podés pasarme talles y precio?'
  },
  {
    id: 'pkg-002',
    name: 'Remera Retro 1981',
    description:
      'Un homenaje al Boca campeón del 81. Diseño retro con tipografía vintage y detalles históricos.',
    longDescription:
      'Esta edición especial revive la camiseta usada durante la era dorada del 81. Con materiales de alta calidad, cuello redondo acanalado y un diseño fiel a la original. Perfecta para coleccionistas o fanáticos que quieren llevar la historia puesta.',
    image: `${PUBLIC}/img/VAGOS/1.JPG`,
    price: 0,
    duration: 'Edición limitada',
    destination: 'Colección Retro',
    includes: [
      'Estilo vintage inspirado en la temporada 1981',
      'Etiqueta interna numerada (edición limitada)',
      'Cuello y mangas con terminaciones en rib',
      'Estampa frontal con escudo retro',
      'Hecha en Argentina'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera Retro 1981 (ID: pkg-002). ¿Todavía tienen disponible la edición limitada?'
  },
  {
    id: 'pkg-003',
    name: 'Remera Urbana “Xeneize Street”',
    description:
      'Diseño moderno, con tipografía minimalista y el escudo tono sobre tono. Estilo callejero, 100% Boca.',
    longDescription:
      'La remera urbana combina la estética del lifestyle con el ADN xeneize. Su corte recto y el diseño discreto pero contundente la hacen ideal para todos los días. Con estampado soft-touch y tela liviana respirable. Estilo, comodidad y orgullo en una sola prenda.',
    image: `${PUBLIC}/img/VAGOS/5.JPG`,
    price: 0,
    duration: 'Colección 2025',
    destination: 'Urban Collection',
    includes: [
      'Tela jersey liviana de alto confort',
      'Diseño minimalista con tipografía “XENEIZE” frontal',
      'Escudo tono sobre tono en la manga',
      'Costuras reforzadas en cuello y hombros',
      'Disponible en talles XS a XXL'
    ],
    whatsappMessage:
      'Hola, me interesa la Remera Urbana “Xeneize Street” (ID: pkg-003). ¿Tenés guía de talles o fotos adicionales?'
  }
];
