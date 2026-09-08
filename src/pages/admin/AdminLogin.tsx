

import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // 1. Iniciar sesión en Supabase Auth
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError("Correo electrónico o contraseña incorrectos.");
        return;
      }

      if (!data.user) {
        setError("No se pudo iniciar la sesión.");
        return;
      }

      // 2. Verificar que el usuario sea administrador de noticias
      const { data: admin, error: adminError } = await supabase
        .from("administradores_noticias")
        .select("id, nombre, activo")
        .eq("id", data.user.id)
        .eq("activo", true)
        .maybeSingle();

      if (adminError) {
        console.error("Error verificando administrador:", adminError);

        await supabase.auth.signOut();

        setError("No se pudo verificar el acceso de administrador.");
        return;
      }

      // 3. Si no existe como administrador activo, negar acceso
      if (!admin) {
        await supabase.auth.signOut();

        setError("Este usuario no tiene permisos de administrador.");
        return;
      }

      // 4. Acceso permitido
      navigate("/admin/noticias");
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Ocurrió un error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
            <LockKeyhole className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Administración
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Acceso al panel de noticias financieras
          </p>
        </div>

        {/* Tarjeta de login */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Correo */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Correo electrónico
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@empresa.com"
                  autoComplete="email"
                  required
                  className="w-full border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Contraseña
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />

                <input
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  required
                  className="w-full border border-slate-300 bg-white py-3 pl-10 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />

                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={
                    mostrarPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {mostrarPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verificando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>

        {/* Pie */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Acceso exclusivo para administradores
        </p>
      </div>
    </div>
  );
}