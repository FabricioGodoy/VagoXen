const PUBLIC = process.env.PUBLIC_URL || "";

const gen = (name) => `${PUBLIC}/img/generated/${name}`;

const makeSrcSet = (baseName, widths) => ({
  src: `${gen(baseName)}-${widths[Math.floor(widths.length / 2)]}.webp`,
  srcSet: widths.map((width) => `${gen(baseName)}-${width}.webp ${width}w`).join(", "),
});

const CARD_W = [480, 768, 1024, 1280];
const MODAL_DESKTOP_W = [800, 1200, 1600];
const GUIDE_W = [1000, 1600];

export const remerasDescripcion = [
  {
    id: "01",
    name: "Azul y Oro",
    description:
      "100% nuestros colores. 100% Boca. Un diseno en representacion al Hincha Xeneize y al templo de Brandsen 805.",
    longDescription:
      "100% nuestros colores. 100% Boca. Un diseno en representacion al Hincha Xeneize y al templo de Brandsen 805.",
    imageCard: makeSrcSet("card_azul_principal", CARD_W),
    image: `${gen("card_azul_principal")}-768.webp`,
    imagesResponsive: [
      makeSrcSet("modal_azul_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_4", MODAL_DESKTOP_W),
    ],
    images: [
      `${gen("modal_azul_1")}-1200.webp`,
      `${gen("modal_azul_2")}-1200.webp`,
      `${gen("modal_azul_3")}-1200.webp`,
      `${gen("modal_azul_4")}-1200.webp`,
    ],
    imagesMobileResponsive: [
      makeSrcSet("modal_azul_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_4", MODAL_DESKTOP_W),
    ],
    imagesMobile: [
      `${gen("modal_azul_1")}-1200.webp`,
      `${gen("modal_azul_2")}-1200.webp`,
      `${gen("modal_azul_3")}-1200.webp`,
      `${gen("modal_azul_4")}-1200.webp`,
    ],
    guiaTalleResponsive: makeSrcSet("guide_guiaTalles", GUIDE_W),
    guiaTalle: `${gen("guide_guiaTalles")}-1000.webp`,
    price: "48.000",
    originalPrice: "60.000",
    duration: "Oversize",
    destination: "UNISEX",
    includes: ["remera azul"],
    whatsappMessage: "AGUANTE BOCA LOCO, me interesa la remera Azul y Oro",
  },
  {
    id: "02",
    name: "Vago Xeneize",
    description:
      "En homenaje a Vago Xeneize. Diseno moderno, con tipografia romana y flow abstracto. Estilo artistico y callejero.",
    longDescription:
      "En homenaje a Vago Xeneize. Diseno moderno, con tipografia romana y flow abstracto. Estilo artistico y callejero.",
    imageCard: makeSrcSet("card_amarilla_principal", CARD_W),
    image: `${gen("card_amarilla_principal")}-768.webp`,
    imagesResponsive: [
      makeSrcSet("modal_amarilla_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_amarilla_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_amarilla_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_amarilla_4", MODAL_DESKTOP_W),
    ],
    images: [
      `${gen("modal_amarilla_1")}-1200.webp`,
      `${gen("modal_amarilla_2")}-1200.webp`,
      `${gen("modal_amarilla_3")}-1200.webp`,
      `${gen("modal_amarilla_4")}-1200.webp`,
    ],
    imagesMobileResponsive: [
      makeSrcSet("modal_amarilla_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_amarilla_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_amarilla_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_amarilla_4", MODAL_DESKTOP_W),
    ],
    imagesMobile: [
      `${gen("modal_amarilla_1")}-1200.webp`,
      `${gen("modal_amarilla_2")}-1200.webp`,
      `${gen("modal_amarilla_3")}-1200.webp`,
      `${gen("modal_amarilla_4")}-1200.webp`,
    ],
    guiaTalleResponsive: makeSrcSet("guide_TalleAmarilla", GUIDE_W),
    guiaTalle: `${gen("guide_TalleAmarilla")}-1000.webp`,
    price: "58.000",
    originalPrice: "65.000",
    duration: "Remeron",
    destination: "UNISEX",
    includes: ["remera amarilla"],
    whatsappMessage: "AGUANTE BOCA LOCO, me interesa la remera Vago Xeneize",
  },
  {
    id: "03",
    name: "1905",
    description:
      "Un diseno que representa el nacimiento del Club Atletico Boca Juniors y sus hazanas en el Continente Asiatico.",
    longDescription:
      "Un diseno que representa el nacimiento del Club Atletico Boca Juniors y sus hazanas en el Continente Asiatico.",
    imageCard: makeSrcSet("card_negra_principal", CARD_W),
    image: `${gen("card_negra_principal")}-768.webp`,
    imagesResponsive: [
      makeSrcSet("modal_negra_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_negra_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_negra_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_negra_4", MODAL_DESKTOP_W),
    ],
    images: [
      `${gen("modal_negra_1")}-1200.webp`,
      `${gen("modal_negra_2")}-1200.webp`,
      `${gen("modal_negra_3")}-1200.webp`,
      `${gen("modal_negra_4")}-1200.webp`,
    ],
    imagesMobileResponsive: [
      makeSrcSet("modal_negra_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_negra_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_negra_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_negra_4", MODAL_DESKTOP_W),
    ],
    imagesMobile: [
      `${gen("modal_negra_1")}-1200.webp`,
      `${gen("modal_negra_2")}-1200.webp`,
      `${gen("modal_negra_3")}-1200.webp`,
      `${gen("modal_negra_4")}-1200.webp`,
    ],
    guiaTalleResponsive: makeSrcSet("guide_guiaTalles", GUIDE_W),
    guiaTalle: `${gen("guide_guiaTalles")}-1000.webp`,
    price: "48.000",
    originalPrice: "60.000",
    duration: "Oversize",
    destination: "UNISEX",
    includes: ["remera negra"],
    whatsappMessage: "AGUANTE BOCA LOCO, me interesa la remera 1905",
  },
  {
    id: "04",
    name: "Remera Blanca",
    description:
      "Remera blanca VAGOS con estampa dorada al frente. Una pieza limpia, liviana y facil de combinar.",
    longDescription:
      "Remera blanca VAGOS con estampa dorada al frente. Una pieza limpia, liviana y facil de combinar para llevar la identidad azul y oro todos los dias.",
    imageCard: makeSrcSet("card_blanca_principal", CARD_W),
    image: `${gen("card_blanca_principal")}-768.webp`,
    imagesResponsive: [
      makeSrcSet("modal_blanca_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_4", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_5", MODAL_DESKTOP_W),
    ],
    images: [
      `${gen("modal_blanca_1")}-1200.webp`,
      `${gen("modal_blanca_2")}-1200.webp`,
      `${gen("modal_blanca_3")}-1200.webp`,
      `${gen("modal_blanca_4")}-1200.webp`,
      `${gen("modal_blanca_5")}-1200.webp`,
    ],
    imagesMobileResponsive: [
      makeSrcSet("modal_blanca_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_4", MODAL_DESKTOP_W),
      makeSrcSet("modal_blanca_5", MODAL_DESKTOP_W),
    ],
    imagesMobile: [
      `${gen("modal_blanca_1")}-1200.webp`,
      `${gen("modal_blanca_2")}-1200.webp`,
      `${gen("modal_blanca_3")}-1200.webp`,
      `${gen("modal_blanca_4")}-1200.webp`,
      `${gen("modal_blanca_5")}-1200.webp`,
    ],
    guiaTalleResponsive: makeSrcSet("guide_guiaTalles", GUIDE_W),
    guiaTalle: `${gen("guide_guiaTalles")}-1000.webp`,
    price: "",
    originalPrice: "",
    duration: "Oversize",
    destination: "UNISEX",
    includes: ["remera blanca"],
    whatsappMessage: "AGUANTE BOCA LOCO, me interesa la remera blanca VAGOS",
  },
  {
    id: "05",
    name: "Buzo Negro",
    description:
      "Buzo negro VAGOS con grafica azul y oro. Abrigo urbano con identidad xeneize y presencia de cancha.",
    longDescription:
      "Buzo negro VAGOS con grafica azul y oro. Abrigo urbano con identidad xeneize, pensado para usar en la calle, en la cancha y en el dia a dia.",
    imageCard: makeSrcSet("card_buzo_negro_principal", CARD_W),
    image: `${gen("card_buzo_negro_principal")}-768.webp`,
    imagesResponsive: [
      makeSrcSet("modal_buzo_negro_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_4", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_5", MODAL_DESKTOP_W),
    ],
    images: [
      `${gen("modal_buzo_negro_1")}-1200.webp`,
      `${gen("modal_buzo_negro_2")}-1200.webp`,
      `${gen("modal_buzo_negro_3")}-1200.webp`,
      `${gen("modal_buzo_negro_4")}-1200.webp`,
      `${gen("modal_buzo_negro_5")}-1200.webp`,
    ],
    imagesMobileResponsive: [
      makeSrcSet("modal_buzo_negro_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_4", MODAL_DESKTOP_W),
      makeSrcSet("modal_buzo_negro_5", MODAL_DESKTOP_W),
    ],
    imagesMobile: [
      `${gen("modal_buzo_negro_1")}-1200.webp`,
      `${gen("modal_buzo_negro_2")}-1200.webp`,
      `${gen("modal_buzo_negro_3")}-1200.webp`,
      `${gen("modal_buzo_negro_4")}-1200.webp`,
      `${gen("modal_buzo_negro_5")}-1200.webp`,
    ],
    price: "",
    originalPrice: "",
    duration: "Buzo",
    destination: "UNISEX",
    includes: ["buzo negro"],
    whatsappMessage: "AGUANTE BOCA LOCO, me interesa el buzo negro VAGOS",
  },
];
