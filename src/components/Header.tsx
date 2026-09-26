

// export function Header() {
//   return (
//     <header className="border-b border-slate-200 bg-white">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
//         <div className="flex items-center">
//           <img
//             src="/images/logo_multicredit.png"
//             alt="Multicredit"
//             className="h-20 w-auto object-contain md:h-24"
//           />
//         </div>

//         <nav className="hidden items-center gap-8 lg:flex">
//           <a
//             href="#servicios"
//             className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//           >
//             Servicios
//           </a>

//           <a
//             href="#beneficios"
//             className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//           >
//             Beneficios
//           </a>

//           <a
//             href="#como-funciona"
//             className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//           >
//             Cómo funciona
//           </a>

//           <a
//             href="#contacto"
//             className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//           >
//             Contacto
//           </a>
//         </nav>
//       </div>
//     </header>
//   );
// }



export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-2">
        <div className="flex items-center justify-between">
    
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/logo_multicredit.png"
              alt="Multicredit"
              className="h-20 w-auto select-none object-contain md:h-24"
              draggable="false"
            />
          </div>
    
          {/* Menú desktop */}
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
    
          {/* Menú móvil */}
          <details className="relative lg:hidden">
            <summary
              className="flex cursor-pointer list-none flex-col gap-1.5 rounded-md p-2 text-slate-700 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <span className="block h-0.5 w-6 bg-current"></span>
              <span className="block h-0.5 w-6 bg-current"></span>
              <span className="block h-0.5 w-6 bg-current"></span>
            </summary>
    
            <nav className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
              <a
                href="#servicios"
                className="block rounded-md px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600"
              >
                Servicios
              </a>
    
              <a
                href="#beneficios"
                className="block rounded-md px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600"
              >
                Beneficios
              </a>
    
              <a
                href="#como-funciona"
                className="block rounded-md px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600"
              >
                Cómo funciona
              </a>
    
              <a
                href="#contacto"
                className="block rounded-md px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600"
              >
                Contacto
              </a>
            </nav>
          </details>
    
        </div>
      </div>
    </header>
  );
}