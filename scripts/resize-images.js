const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputDir = "src/assets/originals";
const outputDir = "public/img/generated";

const quality = 74;
const sharpen = true;

const targets = {
  hero: [640, 960, 1280, 1600, 1920, 2560],
  card: [480, 768, 1024, 1280],
  modalDesktop: [800, 1200, 1600],
  modalMobile: [600, 900, 1200],
  sizeGuide: [1000, 1600],
};

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

(async () => {
  for (const file of files) {
    const full = path.join(inputDir, file);
    const base = path.parse(file).name;

    let widths = targets.card;
    if (base.startsWith("hero_")) widths = targets.hero;
    if (base.startsWith("modalM_")) widths = targets.modalMobile;
    if (base.startsWith("modal_")) widths = targets.modalDesktop;
    if (base.startsWith("guide_")) widths = targets.sizeGuide;

    for (const w of widths) {
      const out = path.join(outputDir, `${base}-${w}.webp`);

      let pipeline = sharp(full).resize({ width: w, withoutEnlargement: true });

      if (sharpen) pipeline = pipeline.sharpen(0.8, 0.6, 1.2);

      await pipeline.webp({ quality, effort: 5 }).toFile(out);
      console.log("✓", out);
    }
  }
})();
