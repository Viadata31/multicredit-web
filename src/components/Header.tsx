

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <a href="/" className="flex items-center">
          <img
            src="/images/logo_multicredit.png"
            alt="Multicredit"
            className="h-20 w-auto object-contain md:h-24"
          />
        </a>

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
      </div>
    </header>
  );
}