

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
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

          {/* Instagram */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Síguenos
            </h3>
            <div className="mt-4 flex flex-col gap-5">

              <a
                href="https://www.instagram.com/multicreditgroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              
                <span>@multicreditgroup</span>
              </a>
  
              {/* WhatsApp */}
              <a
                href="https://wa.me/50768248726"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.48 0 .13 5.35.13 11.92c0 2.1.55 4.15 1.6 5.96L.03 24l6.26-1.64a11.88 11.88 0 0 0 5.76 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.19-1.24-6.19-3.46-8.43ZM12.06 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.86 9.86 0 0 1-1.51-5.27C2.19 6.48 6.62 2.05 12.06 2.05c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.44-4.43 9.86-9.89 9.86Zm5.41-7.39c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
                  />
                </svg>
              
                <span>Escríbenos</span>
              </a>
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

