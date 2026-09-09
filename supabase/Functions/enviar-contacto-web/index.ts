

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

    // Variables de Supabase
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

    // Leer el registro recibido
    const body = await req.json();

    const record = body.record;

    if (!record) {
      return jsonResponse(
        {
          success: false,
          error: "No se recibió el registro.",
        },
        400,
      );
    }

    // Verificar que el registro tenga los datos necesarios
    if (
      !record.id ||
      !record.nombre ||
      !record.telefono ||
      !record.correo ||
      !record.servicio
    ) {
      return jsonResponse(
        {
          success: false,
          error:
            "El registro no contiene todos los datos obligatorios.",
        },
        400,
      );
    }

    // Evitar procesar nuevamente un contacto enviado
    if (record.estado === "enviado") {
      return jsonResponse({
        success: true,
        ignored: true,
        message:
          "El contacto ya fue procesado.",
      });
    }

    // Configuración de Resend
    const resendApiKey =
      Deno.env.get("RESEND_API_KEY");

    const fromEmail =
      Deno.env.get("FROM_EMAIL");

    const destinationEmail =
      Deno.env.get(
        "DESTINATION_EMAIL",
      );

    if (
      !resendApiKey ||
      !fromEmail ||
      !destinationEmail
    ) {
      throw new Error(
        "Falta configuración del correo.",
      );
    }

    // Enviar correo
    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          from: `MULTICREDIT <${fromEmail}>`,
          to: [destinationEmail],
          subject: `Nuevo contacto web - ${record.nombre}`,
          html: `
            <h2>Nuevo contacto desde el sitio web</h2>

            <p>
              <strong>Nombre:</strong>
              ${record.nombre}
            </p>

            <p>
              <strong>Teléfono:</strong>
              ${record.telefono}
            </p>

            <p>
              <strong>Correo electrónico:</strong>
              ${record.correo}
            </p>

            <p>
              <strong>Servicio:</strong>
              ${record.servicio}
            </p>

            ${
              record.mensaje
                ? `
                  <p>
                    <strong>Mensaje:</strong>
                  </p>

                  <p>
                    ${record.mensaje}
                  </p>
                `
                : ""
            }

            <hr>

            <p>
              <strong>Fecha:</strong>
              ${new Date(
                record.creado_en,
              ).toLocaleString(
                "es-PA",
                {
                  timeZone:
                    "America/Panama",
                },
              )}
            </p>
          `,
        }),
      },
    );

    const emailResult =
      await emailResponse.json();

    // Resend rechazó el envío
    if (!emailResponse.ok) {
      console.error(
        "Error Resend:",
        emailResult,
      );

      await supabaseAdmin
        .from("contactos_web")
        .update({
          estado: "error",
        })
        .eq("id", record.id);

      throw new Error(
        "No se pudo enviar el correo.",
      );
    }

    // Correo enviado correctamente
    const { error: updateError } =
      await supabaseAdmin
        .from("contactos_web")
        .update({
          estado: "enviado",
        })
        .eq("id", record.id);

    if (updateError) {
      throw updateError;
    }

    return jsonResponse({
      success: true,
      message:
        "Contacto procesado y correo enviado correctamente.",
      email_id: emailResult?.id ?? null,
    });
  } catch (error) {
    console.error(
      "Error procesando contacto:",
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