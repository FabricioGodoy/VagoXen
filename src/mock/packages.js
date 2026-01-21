const PUBLIC = process.env.PUBLIC_URL || "";

const gen = (name) => `${PUBLIC}/img/generated/${name}`;

const makeSrcSet = (baseName, widths) => ({
  src: `${gen(baseName)}-${widths[Math.floor(widths.length / 2)]}.webp`,
  srcSet: widths.map((w) => `${gen(baseName)}-${w}.webp ${w}w`).join(", "),
});

const CARD_W = [480, 768, 1024, 1280];
const MODAL_DESKTOP_W = [800, 1200, 1600];
// ⚠️ No tenés modalM_* en /generated, así que mobile usa las mismas del modal
const GUIDE_W = [1000, 1600];

export const remerasDescripcion = [
  {
    id: "01",
    name: "Azul y Oro",
    description:
      "100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.",
    longDescription:
      "100% nuestros colores. 100% Boca. Un diseño en representación al Hincha Xeneize y al templo de Brandsen 805.",

    // ✅ CARD (PackageCard / PackageSection)
    imageCard: makeSrcSet("card_azul_principal", CARD_W),

    // fallback legacy (por si algún lado aún usa pkg.image)
    image: `${gen("card_azul_principal")}-768.webp`,

    // ✅ MODAL desktop
    imagesResponsive: [
      makeSrcSet("modal_azul_1", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_2", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_3", MODAL_DESKTOP_W),
      makeSrcSet("modal_azul_4", MODAL_DESKTOP_W),
    ],

    // fallback legacy (strings)
    images: [
      `${gen("modal_azul_1")}-1200.webp`,
      `${gen("modal_azul_2")}-1200.webp`,
      `${gen("modal_azul_3")}-1200.webp`,
      `${gen("modal_azul_4")}-1200.webp`,
    ],

    // ✅ MODAL mobile (no hay recortes mobile distintos -> reusa desktop)
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

    // ✅ Guía talles (NO TOCAR como pediste)
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
      "En homenaje a Vago Xeneize. Diseño moderno, con tipografía romana y flow abstracto. Estilo artístico y callejero.",
    longDescription:
      "En homenaje a Vago Xeneize. Diseño moderno, con tipografía romana y flow abstracto. Estilo artístico y callejero.",

    // ✅ CARD
    imageCard: makeSrcSet("card_amarilla_principal", CARD_W),
    image: `${gen("card_amarilla_principal")}-768.webp`,

    // ✅ MODAL desktop
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

    // ✅ MODAL mobile (reusa desktop)
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

    // ✅ Guía talles (NO TOCAR)
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
      "Un diseño que representa el nacimiento del Club Atlético Boca Juniors y sus hazañas en el Continente Asiático.",
    longDescription:
      "Un diseño que representa el nacimiento del Club Atlético Boca Juniors y sus hazañas en el Continente Asiático.",

    // ✅ CARD
    imageCard: makeSrcSet("card_negra_principal", CARD_W),
    image: `${gen("card_negra_principal")}-768.webp`,

    // ✅ MODAL desktop
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

    // ✅ MODAL mobile (reusa desktop)
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

    // ✅ Guía talles (NO TOCAR)
    guiaTalleResponsive: makeSrcSet("guide_guiaTalles", GUIDE_W),
    guiaTalle: `${gen("guide_guiaTalles")}-1000.webp`,

    price: "48.000",
    originalPrice: "60.000",
    duration: "Oversize",
    destination: "UNISEX",
    includes: ["remera negra"],
    whatsappMessage: "AGUANTE BOCA LOCO, me interesa la remera 1905",
  },
];
