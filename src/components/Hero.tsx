
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:min-h-162.5 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
            Soluciones financieras
          </p>

          <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Soluciones de crédito pensadas para ti
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Te ayudamos a encontrar opciones de financiamiento con
            atención personalizada, orientación clara y un proceso
            sencillo.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-lg bg-orange-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-700"
            >
              Solicitar información
            </a>

            <a
              href="#servicios"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-orange-600 hover:text-orange-600"
            >
              Conocer servicios
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-600" />
              <div>
                <p className="font-bold text-slate-800">
                  Atención personalizada
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Acompañamiento durante todo el proceso.
                </p>
              </div>
            </div>  
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange-600" />  
              <div>
                <p className="font-bold text-slate-800">
                  Proceso sencillo
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Información clara y orientación rápida.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200">
            <img
              src="/images/hero-multicredit.jpg"
              alt="Asesoría financiera Multicredit"
              className="aspect-4/3 h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-orange-600 px-6 py-5 text-white shadow-lg md:block">
            <p className="text-sm font-semibold">
              Asesoría clara
            </p>

            <p className="mt-1 text-xl font-black">
              De principio a fin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}