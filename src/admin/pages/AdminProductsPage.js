import React, { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { listAdminProducts } from "../services/productService";

const formatPrice = (value) => {
  if (value === null || value === undefined || value === "") return "Sin precio";
  return `$${Number(value).toLocaleString("es-AR")}`;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    listAdminProducts()
      .then((items) => {
        if (!isMounted) return;
        setProducts(items);
        setStatus("ready");
      })
      .catch((productsError) => {
        if (!isMounted) return;
        setError(productsError.message);
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">Catalogo</p>
          <h2 className="mt-2 text-3xl font-black">Productos</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Este listado consulta Supabase. La tienda publica todavia usa el mock local.
          </p>
        </div>
        <div className="rounded-md border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          {products.length} productos
        </div>
      </div>

      {status === "loading" && (
        <div className="mt-8 rounded-md border border-slate-800 bg-slate-900 p-6 text-sm text-slate-300">
          Cargando productos desde Supabase...
        </div>
      )}

      {status === "error" && (
        <div className="mt-8 rounded-md border border-red-900/60 bg-red-950/30 p-6 text-sm text-red-100">
          {error}
        </div>
      )}

      {status === "ready" && products.length === 0 && (
        <div className="mt-8 rounded-md border border-slate-800 bg-slate-900 p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-md bg-slate-800 text-amber-400">
            <Package size={22} />
          </div>
          <h3 className="mt-4 text-xl font-black">No hay productos cargados</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
            Cuando se migre el catalogo, los productos creados en Supabase apareceran aca.
          </p>
        </div>
      )}

      {status === "ready" && products.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-md border border-slate-800 bg-slate-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-950/60 text-xs uppercase tracking-[0.16em] text-slate-400">
                <tr>
                  <th className="px-4 py-3">Orden</th>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Categoria</th>
                  <th className="px-4 py-3">Precio</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Imagenes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-4 text-slate-400">{product.sort_order}</td>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-100">{product.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{product.slug}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{product.category?.name || "Sin categoria"}</td>
                    <td className="px-4 py-4 text-slate-300">{formatPrice(product.price)}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-sm bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
                        {product.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{product.product_images?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
