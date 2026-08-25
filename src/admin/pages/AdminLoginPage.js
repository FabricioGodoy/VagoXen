import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { getAdminAuthState, signInAdmin } from "../services/authService";
import { isSupabaseConfigured, supabaseConfigError } from "../../lib/supabaseClient";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("checking");
  const [error, setError] = useState(location.state?.message || "");

  useEffect(() => {
    let isMounted = true;

    getAdminAuthState()
      .then((state) => {
        if (!isMounted) return;

        if (state.status === "authorized") {
          navigate("/admin/products", { replace: true });
          return;
        }

        setStatus("idle");
        if (state.message) setError(state.message);
      })
      .catch((authError) => {
        if (!isMounted) return;
        setStatus("idle");
        setError(authError.message);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (location.pathname === "/admin") {
    return <Navigate to="/admin/products" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await signInAdmin(formData);
      navigate("/admin/products", { replace: true });
    } catch (loginError) {
      setError(loginError.message);
      setStatus("idle");
    }
  };

  const isLoading = status === "checking" || status === "loading";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-md border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
        <div className="mb-8">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-amber-400 text-slate-950">
            <Lock size={22} />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">Panel privado</p>
          <h1 className="mt-2 text-3xl font-black">Ingresar al admin</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Solo usuarios autenticados y agregados a admin_users pueden acceder.
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-5 rounded-md border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
            {supabaseConfigError}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
            {error}
          </div>
        )}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-300">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="h-12 rounded-md border border-slate-700 bg-slate-950 px-4 text-sm text-slate-100 outline-none transition-shadow focus:shadow-[0_0_0_1px_rgba(251,191,36,0.85)]"
              autoComplete="email"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-300">Contrasena</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="h-12 rounded-md border border-slate-700 bg-slate-950 px-4 text-sm text-slate-100 outline-none transition-shadow focus:shadow-[0_0_0_1px_rgba(251,191,36,0.85)]"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={!isSupabaseConfigured || isLoading}
            className="mt-2 h-12 rounded-md bg-amber-400 px-4 text-sm font-black text-slate-950 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
