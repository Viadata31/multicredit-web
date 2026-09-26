export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6">
    
        {/* Encabezado principal */}
        <div className="flex items-center justify-between py-2">
    
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo_multicredit.png"
              alt="Multicredit"
              className="h-20 w-auto select-none object-contain md:h-24"
              draggable="false"
            />
          </div>
    
          {/* Menú para escritorio */}
          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#servicios"
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
            >
              Servicios
            </a>
    
            <a
              href="#beneficios"
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
            >
              Beneficios
            </a>
    
            <a
              href="#como-funciona"
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
            >
              Cómo funciona
            </a>
    
            <a
              href="#contacto"
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
            >
              Contacto
            </a>
          </nav>
    
          {/* Botón móvil */}
          <details className="lg:hidden">
            <summary
              className="flex cursor-pointer list-none flex-col gap-1.5 rounded-md p-2 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <span className="h-0.5 w-6 bg-slate-700"></span>
              <span className="h-0.5 w-6 bg-slate-700"></span>
              <span className="h-0.5 w-6 bg-slate-700"></span>
            </summary>
    
            {/* Menú móvil */}
            <div className="border-t border-slate-200 py-2">
              <a
                href="#servicios"
                className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
              >
                Servicios
              </a>
    
              <a
                href="#beneficios"
                className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
              >
                Beneficios
              </a>
    
              <a
                href="#como-funciona"
                className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
              >
                Cómo funciona
              </a>
    
              <a
                href="#contacto"
                className="block py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
              >
                Contacto
              </a>
            </div>
          </details>
    
        </div>
      </div>
    </header>
  );
} 