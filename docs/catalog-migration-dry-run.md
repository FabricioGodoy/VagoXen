# Catalog migration dry-run

Esta etapa prepara la migracion del catalogo actual hacia Supabase sin escribir datos,
sin subir archivos y sin cambiar la tienda publica. La web publica sigue consumiendo
`src/mock/packages.js`.

## Alcance

- Se leen los 5 productos actuales desde `src/mock/packages.js`.
- Se detectan solamente los assets referenciados por el catalogo.
- Se genera `migration/catalog-manifest.json` como manifiesto reproducible.
- Se preparan rutas deterministicas para Supabase Storage con hash de contenido.
- Se documenta la compatibilidad con los componentes publicos actuales.

## Modelo de imagenes

La tabla base `product_images` representa cada imagen logica:

- `card`
- `gallery`
- `size_guide`

La migracion `20260825000200_add_image_variants.sql` agrega `image_variants` para
guardar variantes fisicas pre-generadas. Esto evita depender de Image
Transformations en Supabase Free.

Campos principales de `image_variants`:

- `image_id`
- `width`
- `height`
- `format`
- `storage_path`
- `file_size_bytes`

Cada variante queda asociada a una imagen logica y tiene una ruta unica en Storage.

## Convencion de Storage

```text
catalog/
  products/
    {product-slug}/
      card/
      gallery/
      size_guide/
```

Cada archivo incluye un prefijo de hash:

```text
products/{product-slug}/{role}/{logical-image-slug}/{hash}-{source-file-name}
```

Ejemplo:

```text
products/azul-y-oro/card/azul-y-oro-card/9cca8a0c4833-card_azul_principal-1024.webp
```

## Resultado del dry-run actual

- Productos: 5
- Categorias: 2 (`remeras`, `buzos`)
- Imagenes logicas: 32
- Variantes: 96
- Assets de catalogo usados: 96
- Assets omitidos: 94
- Peso estimado a subir: 10.43 MB
- Escrituras: 0 inserts, 0 updates, 0 deletes, 0 uploads, 0 cambios de Storage

Los assets omitidos quedan separados por motivo:

- `site_content`: banners, hero, logos y contenido de sitio.
- `original_or_source_asset`: originales/fuentes de producto no usados por runtime.
- `legacy_or_unused_catalog_asset`: guias o imagenes antiguas ya no referenciadas.

## Formato

Todas las variantes usadas por el catalogo actual son WebP. AVIF queda descartado
en esta etapa para evitar duplicar Storage y complejidad sin medicion real de
produccion.

## Comando seguro

```bash
node scripts/migrate-catalog-to-supabase.js --dry-run --write-manifest
```

## Comando real futuro

La escritura real queda deshabilitada en esta etapa. Cuando se habilite, debe usar
una clave server-side local llamada `SUPABASE_SECRET_KEY`, nunca una variable
`REACT_APP_*`.

Comando previsto:

```bash
SUPABASE_URL="https://PROJECT.supabase.co" SUPABASE_SECRET_KEY="..." node scripts/migrate-catalog-to-supabase.js --execute --confirm-upload-and-write
```

## Contrato frontend

Con `products`, `categories`, `product_images` e `image_variants` se puede
reconstruir la forma actual que esperan `PackagesSection`, `PackageCard` y
`PackageModal`:

- `imageCard`
- `imagesResponsive`
- `imagesMobileResponsive`
- `guiaTalleResponsive`
- fallbacks `image`, `images`, `imagesMobile`, `guiaTalle`

Hasta implementar ese mapper, la tienda publica no debe dejar de leer
`src/mock/packages.js`.
