import { getSupabaseClient, isSupabaseConfigured, supabaseConfigError } from "../../lib/supabaseClient";

const unauthorizedMessage = "El usuario autenticado no esta autorizado como administrador.";

export const getAdminAuthState = async () => {
  if (!isSupabaseConfigured) {
    return { status: "not_configured", message: supabaseConfigError };
  }

  const client = getSupabaseClient();
  const { data, error } = await client.auth.getSession();

  if (error) {
    return { status: "error", message: error.message };
  }

  const session = data.session;

  if (!session?.user) {
    return { status: "unauthenticated" };
  }

  const isAdmin = await checkIsAdmin(session.user.id);

  if (!isAdmin) {
    await client.auth.signOut();
    return { status: "unauthorized", message: unauthorizedMessage };
  }

  return { status: "authorized", session, user: session.user };
};

export const checkIsAdmin = async (userId) => {
  const client = getSupabaseClient();
  const { data, error } = await client
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data?.user_id);
};

export const signInAdmin = async ({ email, password }) => {
  const client = getSupabaseClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user || data.session?.user;

  if (!user) {
    throw new Error("No se pudo obtener la sesion del usuario.");
  }

  const isAdmin = await checkIsAdmin(user.id);

  if (!isAdmin) {
    await client.auth.signOut();
    throw new Error(unauthorizedMessage);
  }

  return data;
};

export const signOutAdmin = async () => {
  const client = getSupabaseClient();
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
