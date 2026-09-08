

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";

export default function AdminGuard() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verificarAdministrador = async () => {
      try {
        // Obtener la sesión actual
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // No hay sesión
        if (!session?.user) {
          setAuthorized(false);
          return;
        }

        // Verificar que sea administrador activo
        const { data: admin, error } = await supabase
          .from("administradores_noticias")
          .select("id, activo")
          .eq("id", session.user.id)
          .eq("activo", true)
          .maybeSingle();

        if (error) {
          console.error("Error verificando administrador:", error);
          setAuthorized(false);
          return;
        }

        setAuthorized(!!admin);
      } catch (error) {
        console.error("Error inesperado:", error);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verificarAdministrador();
  }, []);

  // Mientras verificamos la sesión
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">
          Verificando acceso...
        </p>
      </div>
    );
  }

  // Si no está autorizado, enviarlo al login
  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  // Si está autorizado, mostrar la página protegida
  return <Outlet />;
}