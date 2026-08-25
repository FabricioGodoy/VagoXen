import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Image, LayoutDashboard, LogOut, Package } from "lucide-react";
import { signOutAdmin } from "../services/authService";

const navItems = [
  { label: "Productos", to: "/admin/products", icon: Package, enabled: true },
  { label: "Media", to: "/admin/products", icon: Image, enabled: false },
  { label: "Contenido del sitio", to: "/admin/products", icon: LayoutDashboard, enabled: false },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <aside className="border-b border-slate-800 bg-slate-900/90 p-4 md:w-72 md:border-b-0 md:border-r md:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">VAGOS</p>
            <h1 className="mt-2 text-2xl font-black">Admin CMS</h1>
          </div>

          <nav className="mt-6 grid gap-2">
            {navItems.map(({ label, to, icon: Icon, enabled }) =>
              enabled ? (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition-colors",
                      isActive ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:bg-slate-800",
                    ].join(" ")
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ) : (
                <span
                  key={label}
                  className="flex cursor-not-allowed items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-slate-600"
                  aria-disabled="true"
                >
                  <Icon size={18} />
                  {label}
                </span>
              )
            )}
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
          >
            <LogOut size={17} />
            Cerrar sesion
          </button>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
