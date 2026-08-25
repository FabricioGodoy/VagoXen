const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const vm = require("vm");

const projectRoot = path.resolve(__dirname, "..");
const manifestPath = path.join(projectRoot, "migration", "catalog-manifest.json");
const publicImgRoot = path.join(projectRoot, "public", "img");

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");
const writeManifest = args.has("--write-manifest");
const execute = args.has("--execute");
const confirmed = args.has("--confirm-upload-and-write");

const widthTokenPattern = /-(\d+)\.[a-z0-9]+$/i;

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

if (!isDryRun && !(execute && confirmed)) {
  fail(
    [
      "Proteccion activa: usar --dry-run para analizar.",
      "La migracion real futura requerira --execute --confirm-upload-and-write y SUPABASE_SECRET_KEY.",
    ].join("\n")
  );
}

if (execute) {
  fail("La escritura real contra Supabase queda deshabilitada en esta etapa. Ejecutar solamente --dry-run.");
}

const slugify = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toNumber = (value) =>
  value === null || value === undefined || value === ""
    ? null
    : Number(String(value).replace(/\./g, ""));

const loadProducts = () => {
  const packagesPath = path.join(projectRoot, "src", "mock", "packages.js");
  let code = fs.readFileSync(packagesPath, "utf8");
  code = code.replace("export const remerasDescripcion =", "const remerasDescripcion =");
  code += "\nglobalThis.__products = remerasDescripcion;";

  const context = { process: { env: { PUBLIC_URL: "" } }, globalThis: {} };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: packagesPath });

  return context.globalThis.__products;
};

const walkFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(fullPath) : [fullPath];
  });
};

const normalizePublicUrl = (url) => {
  if (!url) return null;
  return url.startsWith("/") ? url : `/${url}`;
};

const publicUrlToLocalPath = (url) => {
  const normalized = normalizePublicUrl(url);
  if (!normalized?.startsWith("/img/")) return null;
  return path.join(projectRoot, "public", normalized.replace(/^\//, ""));
};

const parseSrcSet = (srcSet) => {
  if (!srcSet) return [];

  return srcSet
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [url, descriptor] = item.split(/\s+/);
      const width = descriptor?.endsWith("w") ? Number(descriptor.replace("w", "")) : null;
      return { url: normalizePublicUrl(url), width };
    });
};

const hashFile = (filePath) => crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");

const fileMetadata = async (localPath, declaredWidth = null) => {
  if (!localPath || !fs.existsSync(localPath)) {
    return { exists: false, declaredWidth };
  }

  const stat = fs.statSync(localPath);
  const ext = path.extname(localPath).slice(1).toLowerCase();
  const hash = hashFile(localPath);
  let metadata = {};

  if (ext !== "svg") {
    metadata = await sharp(localPath).metadata();
  }

  return {
    exists: true,
    localPath: path.relative(projectRoot, localPath).replace(/\\/g, "/"),
    width: metadata.width || declaredWidth,
    height: metadata.height || null,
    declaredWidth,
    format: metadata.format || ext,
    fileSizeBytes: stat.size,
    sha256: hash,
    hashPrefix: hash.slice(0, 12),
  };
};

const storagePathForVariant = ({ productSlug, role, logicalSlug, variant }) =>
  [
    "products",
    productSlug,
    role,
    logicalSlug,
    `${variant.hashPrefix}-${path.basename(variant.localPath)}`,
  ].join("/");

const uniqueByUrl = (variants) => {
  const seen = new Set();
  return variants.filter((variant) => {
    if (!variant.url || seen.has(variant.url)) return false;
    seen.add(variant.url);
    return true;
  });
};

const variantsFromResponsive = async (responsive, fallbackUrl) => {
  const parsed = parseSrcSet(responsive?.srcSet);
  const variants = parsed.length > 0 ? parsed : [{ url: normalizePublicUrl(fallbackUrl || responsive?.src), width: null }];
  const normalized = uniqueByUrl(
    variants.concat([{ url: normalizePublicUrl(responsive?.src || fallbackUrl), width: null }])
  );

  return Promise.all(
    normalized.map(async (variant) => {
      const localPath = publicUrlToLocalPath(variant.url);
      const inferredWidth =
        variant.width || Number(path.basename(localPath || "").match(widthTokenPattern)?.[1]) || null;
      const metadata = await fileMetadata(localPath, inferredWidth);
      return {
        sourceUrl: variant.url,
        migrationAction: metadata.exists ? "reuse_existing_runtime_variant" : "missing",
        ...metadata,
      };
    })
  );
};

const sameResponsiveSet = (left = [], right = []) => {
  if (left.length !== right.length) return false;
  return left.every((item, index) => item?.src === right[index]?.src && item?.srcSet === right[index]?.srcSet);
};

