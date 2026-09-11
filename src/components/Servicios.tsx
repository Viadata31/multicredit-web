

import {
  // BriefcaseBusiness,
  CircleDollarSign,
  HandCoins,
  Landmark,
  PiggyBank,
  WalletCards,
} from "lucide-react";

const servicios = [
  {
    titulo: "Préstamos personales",
    descripcion:
      "Opciones de financiamiento para proyectos personales, gastos importantes o necesidades específicas.",
    icono: WalletCards,
  },
  {
    titulo: "Consolidación de deudas",
    descripcion:
      "Evalúa alternativas para organizar tus compromisos financieros en una solución más manejable.",
    icono: HandCoins,
  },
  {
    titulo: "Créditos para jubilados",
    descripcion:
      "Alternativas pensadas para jubilados y pensionados, con atención personalizada.",
    icono: PiggyBank,
  },
  {
    titulo: "Sector público",
    descripcion:
      "Opciones de crédito para colaboradores del sector público, según evaluación y condiciones aplicables.",
    icono: Landmark,
  },
  // {
  //   titulo: "Sector privado",
  //   descripcion:
  //     "Soluciones de financiamiento para trabajadores del sector privado que cumplan con los requisitos establecidos.",
  //   icono: BriefcaseBusiness,
  // },
  {
    titulo: "Asesoría crediticia",
    descripcion:
      "Te orientamos para entender las opciones disponibles y encontrar una alternativa acorde a tu situación.",
    icono: CircleDollarSign,
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
            Nuestros servicios
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Opciones de crédito que se adaptan a ti
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Conoce algunas de las soluciones que podemos evaluar según tus
            necesidades y perfil financiero.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {servicios.map((servicio, index) => {
            const Icono = servicio.icono;
        
            return (
              <article
                key={servicio.titulo}
                className={`group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md md:col-span-1 lg:col-span-2 ${
                  index === 3 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                  <Icono className="size-6" />
                </div>
        
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {servicio.titulo}
                </h3>
        
                <p className="mt-3 leading-7 text-slate-600">
                  {servicio.descripcion}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}