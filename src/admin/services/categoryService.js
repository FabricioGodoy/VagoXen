import { getSupabaseClient } from "../../lib/supabaseClient";

export const listAdminCategories = async () => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("categories")
    .select("id, slug, name, sort_order, is_active, created_at, updated_at")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};