const buildLogicalImage = async ({ product, role, device, sortOrder, logicalName, responsive, fallbackUrl }) => {
  const variants = await variantsFromResponsive(responsive, fallbackUrl);
  const existingVariants = variants.filter((variant) => variant.exists);
  const defaultUrl = normalizePublicUrl(responsive?.src || fallbackUrl || existingVariants[0]?.sourceUrl);
  const defaultVariant =
    existingVariants.find((variant) => variant.sourceUrl === defaultUrl) ||
    existingVariants[existingVariants.length - 1] ||
    null;
  const logicalSlug = slugify(logicalName);

  const variantsWithStorage = variants.map((variant) => ({
    ...variant,
    storagePath: variant.exists
      ? storagePathForVariant({
          productSlug: product.slug,
          role,
          logicalSlug,
          variant,
        })
      : null,
  }));

  return {
    role,
    device,
    sortOrder,
    logicalName,
    logicalSlug,
    alt: product.name,
    sourceLocal: defaultVariant?.localPath || null,
    sourceUrl: defaultUrl,
    storagePath: defaultVariant
      ? storagePathForVariant({
          productSlug: product.slug,
          role,
          logicalSlug,
          variant: defaultVariant,
        })
      : null,
    variants: variantsWithStorage,
  };
};

const buildProductImages = async (product) => {
  const images = [];

  images.push(
    await buildLogicalImage({
      product,
      role: "card",
      device: "all",
      sortOrder: 0,
      logicalName: `${product.slug}-card`,
      responsive: product.raw.imageCard,
      fallbackUrl: product.raw.image,
    })
  );

  const desktopGallery = product.raw.imagesResponsive || [];
  const mobileGallery = product.raw.imagesMobileResponsive || [];
  const galleryDevice = sameResponsiveSet(desktopGallery, mobileGallery) ? "all" : "desktop";

  for (const [index, item] of desktopGallery.entries()) {
    images.push(
      await buildLogicalImage({
        product,
        role: "gallery",
        device: galleryDevice,
        sortOrder: index,
        logicalName: `${product.slug}-gallery-${index + 1}`,
        responsive: item,
        fallbackUrl: product.raw.images?.[index],
      })
    );
  }

  if (galleryDevice !== "all") {
    for (const [index, item] of mobileGallery.entries()) {
      images.push(
        await buildLogicalImage({
          product,
          role: "gallery",
          device: "mobile",
          sortOrder: index,
          logicalName: `${product.slug}-gallery-mobile-${index + 1}`,
          responsive: item,
          fallbackUrl: product.raw.imagesMobile?.[index],
        })
      );
    }
  }

  if (product.raw.guiaTalleResponsive || product.raw.guiaTalle) {
    images.push(
      await buildLogicalImage({
        product,
        role: "size_guide",
        device: "all",
        sortOrder: 0,
        logicalName: `${product.slug}-size-guide`,
        responsive: product.raw.guiaTalleResponsive,
        fallbackUrl: product.raw.guiaTalle,
      })
    );
  }

  return images;
};

const categorizeOmittedAsset = (relativePath) => {
  const normalized = relativePath.replace(/\\/g, "/");

  if (normalized.includes("/generated/hero_") || normalized.includes("/banner/") || normalized.includes("/logos/")) {
    return "site_content";
  }

  if (
    normalized.includes("/remeras/") ||
    normalized.includes("/buzos/") ||
    normalized.includes("/vagos/")
  ) {
    return "original_or_source_asset";
  }

  if (normalized.includes("/generated/guide_") || normalized.includes("/guitaTalle/")) {
    return "legacy_or_unused_catalog_asset";
  }

  if (normalized.includes("/generated/")) {
    return "generated_runtime_not_referenced_by_catalog";
  }

  return "other";
};

const summarizeVariants = (products) => {
  const variants = products.flatMap((product) => product.images.flatMap((image) => image.variants));
  const byWidthFormat = {};
  let totalBytes = 0;
  const missing = [];
  const storagePaths = new Map();
  const duplicateStoragePaths = [];

  for (const variant of variants) {
    const key = `${variant.width || "unknown"}-${variant.format || "unknown"}`;
    byWidthFormat[key] = (byWidthFormat[key] || 0) + 1;
    if (variant.exists) totalBytes += variant.fileSizeBytes;
    if (!variant.exists) missing.push(variant.sourceUrl);
    if (variant.storagePath) {
      if (storagePaths.has(variant.storagePath)) duplicateStoragePaths.push(variant.storagePath);
      storagePaths.set(variant.storagePath, true);
    }
  }

  return { total: variants.length, byWidthFormat, totalBytes, missing, duplicateStoragePaths };
};

