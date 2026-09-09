

import { useEffect, useState } from "react";
import {
  LogOut,
  Newspaper,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";

type Noticia = {
  id: string;
  titulo: string;
  resumen: string | null;
  publicado: boolean;
  creado_en: string;
  actualizado_en: string;
};

export default function AdminNoticias() {
  const navigate = useNavigate();

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarNoticias = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("noticias_financieras")
      .select(
        "id, titulo, resumen, publicado, creado_en, actualizado_en",
      )
      .order("creado_en", { ascending: false });

    if (error) {
      console.error("Error cargando noticias:", error);
      setError("No se pudieron cargar las noticias.");
      setLoading(false);
      return;
    }

    setNoticias(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error);
      return;
    }

    navigate("/admin/login", { replace: true });
  };

  const eliminarNoticia = async (id: string) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta noticia?\n\nTambién se eliminarán las imágenes asociadas.",
    );
  
    if (!confirmar) return;
  
    setError("");
  
    const { data, error } = await supabase.functions.invoke(
      "eliminar-noticia",
      {
        body: {
          noticia_id: id,
        },
      },
    );
  
  
    if (error) {
      console.error(
        "Error llamando a eliminar-noticia:",
        error,
      );
  
      setError(
        "No se pudo eliminar la noticia. Las imágenes no fueron eliminadas.",
      );
  
      return;
    }
  
    if (!data?.success) {
      console.error(
        "Error de la función:",
        data?.error,
      );
  
      setError(
        data?.error ||
          "No se pudo eliminar la noticia.",
      );
  
      return;
    }
  
    setNoticias((actuales) =>
      actuales.filter((noticia) => noticia.id !== id),
    );
  };

  const formatearFecha = (fecha: string) => {
    return new Intl.DateTimeFormat("es-PA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(fecha));
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ENCABEZADO */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white">
              <Newspaper className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Noticias Financieras
              </h1>

              <p className="text-xs text-slate-500">
                Panel de administración
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={cerrarSesion}
            className="flex items-center gap-2 border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* TÍTULO Y BOTÓN */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Noticias
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Administra las noticias financieras de la empresa.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/noticias/nueva")}
            className="inline-flex items-center gap-2 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Nueva noticia
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* CARGANDO */}
        {loading ? (
          <div className="border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Cargando noticias...
            </p>
          </div>
        ) : noticias.length === 0 ? (
          /* SIN NOTICIAS */
          <div className="border border-slate-200 bg-white p-10 text-center">
            <Newspaper className="mx-auto mb-4 h-10 w-10 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-800">
              No hay noticias todavía
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Cuando crees una noticia, aparecerá aquí.
            </p>
          </div>
        ) : (
          /* LISTADO */
          <div className="overflow-hidden border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-175">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Noticia
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Fecha
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Estado
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {noticias.map((noticia) => (
                    <tr
                      key={noticia.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {noticia.titulo}
                          </p>

                          {noticia.resumen && (
                            <p className="mt-1 max-w-xl truncate text-sm text-slate-500">
                              {noticia.resumen}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {formatearFecha(noticia.creado_en)}
                      </td>

                      <td className="px-6 py-4">
                        {noticia.publicado ? (
                          <span className="inline-flex bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Publicada
                          </span>
                        ) : (
                          <span className="inline-flex bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            Borrador
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/noticias/editar/${noticia.id}`)}
                            className="p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            title="Editar noticia"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              eliminarNoticia(noticia.id)
                            }
                            className="p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            title="Eliminar noticia"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}