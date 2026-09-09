

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  X,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { supabase } from "../../integrations/supabase/client";
import EditorContenido from "../../components/admin/EditorContenido";

type ImagenExistente = {
  id: string;
  imagen_url: string;
  orden: number;
};

export default function AdminEditarNoticia() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [contenido, setContenido] = useState("");
  const [publicado, setPublicado] = useState(false);

  const [imagenesExistentes, setImagenesExistentes] = useState<
    ImagenExistente[]
  >([]);

  const [imagenesNuevas, setImagenesNuevas] = useState<File[]>([]);

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

      try {
        const { data, error: noticiaError } = await supabase
          .from("noticias_financieras")
          .select("titulo, resumen, contenido, publicado")
          .eq("id", id)
          .maybeSingle();

        if (noticiaError) {
          console.error("Error cargando noticia:", noticiaError);
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

        const { data: imagenes, error: imagenesError } = await supabase
          .from("noticias_imagenes")
          .select("id, imagen_url, orden")
          .eq("noticia_id", id)
          .order("orden", { ascending: true });

        if (imagenesError) {
          console.error("Error cargando imágenes:", imagenesError);
          setError("La noticia se cargó, pero no se pudieron cargar sus imágenes.");
          setCargando(false);
          return;
        }

        setImagenesExistentes(imagenes ?? []);
      } catch (error) {
        console.error("Error inesperado:", error);
        setError("Ocurrió un error al cargar la noticia.");
      } finally {
        setCargando(false);
      }
    };

    cargarNoticia();
  }, [id]);

  const seleccionarImagenes = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const archivos = Array.from(e.target.files);

    const imagenesValidas = archivos.filter((archivo) =>
      archivo.type.startsWith("image/")
    );

    if (imagenesValidas.length !== archivos.length) {
      setError("Solo se permiten archivos de imagen.");
      return;
    }

    setError("");

    setImagenesNuevas((anteriores) => [
      ...anteriores,
      ...imagenesValidas,
    ]);

    e.target.value = "";
  };

  const eliminarImagenNueva = (indice: number) => {
    setImagenesNuevas((anteriores) =>
      anteriores.filter((_, index) => index !== indice)
    );
  };

  const eliminarImagenExistente = async (
    imagen: ImagenExistente,
  ) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta imagen?",
    );
  
    if (!confirmar) {
      return;
    }
  
    try {
      setError("");
      setGuardando(true);
  
      const { data, error: functionError } =
        await supabase.functions.invoke(
          "eliminar-imagen-noticia",
          {
            body: {
              noticia_id: id,
              imagen_id: imagen.id,
            },
          },
        );
  
      if (functionError) {
        console.error(
          "Error de la Edge Function:",
          functionError,
        );
  
        throw new Error(
          functionError.message ||
            "No se pudo eliminar la imagen.",
        );
      }
  
      if (!data?.success) {
        throw new Error(
          data?.error ||
            "No se pudo eliminar la imagen.",
        );
      }
  
      // Actualizar la interfaz
      setImagenesExistentes((imagenes) =>
        imagenes.filter(
          (item) => item.id !== imagen.id,
        ),
      );
    } catch (error) {
      console.error(
        "Error eliminando imagen:",
        error,
      );
  
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la imagen.",
      );
    } finally {
      setGuardando(false);
    }
  };

  const guardarCambios = async (
    e: FormEvent<HTMLFormElement>
  ) => {
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
      // 1. Actualizar información de la noticia
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
        console.error(
          "Error actualizando noticia:",
          updateError
        );

        setError("No se pudieron guardar los cambios.");
        return;
      }

      // 2. Subir nuevas imágenes
      for (let i = 0; i < imagenesNuevas.length; i++) {
        const imagen = imagenesNuevas[i];

        const extension =
          imagen.name.split(".").pop()?.toLowerCase() || "jpg";

        const nombreArchivo = `${id}/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("noticias-financieras")
          .upload(nombreArchivo, imagen, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error(
            "Error subiendo imagen:",
            uploadError
          );

          setError(
            `La noticia se actualizó, pero no se pudo subir la imagen "${imagen.name}".`
          );

          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("noticias-financieras")
          .getPublicUrl(nombreArchivo);

        /*
         * Las imágenes nuevas se colocan después
         * de las imágenes existentes.
         */
        const siguienteOrden =
          imagenesExistentes.length + i;

        const { error: imagenError } = await supabase
          .from("noticias_imagenes")
          .insert({
            noticia_id: id,
            imagen_url: publicUrlData.publicUrl,
            orden: siguienteOrden,
          });

        if (imagenError) {
          console.error(
            "Error registrando imagen:",
            imagenError
          );

          setError(
            `La noticia se actualizó, pero no se pudo registrar la imagen "${imagen.name}".`
          );

          return;
        }
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
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
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

          <form
            onSubmit={guardarCambios}
            className="space-y-6 p-6"
          >
            {/* TÍTULO */}
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

            {/* RESUMEN */}
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

            {/* CONTENIDO */}
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

            {/* IMÁGENES EXISTENTES */}
            <div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-slate-700">
                  Imágenes actuales
                </label>

                <p className="mt-1 text-xs text-slate-500">
                  Estas imágenes ya están asociadas a la noticia.
                </p>
              </div>

              {imagenesExistentes.length === 0 ? (
                <div className="border border-dashed border-slate-300 px-4 py-8 text-center">
                  <p className="text-sm text-slate-500">
                    Esta noticia no tiene imágenes.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {imagenesExistentes.map((imagen, index) => (
                    <div
                      key={imagen.id}
                      className="relative overflow-hidden border border-slate-200 bg-slate-50"
                    >
                      <img
                        src={imagen.imagen_url}
                        alt={`Imagen ${index + 1}`}
                        className="h-40 w-full object-cover"
                      />

                      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-3 py-2">
                        <span className="text-xs text-slate-500">
                          Imagen {index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            eliminarImagenExistente(imagen)
                          }
                          disabled={guardando}
                          title="Eliminar imagen"
                          className="inline-flex h-8 w-8 items-center justify-center text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AGREGAR IMÁGENES */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Agregar imágenes
              </label>

              <div className="border border-dashed border-slate-300 bg-slate-50 p-6">
                <label
                  htmlFor="imagenes"
                  className="flex cursor-pointer flex-col items-center justify-center text-center"
                >
                  <ImagePlus className="h-8 w-8 text-slate-400" />

                  <span className="mt-2 text-sm font-medium text-slate-700">
                    Seleccionar imágenes
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    Puedes seleccionar una o varias imágenes
                  </span>

                  <input
                    id="imagenes"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={seleccionarImagenes}
                    disabled={guardando}
                    className="hidden"
                  />
                </label>
              </div>

              {/* PREVISUALIZACIÓN DE NUEVAS IMÁGENES */}
              {imagenesNuevas.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 text-sm font-medium text-slate-700">
                    Nuevas imágenes
                  </p>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {imagenesNuevas.map((imagen, index) => (
                      <div
                        key={`${imagen.name}-${index}`}
                        className="relative overflow-hidden border border-slate-200 bg-slate-50"
                      >
                        <img
                          src={URL.createObjectURL(imagen)}
                          alt={`Nueva imagen ${index + 1}`}
                          className="h-40 w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            eliminarImagenNueva(index)
                          }
                          disabled={guardando}
                          title="Quitar imagen"
                          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow transition hover:bg-white hover:text-red-700 disabled:opacity-50"
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <div className="border-t border-slate-200 bg-white px-3 py-2">
                          <p className="truncate text-xs text-slate-500">
                            {imagen.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PUBLICACIÓN */}
            <div className="border-t border-slate-200 pt-5">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={publicado}
                  onChange={(e) =>
                    setPublicado(e.target.checked)
                  }
                  disabled={guardando}
                  className="h-4 w-4"
                />

                <span className="text-sm text-slate-700">
                  Noticia publicada
                </span>
              </label>

              <p className="mt-2 text-xs text-slate-500">
                Desmarca esta opción para convertir la noticia en
                borrador.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* BOTONES */}
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() =>
                  navigate("/admin/noticias")
                }
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

                {guardando
                  ? "Guardando..."
                  : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}