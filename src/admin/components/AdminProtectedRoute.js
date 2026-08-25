import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAdminAuthState } from "../services/authService";

const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
    <div className="w-full max-w-sm rounded-md border border-slate-800 bg-slate-900 p-6 text-center">
      <p className="text-sm font-semibold">Verificando sesion...</p>
      <p className="mt-2 text-sm text-slate-400">Estamos comprobando permisos de administrador.</p>
    </div>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
    <div className="w-full max-w-md rounded-md border border-red-900/60 bg-slate-900 p-6">
      <p className="text-sm font-semibold text-red-300">No se pudo validar el acceso</p>
      <p className="mt-2 text-sm text-slate-300">{message}</p>
    </div>
  </div>
);

export default function AdminProtectedRoute({ children }) {
  const location = useLocation();
  const [authState, setAuthState] = useState({ status: "checking" });

  useEffect(() => {
    let isMounted = true;

    getAdminAuthState()
      .then((state) => {
        if (isMounted) setAuthState(state);
      })
      .catch((error) => {
        if (isMounted) setAuthState({ status: "error", message: error.message });
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (authState.status === "checking") {
    return <LoadingState />;
  }

  if (authState.status === "authorized") {
    return children;
  }

  if (authState.status === "error") {
    return <ErrorState message={authState.message} />;
  }

  return (
    <Navigate
      to="/admin/login"
      replace
      state={{
        from: location,
        message: authState.message,
        reason: authState.status,
      }}
    />
  );
}
