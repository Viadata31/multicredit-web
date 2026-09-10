import { useState } from "react";
import { supabase } from "../integrations/supabase/client";

const formatTelefono = (value: string) => {
  const numeros = value.replace(/\D/g, "").slice(0, 8);

  if (numeros.length > 4) {
    return `${numeros.slice(0, 4)}-${numeros.slice(4)}`;
  }

  return numeros;
};

export function Contacto() {
  const [enviando, setEnviando] = useState(false);
  const [telefono, setTelefono] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nombre = String(
      formData.get("nombre") ?? "",
    ).trim();

    const telefonoFormateado = String(
      formData.get("telefono") ?? "",
    ).trim();

    const correo = String(
      formData.get("correo") ?? "",
    ).trim();

    const servicio = String(
      formData.get("servicio") ?? "",
    ).trim();

    const mensaje = String(
      formData.get("mensaje") ?? "",
    ).trim();

    setEnviando(true);

    try {
      const { error } = await supabase
        .from("contactos_web")
        .insert({
          nombre,
          telefono: telefonoFormateado,
          correo,
          servicio,
          mensaje: mensaje || null,
        });

      if (error) {
        console.error("Error de Supabase:", error);

        alert(
          `Error: ${error.message}`,
        );

        return;
      }

      alert(
        "Gracias. Hemos recibido tus datos y pronto nos comunicaremos contigo.",
      );

      form.reset();
      setTelefono("");
    } catch (error) {
      console.error(
        "Error enviando formulario:",
        error,
      );

      alert(
        "No se pudo enviar la información. Inténtalo nuevamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="contacto" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Información */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
              Contáctanos
            </p>

            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Cuéntanos qué necesitas
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Déjanos tus datos y uno de nuestros asesores se comunicará
              contigo para orientarte sobre las opciones disponibles.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-bold text-orange-600">✓</span>
                <p className="text-slate-700">
                  Atención personalizada
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-orange-600">✓</span>
                <p className="text-slate-700">
                  Orientación clara
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-orange-600">✓</span>
                <p className="text-slate-700">
                  Proceso sencillo
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Nombre completo
                </label>

                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Escribe tu nombre"
                  onChange={(e) => {
                    e.target.value =
                      e.target.value.toUpperCase();
                  }}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="telefono"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Teléfono
                </label>

                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel"
                  placeholder="6000-0000"
                  value={telefono}
                  onChange={(e) =>
                    setTelefono(formatTelefono(e.target.value))
                  }
                  maxLength={9}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="correo"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="correo"
                  name="correo"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="servicio"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Servicio de interés
                </label>

                <select
                  id="servicio"
                  name="servicio"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>

                  <option value="prestamo-personal">
                    Préstamo personal
                  </option>

                  <option value="consolidacion-deudas">
                    Consolidación de deudas
                  </option>

                  <option value="jubilados">
                    Crédito para jubilados
                  </option>

                  <option value="sector-publico">
                    Sector público
                  </option>

                  <option value="sector-privado">
                    Sector privado
                  </option>

                  <option value="asesoria-crediticia">
                    Asesoría crediticia
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Mensaje{" "}
                  <span className="font-normal text-slate-400">
                    (opcional)
                  </span>
                </label>

                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Cuéntanos brevemente cómo podemos ayudarte"
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20"
                />
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full rounded-lg bg-orange-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando
                  ? "Enviando..."
                  : "Quiero que me contacten"}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Al enviar tus datos aceptas que Multicredit pueda
                contactarte para brindarte información sobre sus servicios.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}