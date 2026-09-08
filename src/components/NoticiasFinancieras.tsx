
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../integrations/supabase/client";

type ImagenNoticia = {
  id: string;
  imagen_url: string;
  orden: number;
};

type Noticia = {
  id: string;
  titulo: string;
  resumen: string | null;
  contenido: string;
  creado_en: string;
  imagenes: ImagenNoticia[];
};

export default function NoticiasFinancieras() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [noticiaActual, setNoticiaActual] = useState(0);
  const [imagenActual, setImagenActual] = useState(0);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  useEffect(() => {
    const cargarNoticias = async () => {
      setCargando(true);
      setError("");

      try {
        const { data: noticiasData, error: noticiasError } = await supabase
          .from("noticias_financieras")
          .select("id, titulo, resumen, contenido, creado_en")
          .eq("publicado", true)
          .order("creado_en", { ascending: false });

        if (noticiasError) {
          console.error("Error cargando noticias:", noticiasError);
          setError("No se pudieron cargar las noticias.");
          return;
        }

        if (!noticiasData || noticiasData.length === 0) {
          setNoticias([]);
          return;
        }

        const ids = noticiasData.map((noticia) => noticia.id);

        const { data: imagenesData, error: imagenesError } = await supabase
          .from("noticias_imagenes")
          .select("id, noticia_id, imagen_url, orden")
          .in("noticia_id", ids)
          .order("orden", { ascending: true });

        if (imagenesError) {
          console.error("Error cargando imágenes:", imagenesError);
          setError("No se pudieron cargar las imágenes de las noticias.");
          return;
        }

        const noticiasConImagenes: Noticia[] = noticiasData.map((noticia) => ({
          ...noticia,
          imagenes: (imagenesData ?? [])
            .filter((imagen) => imagen.noticia_id === noticia.id)
            .map(({ id, imagen_url, orden }) => ({
              id,
              imagen_url,
              orden,
            })),
        }));

        setNoticias(noticiasConImagenes);
      } catch (err) {
        console.error("Error inesperado:", err);
        setError("Ocurrió un error al cargar las noticias.");
      } finally {
        setCargando(false);
      }
    };

    cargarNoticias();
  }, []);

  useEffect(() => {
    setImagenActual(0);
    setMostrarContenido(false);
  }, [noticiaActual]);

  const noticia = noticias[noticiaActual];

  const siguienteImagen = () => {
    if (!noticia || noticia.imagenes.length <= 1) return;

    setImagenActual((actual) =>
      actual === noticia.imagenes.length - 1 ? 0 : actual + 1
    );
  };

  const imagenAnterior = () => {
    if (!noticia || noticia.imagenes.length <= 1) return;

    setImagenActual((actual) =>
      actual === 0 ? noticia.imagenes.length - 1 : actual - 1
    );
  };

  const siguienteNoticia = () => {
    setNoticiaActual((actual) =>
      actual === noticias.length - 1 ? 0 : actual + 1
    );
  };

  const noticiaAnterior = () => {
    setNoticiaActual((actual) =>
      actual === 0 ? noticias.length - 1 : actual - 1
    );
  };

  const formatearFecha = (fecha: string) => {
    return new Intl.DateTimeFormat("es-PA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(fecha));
  };

  if (cargando) {
    return (
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="h-8 w-64 animate-pulse bg-slate-200" />
          <div className="mt-6 h-96 animate-pulse bg-slate-200" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-center text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!noticia) {
    return null;
  }

  return (
    <section id="noticias" className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">

        {/* Encabezado */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
            Actualidad
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Noticias financieras
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Mantente informado sobre las últimas novedades y acontecimientos
            del sector financiero.
          </p>
        </div>

        {/* Noticia */}
        <div className="overflow-hidden border border-slate-200 bg-white shadow-sm">

          {!mostrarContenido ? (
            <>
              {/* Imagen */}
              {noticia.imagenes.length > 0 && (
                <div className="relative">

                  <img
                    src={noticia.imagenes[imagenActual].imagen_url}
                    alt={noticia.titulo}
                    className="h-64 w-full object-cover md:h-105"
                  />

                  {/* Flechas de imágenes */}
                  {noticia.imagenes.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={imagenAnterior}
                        aria-label="Imagen anterior"
                        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={siguienteImagen}
                        aria-label="Siguiente imagen"
                        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow transition hover:bg-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Indicadores */}
                      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {noticia.imagenes.map((imagen, index) => (
                          <button
                            key={imagen.id}
                            type="button"
                            onClick={() => setImagenActual(index)}
                            aria-label={`Mostrar imagen ${index + 1}`}
                            className={`h-2.5 w-2.5 rounded-full transition ${
                              index === imagenActual
                                ? "bg-orange-600"
                                : "bg-white/70"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Información */}
              <div className="p-6 md:p-8">

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatearFecha(noticia.creado_en)}</span>
                </div>

                <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                  {noticia.titulo}
                </h3>

                {noticia.resumen && (
                  <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">
                    {noticia.resumen}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setMostrarContenido(true)}
                  className="mt-6 inline-flex items-center gap-2 bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  Leer noticia
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            /* Contenido completo */
            <div className="p-6 md:p-10">

              <button
                type="button"
                onClick={() => setMostrarContenido(false)}
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-orange-600"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays className="h-4 w-4" />
                <span>{formatearFecha(noticia.creado_en)}</span>
              </div>

              <h3 className="mt-3 text-3xl font-bold text-slate-900">
                {noticia.titulo}
              </h3>

              <div
                className="prose prose-slate mt-8 max-w-none"
                dangerouslySetInnerHTML={{
                  __html: noticia.contenido,
                }}
              />
            </div>
          )}
        </div>

        {/* Navegación entre noticias */}
        {noticias.length > 1 && (
          <div className="mt-6 flex items-center justify-between">

            <button
              type="button"
              onClick={noticiaAnterior}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-orange-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Noticia anterior
            </button>

            <span className="text-sm text-slate-500">
              {noticiaActual + 1} / {noticias.length}
            </span>

            <button
              type="button"
              onClick={siguienteNoticia}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-orange-600"
            >
              Siguiente noticia
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>
        )}
      </div>
    </section>
  );
}