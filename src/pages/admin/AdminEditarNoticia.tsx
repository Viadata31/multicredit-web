

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "../../integrations/supabase/client";
import EditorContenido from "../../components/admin/EditorContenido";

export default function AdminEditarNoticia() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [contenido, setContenido] = useState("");
  const [publicado, setPublicado] = useState(false);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarNoticia = async () => {
      if (!id) {
        setError("No se encontró el identificador de la noticia.");
        setCargando(false);
        return;
      }

      const { data, error } = await supabase
        .from("noticias_financieras")
        .select("titulo, resumen, contenido, publicado")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error cargando noticia:", error);
        setError("No se pudo cargar la noticia.");
        setCargando(false);
        return;
      }

      if (!data) {
        setError("La noticia no existe.");
        setCargando(false);
        return;
      }

      setTitulo(data.titulo);
      setResumen(data.resumen ?? "");
      setContenido(data.contenido);
      setPublicado(data.publicado);

      setCargando(false);
    };

    cargarNoticia();
  }, [id]);

  const guardarCambios = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!titulo.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    if (!contenido.trim()) {
      setError("El contenido es obligatorio.");
      return;
    }

    if (!id) {
      setError("No se encontró la noticia.");
      return;
    }

    setGuardando(true);

    try {
      const { error: updateError } = await supabase
        .from("noticias_financieras")
        .update({
          titulo: titulo.trim(),
          resumen: resumen.trim() || null,
          contenido: contenido.trim(),
          publicado,
          actualizado_en: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) {
        console.error("Error actualizando noticia:", updateError);
        setError("No se pudieron guardar los cambios.");
        return;
      }

      navigate("/admin/noticias");
    } catch (error) {
      console.error("Error inesperado:", error);
      setError("Ocurrió un error inesperado.");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">
          Cargando noticia...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Administración de noticias
            </h1>
            <p className="text-sm text-slate-500">
              Editar noticia
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <button
          type="button"
          onClick={() => navigate("/admin/noticias")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a noticias
        </button>

        <div className="border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Editar noticia
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Modifica la información de la noticia.
            </p>
          </div>

          <form onSubmit={guardarCambios} className="space-y-6 p-6">
            <div>
              <label
                htmlFor="titulo"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Título
              </label>

              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={guardando}
                className="w-full border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label
                htmlFor="resumen"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Resumen
              </label>

              <textarea
                id="resumen"
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
                disabled={guardando}
                rows={3}
                className="w-full resize-none border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Contenido
              </label>
            
              <EditorContenido
                value={contenido}
                onChange={setContenido}
                disabled={guardando}
              />
            </div>

            <div className="border-t border-slate-200 pt-5">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={publicado}
                  onChange={(e) => setPublicado(e.target.checked)}
                  disabled={guardando}
                  className="h-4 w-4"
                />

                <span className="text-sm text-slate-700">
                  Noticia publicada
                </span>
              </label>

              <p className="mt-2 text-xs text-slate-500">
                Desmarca esta opción para convertir la noticia en borrador.
              </p>
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => navigate("/admin/noticias")}
                disabled={guardando}
                className="border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={guardando}
                className="inline-flex items-center gap-2 bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />

                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}