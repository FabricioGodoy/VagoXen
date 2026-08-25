import { getSupabaseClient } from "../../lib/supabaseClient";

export const listAdminProducts = async () => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("products")
    .select(
      `
        id,
        slug,
        name,
        description,
        long_description,
        price,
        original_price,
        display_label,
        audience_label,
        whatsapp_message,
        sort_order,
        is_active,
        created_at,
        updated_at,
        category:categories (
          id,
          slug,
          name
        ),
        product_images (
          id,
          role,
          device,
          storage_path,
          alt,
          sort_order,
          width,
          height,
          format
        )
      `
    )
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
