

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    // Solo permitimos solicitudes POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Método no permitido.",
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Obtener variables de entorno
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get(
      "SUPABASE_SERVICE_ROLE_KEY",
    );

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        "Falta configuración de Supabase.",
      );
    }

    // Cliente con privilegios administrativos
    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
    );

    // Obtener token del usuario
    const authHeader =
      req.headers.get("Authorization");

    if (!authHeader) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No autorizado.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const token = authHeader.replace(
      "Bearer ",
      "",
    );

    // Verificar usuario autenticado
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Sesión no válida.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Verificar que sea administrador activo
    const { data: administrador, error: adminError } =
      await supabaseAdmin
        .from("administradores_noticias")
        .select("id, activo")
        .eq("id", user.id)
        .eq("activo", true)
        .maybeSingle();

    if (adminError) {
      throw adminError;
    }

    if (!administrador) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No tienes permisos para eliminar noticias.",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Obtener datos enviados
    const body = await req.json();
    const noticiaId = body.noticia_id;

    if (!noticiaId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No se recibió el ID de la noticia.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Verificar que la noticia exista
    const { data: noticia, error: noticiaError } =
      await supabaseAdmin
        .from("noticias_financieras")
        .select("id")
        .eq("id", noticiaId)
        .maybeSingle();

    if (noticiaError) {
      throw noticiaError;
    }

    if (!noticia) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "La noticia no existe.",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Buscar imágenes asociadas a la noticia
    const {
      data: imagenes,
      error: imagenesError,
    } = await supabaseAdmin
      .from("noticias_imagenes")
      .select("id, imagen_url")
      .eq("noticia_id", noticiaId);

    if (imagenesError) {
      throw imagenesError;
    }

    // Obtener las rutas de Storage
    const marcador =
      "/noticias-financieras/";

    const rutasStorage = (imagenes ?? [])
      .map((imagen) => {
        const posicion =
          imagen.imagen_url.indexOf(marcador);

        if (posicion === -1) {
          return null;
        }

        return imagen.imagen_url.substring(
          posicion + marcador.length,
        );
      })
      .filter(
        (ruta): ruta is string => ruta !== null,
      );

    console.log(
      "Imágenes encontradas:",
      imagenes?.length ?? 0,
    );

    console.log(
      "Rutas Storage:",
      rutasStorage,
    );

    // Eliminar archivos físicos del Storage
    if (rutasStorage.length > 0) {
      const { data: storageData, error: storageError } =
        await supabaseAdmin.storage
          .from("noticias-financieras")
          .remove(rutasStorage);

      console.log(
        "Respuesta Storage:",
        storageData,
      );

      if (storageError) {
        console.error(
          "Error eliminando imágenes:",
          storageError,
        );

        throw new Error(
          `No se pudieron eliminar las imágenes: ${storageError.message}`,
        );
      }
    }

    // Eliminar la noticia
    // noticias_imagenes se elimina automáticamente
    // mediante ON DELETE CASCADE.
    const { error: deleteError } =
      await supabaseAdmin
        .from("noticias_financieras")
        .delete()
        .eq("id", noticiaId);

    if (deleteError) {
      throw deleteError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "La noticia y sus imágenes fueron eliminadas correctamente.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error(
      "Error eliminando noticia:",
      error,
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Error inesperado.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});