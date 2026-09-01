const pasos = [
  {
    numero: "1",
    titulo: "Completa tus datos",
    descripcion:
      "Déjanos tu información básica y el servicio que te interesa.",
  },
  {
    numero: "2",
    titulo: "Te contactamos",
    descripcion:
      "Un asesor se comunica contigo para conocer mejor tu necesidad.",
  },
  {
    numero: "3",
    titulo: "Evaluamos tu perfil",
    descripcion:
      "Revisamos la información para identificar opciones disponibles.",
  },
  {
    numero: "4",
    titulo: "Conoce tu opción",
    descripcion:
      "Te presentamos una alternativa acorde con la evaluación realizada.",
  },
];

export function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="bg-white py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
            Cómo funciona
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Un proceso pensado para ser sencillo
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Déjanos tus datos y te acompañamos paso a paso.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pasos.map((paso) => (
            <article
              key={paso.numero}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-lg font-black text-white">
                {paso.numero}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {paso.titulo}
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {paso.descripcion}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}