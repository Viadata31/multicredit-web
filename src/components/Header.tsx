// export function Header() {
//   return (
//     <header className="border-b border-slate-200 bg-white">
//       <div className="mx-auto max-w-7xl px-6">
    
//         {/* Encabezado principal */}
//         <div className="flex items-center justify-between py-2">
    
//           {/* Logo */}
//           <div className="flex items-center">
//             <img
//               src="/images/logo_multicredit.png"
//               alt="Multicredit"
//               className="h-20 w-auto select-none object-contain md:h-24"
//               draggable="false"
//             />
//           </div>
    
//           {/* Menú para escritorio */}
//           <nav className="hidden items-center gap-8 lg:flex">
//             <a
//               href="#servicios"
//               className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//             >
//               Servicios
//             </a>
    
//             <a
//               href="#beneficios"
//               className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//             >
//               Beneficios
//             </a>
    
//             <a
//               href="#como-funciona"
//               className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//             >
//               Cómo funciona
//             </a>
    
//             <a
//               href="#contacto"
//               className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600"
//             >
//               Contacto
//             </a>
//           </nav>
    
//           {/* Botón móvil */}
//           <details className="lg:hidden">
//             <summary
//               className="flex cursor-pointer list-none flex-col gap-1.5 rounded-md p-2 hover:bg-slate-100"
//               aria-label="Abrir menú"
//             >
//               <span className="h-0.5 w-6 bg-slate-700"></span>
//               <span className="h-0.5 w-6 bg-slate-700"></span>
//               <span className="h-0.5 w-6 bg-slate-700"></span>
//             </summary>
    
//             {/* Menú móvil */}
//             <div className="border-t border-slate-200 py-2">
//               <a
//                 href="#servicios"
//                 className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
//               >
//                 Servicios
//               </a>
    
//               <a
//                 href="#beneficios"
//                 className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
//               >
//                 Beneficios
//               </a>
    
//               <a
//                 href="#como-funciona"
//                 className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
//               >
//                 Cómo funciona
//               </a>
    
//               <a
//                 href="#contacto"
//                 className="block py-3 text-sm font-semibold text-slate-700 hover:text-orange-600"
//               >
//                 Contacto
//               </a>
//             </div>
//           </details>
    
//         </div>
//       </div>
//     </header>
//   );
// } 


export function Header() {
  return (
    <header className="relative border-b border-slate-200 bg-white">
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
    
          {/* Botón y contenedor móvil */}
          <details className="static lg:hidden">
            <summary
              className="flex cursor-pointer list-none flex-col gap-1.5 rounded-md p-2 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <span className="h-0.5 w-6 bg-slate-700"></span>
              <span className="h-0.5 w-6 bg-slate-700"></span>
              <span className="h-0.5 w-6 bg-slate-700"></span>
            </summary>
    
            {/* Menú móvil flotante */}
            <div className="absolute left-0 right-0 top-full z-50 border-b border-slate-200 bg-white px-6 py-2 shadow-lg">
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


// import { useState } from "react";
// // Nota: Si no usas lucide-react, puedes sustituirlos por tus propios SVG o componentes de iconos
// import { 
//   Menu, 
//   X, 
//   LogOut, 
//   FileText, 
//   ClipboardList, 
//   BarChart3, 
//   User 
// } from "lucide-react";

// export function Header() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="relative border-b border-slate-200 bg-white">
//       <div className="mx-auto max-w-7xl px-6">
        
//         {/* Encabezado Principal (Escritorio y Estado Cerrado en Móvil) */}
//         <div className="flex items-center justify-between py-2">
          
//           {/* Logo */}
//           <div className="flex items-center">
//             <img
//               src="/images/logo_multicredit.png"
//               alt="Multicredit"
//               className="h-20 w-auto select-none object-contain md:h-24"
//               draggable="false"
//             />
//           </div>

//           {/* Menú para escritorio */}
//           <nav className="hidden items-center gap-8 lg:flex">
//             <a href="#servicios" className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600">
//               Servicios
//             </a>
//             <a href="#beneficios" className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600">
//               Beneficios
//             </a>
//             <a href="#como-funciona" className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600">
//               Cómo funciona
//             </a>
//             <a href="#contacto" className="text-sm font-semibold text-slate-700 transition-colors hover:text-orange-600">
//               Contacto
//             </a>
//           </nav>

//           {/* Botón Hamburguesa Móvil (Solo visible si el menú está cerrado) */}
//           <button
//             onClick={() => setIsOpen(true)}
//             className="flex rounded-md p-2 hover:bg-slate-100 lg:hidden"
//             aria-label="Abrir menú"
//           >
//             <Menu className="h-6 w-6 text-slate-700" />
//           </button>
//         </div>
//       </div>

//       {/* Menú Móvil en Pantalla Completa (Estilo Segunda Imagen) */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 bg-white px-6 py-4 lg:hidden">
          
//           {/* Fila Superior del Menú Abierto */}
//           <div className="flex items-center justify-between border-b border-slate-100 pb-4">
//             {/* Botón de Cerrar (X) */}
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="rounded-md p-2 hover:bg-slate-100"
//               aria-label="Cerrar menú"
//             >
//               <X className="h-6 w-6 text-slate-700" />
//             </button>

//             {/* Botón Cerrar Sesión */}
//             <button 
//               onClick={() => {
//                 // Aquí va tu lógica de logout
//                 setIsOpen(false);
//               }}
//               className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
//             >
//               <LogOut className="h-5 w-5 text-slate-700" />
//               Cerrar Sesión
//             </button>
//           </div>

//           {/* Listado de Opciones con Iconos */}
//           <nav className="mt-6 flex flex-col gap-1">
//             <a
//               href="#cotizar"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-4 border-b border-slate-100 py-4 text-base font-semibold text-slate-700 hover:text-orange-600 transition-colors"
//             >
//               <FileText className="h-5 w-5 text-slate-700" />
//               <span>Cotizar o Solicitar</span>
//             </a>

//             <a
//               href="#administracion"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-4 border-b border-slate-100 py-4 text-base font-semibold text-slate-700 hover:text-orange-600 transition-colors"
//             >
//               <ClipboardList className="h-5 w-5 text-slate-700" />
//               <span>Administración de Solicitudes</span>
//             </a>

//             <a
//               href="#indicadores"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-4 border-b border-slate-100 py-4 text-base font-semibold text-slate-700 hover:text-orange-600 transition-colors"
//             >
//               <BarChart3 className="h-5 w-5 text-slate-700" />
//               <span>Indicadores</span>
//             </a>

//             <a
//               href="#perfil"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-4 py-4 text-base font-semibold text-slate-700 hover:text-orange-600 transition-colors"
//             >
//               <User className="h-5 w-5 text-slate-700" />
//               <span>Perfil</span>
//             </a>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }
