import {
  BadgeCheck,
  ClipboardCheck,
  MessageCircleMore,
  UserRoundCheck,
} from "lucide-react";

const beneficios = [
  {
    titulo: "Atención personalizada",
    descripcion:
      "Te orientamos según tus necesidades y situación particular.",
    icono: UserRoundCheck,
  },
  {
    titulo: "Proceso sencillo",
    descripcion:
      "Buscamos que cada paso sea fácil de comprender y completar.",
    icono: ClipboardCheck,
  },
  {
    titulo: "Orientación clara",
    descripcion:
      "Recibes información directa sobre las alternativas disponibles.",
    icono: MessageCircleMore,
  },
  {
    titulo: "Acompañamiento",
    descripcion:
      "Te apoyamos desde el primer contacto hasta completar tu proceso.",
    icono: BadgeCheck,
  },
];

export function Beneficios() {
  return (
    <section id="beneficios" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
              ¿Por qué Multicredit?
            </p>

            <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Acompañamiento claro durante todo el proceso
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Nuestro objetivo es orientarte de forma sencilla para que
              conozcas las opciones disponibles y puedas avanzar con mayor
              claridad.
            </p>
          </div>

          {/* Beneficios */}
          <div className="grid gap-5 sm:grid-cols-2">
            {beneficios.map((beneficio) => {
              const Icono = beneficio.icono;

              return (
                <article
                  key={beneficio.titulo}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <Icono className="size-5" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {beneficio.titulo}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {beneficio.descripcion}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}