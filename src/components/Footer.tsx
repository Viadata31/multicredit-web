export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <img
              src="/images/logo_multicredit.png"
              alt="Multicredit"
              className="h-16 w-auto object-contain"
            />

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              Soluciones de crédito y orientación financiera con atención
              personalizada.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Navegación
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#servicios"
                className="text-sm text-slate-600 transition-colors hover:text-orange-600"
              >
                Servicios
              </a>

              <a
                href="#beneficios"
                className="text-sm text-slate-600 transition-colors hover:text-orange-600"
              >
                Beneficios
              </a>

              <a
                href="#como-funciona"
                className="text-sm text-slate-600 transition-colors hover:text-orange-600"
              >
                Cómo funciona
              </a>

              <a
                href="#contacto"
                className="text-sm text-slate-600 transition-colors hover:text-orange-600"
              >
                Contacto
              </a>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Multicredit
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>Panamá, República de Panamá</p>

              <p>
                Contáctanos mediante el formulario y uno de nuestros asesores
                se comunicará contigo.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Multicredit. Todos los derechos
              reservados.
            </p>

            <p>
              Las solicitudes están sujetas a evaluación y aprobación.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}