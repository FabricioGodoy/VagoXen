import { getSupabaseClient } from "../../lib/supabaseClient";

export const CATALOG_BUCKET = "catalog";

export const getCatalogImageUrl = (storagePath) => {
  if (!storagePath) return null;

  const client = getSupabaseClient();
  const { data } = client.storage.from(CATALOG_BUCKET).getPublicUrl(storagePath);

  return data.publicUrl;
};

export const listProductImages = async (productId) => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("product_images")
    .select("id, product_id, role, device, storage_path, alt, sort_order, width, height, format")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