const buildManifest = async () => {
  const rawProducts = loadProducts();
  const categories = Array.from(new Set(rawProducts.map((product) => product.category))).map((slug, index) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    sortOrder: index,
    isActive: true,
  }));

  const products = [];

  for (const [index, raw] of rawProducts.entries()) {
    const product = {
      sourceId: raw.id,
      slug: slugify(raw.name),
      name: raw.name,
      category: raw.category,
      description: raw.description,
      longDescription: raw.longDescription,
      price: toNumber(raw.price),
      originalPrice: toNumber(raw.originalPrice),
      whatsappMessage: raw.whatsappMessage,
      sortOrder: index,
      isActive: true,
      displayLabel: raw.duration || null,
      audienceLabel: raw.destination || null,
      includes: raw.includes || [],
      rawKeys: Object.keys(raw),
      raw,
    };

    product.images = await buildProductImages(product);
    delete product.raw;
    products.push(product);
  }

  const usedLocalAssets = new Set(
    products.flatMap((product) =>
      product.images.flatMap((image) =>
        image.variants.filter((variant) => variant.localPath).map((variant) => variant.localPath)
      )
    )
  );
  const allPublicImgAssets = walkFiles(publicImgRoot)
    .filter((file) => /\.(webp|png|jpe?g|svg)$/i.test(file))
    .map((file) => path.relative(projectRoot, file).replace(/\\/g, "/"));
  const omittedAssets = allPublicImgAssets
    .filter((asset) => !usedLocalAssets.has(asset))
    .map((asset) => ({ localPath: asset, reason: categorizeOmittedAsset(asset) }));
  const omittedByReason = omittedAssets.reduce((acc, asset) => {
    acc[asset.reason] = (acc[asset.reason] || 0) + 1;
    return acc;
  }, {});
  const logicalImages = products.flatMap((product) => product.images);
  const logicalByProduct = Object.fromEntries(
    products.map((product) => [
      product.slug,
      product.images.reduce((acc, image) => {
        const key = `${image.role}:${image.device}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    ])
  );
  const variantSummary = summarizeVariants(products);
  const productSlugs = products.map((product) => product.slug);
  const duplicateProductSlugs = productSlugs.filter((slug, index) => productSlugs.indexOf(slug) !== index);

  return {
    generatedAt: process.env.MIGRATION_MANIFEST_GENERATED_AT || null,
    mode: "dry-run",
    storage: {
      bucket: "catalog",
      pathConvention:
        "products/{product-slug}/{role}/{logical-image-slug}/{content-hash-prefix}-{source-file-name}",
      note: "Los nombres incluyen hash de contenido para evitar cache vieja al reemplazar imagenes.",
    },
    source: {
      productsFile: "src/mock/packages.js",
      publicImgRoot: "public/img",
      publicImgTrackedCount: allPublicImgAssets.length,
    },
    categories,
    products,
    summary: {
      products: products.length,
      categories: categories.length,
      logicalImages: logicalImages.length,
      logicalImagesByProduct: logicalByProduct,
      variants: variantSummary.total,
      variantsByWidthFormat: variantSummary.byWidthFormat,
      estimatedUploadBytes: variantSummary.totalBytes,
      estimatedUploadMB: Number((variantSummary.totalBytes / 1024 / 1024).toFixed(2)),
      usedCatalogAssets: usedLocalAssets.size,
      omittedAssets: omittedAssets.length,
      omittedAssetsByReason: omittedByReason,
      migrationActions: {
        reuseExistingRuntimeVariants: variantSummary.total - variantSummary.missing.length,
        regenerate: 0,
        uploadOriginals: 0,
      },
    },
    omittedAssets,
    checks: {
      missingAssets: variantSummary.missing,
      duplicateProductSlugs,
      duplicateStoragePaths: variantSummary.duplicateStoragePaths,
      avifRecommendation:
        "No agregar AVIF en esta etapa: todas las variantes usadas ya son WebP y duplicar formatos aumentaria Storage y complejidad sin medicion real en produccion.",
      frontendContract:
        "Con products, categories, product_images e image_variants se puede reconstruir imageCard, imagesResponsive, imagesMobileResponsive, guiaTalleResponsive y fallbacks image/images/guiaTalle mediante un mapper.",
    },
    dryRunGuarantee: {
      inserts: 0,
      updates: 0,
      deletes: 0,
      uploads: 0,
      storageChanges: 0,
    },
  };
};

(async () => {
  const manifest = await buildManifest();

  if (writeManifest) {
    fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  }

  console.log(
    JSON.stringify(
      {
        mode: manifest.mode,
        manifest: writeManifest ? path.relative(projectRoot, manifestPath).replace(/\\/g, "/") : null,
        summary: manifest.summary,
        checks: manifest.checks,
        dryRunGuarantee: manifest.dryRunGuarantee,
      },
      null,
      2
    )
  );
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
