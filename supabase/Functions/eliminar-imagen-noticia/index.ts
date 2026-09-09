

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

const jsonResponse = (
  body: unknown,
  status = 200,
) => {
  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: corsHeaders,
    },
  );
};

Deno.serve(async (req) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Solo permitimos POST
    if (req.method !== "POST") {
      return jsonResponse(
        {
          success: false,
          error: "Método no permitido.",
        },
        405,
      );
    }

    // Variables de entorno
    const supabaseUrl =
      Deno.env.get("SUPABASE_URL");

    const serviceRoleKey =
      Deno.env.get(
        "SUPABASE_SERVICE_ROLE_KEY",
      );

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        "Falta configuración de Supabase.",
      );
    }

    // Cliente administrativo
    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
    );

    // Obtener Authorization
    const authHeader =
      req.headers.get("Authorization");

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return jsonResponse(
        {
          success: false,
          error: "No autorizado.",
        },
        401,
      );
    }

    const token =
      authHeader.replace(
        "Bearer ",
        "",
      );

    // Verificar usuario
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(
      token,
    );

    if (userError || !user) {
      return jsonResponse(
        {
          success: false,
          error: "Sesión no válida.",
        },
        401,
      );
    }

    // Verificar administrador activo
    const {
      data: administrador,
      error: adminError,
    } = await supabaseAdmin
      .from("administradores_noticias")
      .select("id, activo")
      .eq("id", user.id)
      .eq("activo", true)
      .maybeSingle();

    if (adminError) {
      throw adminError;
    }

    if (!administrador) {
      return jsonResponse(
        {
          success: false,
          error:
            "No tienes permisos para eliminar imágenes.",
        },
        403,
      );
    }

    // Leer body
    const body = await req.json();

    const noticiaId = body.noticia_id;
    const imagenId = body.imagen_id;

    if (!noticiaId || !imagenId) {
      return jsonResponse(
        {
          success: false,
          error:
            "Se requiere el ID de la noticia y el ID de la imagen.",
        },
        400,
      );
    }

    // Buscar la imagen y verificar
    // que pertenece a la noticia indicada
    const {
      data: imagen,
      error: imagenError,
    } = await supabaseAdmin
      .from("noticias_imagenes")
      .select("id, noticia_id, imagen_url")
      .eq("id", imagenId)
      .eq("noticia_id", noticiaId)
      .maybeSingle();

    if (imagenError) {
      throw imagenError;
    }

    if (!imagen) {
      return jsonResponse(
        {
          success: false,
          error:
            "La imagen no existe o no pertenece a esta noticia.",
        },
        404,
      );
    }

    // Obtener ruta del archivo en Storage
    const marcador =
      "/noticias-financieras/";

    const posicion =
      imagen.imagen_url.indexOf(marcador);

    if (posicion === -1) {
      throw new Error(
        "La imagen tiene una URL de Storage inválida.",
      );
    }

    const rutaStorage =
      imagen.imagen_url.substring(
        posicion + marcador.length,
      );

    if (!rutaStorage) {
      throw new Error(
        "La imagen no tiene una ruta válida en Storage.",
      );
    }

    console.log(
      "Eliminando archivo:",
      rutaStorage,
    );

    // Eliminar archivo físico del bucket
    const {
      data: storageData,
      error: storageError,
    } = await supabaseAdmin.storage
      .from("noticias-financieras")
      .remove([rutaStorage]);

    console.log(
      "Respuesta Storage:",
      storageData,
    );

    if (storageError) {
      console.error(
        "Error eliminando archivo:",
        storageError,
      );

      throw new Error(
        `No se pudo eliminar la imagen del Storage: ${storageError.message}`,
      );
    }

    // Eliminar registro de la tabla
    const {
      error: deleteError,
    } = await supabaseAdmin
      .from("noticias_imagenes")
      .delete()
      .eq("id", imagenId)
      .eq("noticia_id", noticiaId);

    if (deleteError) {
      throw deleteError;
    }

    return jsonResponse({
      success: true,
      message:
        "La imagen fue eliminada correctamente.",
    });
  } catch (error) {
    console.error(
      "Error eliminando imagen:",
      error,
    );

    return jsonResponse(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Error inesperado.",
      },
      500,
    );
  }
});