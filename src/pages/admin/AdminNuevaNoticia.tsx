
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "../../integrations/supabase/client";
import EditorContenido from "../../components/admin/EditorContenido";

export default function AdminNuevaNoticia() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [contenido, setContenido] = useState("");
  const [publicado, setPublicado] = useState(false);

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const guardarNoticia = async (e: FormEvent<HTMLFormElement>) => {
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

    setGuardando(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setError("No se pudo verificar el usuario administrador.");
        return;
      }

      const { error: insertError } = await supabase
        .from("noticias_financieras")
        .insert({
          titulo: titulo.trim(),
          resumen: resumen.trim() || null,
          contenido: contenido.trim(),
          publicado,
          creado_por: user.id,
        });

      if (insertError) {
        console.error("Error creando noticia:", insertError);
        setError("No se pudo guardar la noticia.");
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

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Encabezado */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Administración de noticias
            </h1>
            <p className="text-sm text-slate-500">
              Crear nueva noticia
            </p>
          </div>
        </div>
      </header>

      {/* Contenido */}
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
              Nueva noticia
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Completa la información de la noticia.
            </p>
          </div>

          <form onSubmit={guardarNoticia} className="space-y-6 p-6">
            {/* Título */}
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
                placeholder="Ej. Nuevas tasas de interés para préstamos"
                className="w-full border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                disabled={guardando}
              />
            </div>

            {/* Resumen */}
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
                placeholder="Breve descripción de la noticia..."
                rows={3}
                className="w-full resize-none border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500"
                disabled={guardando}
              />
            </div>

            {/* Contenido */}
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

            {/* Publicar */}
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
                  Publicar noticia inmediatamente
                </span>
              </label>

              <p className="mt-2 text-xs text-slate-500">
                Si no está marcada, la noticia se guardará como borrador.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Botones */}
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

                {guardando ? "Guardando..." : "Guardar noticia"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}