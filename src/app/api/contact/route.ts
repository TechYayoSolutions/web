import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_SERVICES = ["tecnologia", "legal", "contabilidad", "administracion"];
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;

function sanitize(input: string, maxLength: number): string {
  return input.trim().slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, servicio, mensaje } = body;

    if (!nombre || !email || !servicio || !mensaje) {
      return NextResponse.json(
        { error: "Campos requeridos: nombre, email, servicio, mensaje" },
        { status: 400 }
      );
    }

    if (typeof nombre !== "string" || typeof email !== "string" || typeof servicio !== "string" || typeof mensaje !== "string") {
      return NextResponse.json(
        { error: "Todos los campos deben ser texto" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Formato de correo electrónico inválido" },
        { status: 400 }
      );
    }

    if (!VALID_SERVICES.includes(servicio)) {
      return NextResponse.json(
        { error: "Servicio seleccionado no es válido" },
        { status: 400 }
      );
    }

    const sanitized = {
      nombre: sanitize(nombre, MAX_FIELD_LENGTH),
      email: sanitize(email, MAX_FIELD_LENGTH),
      telefono: telefono ? sanitize(String(telefono), MAX_FIELD_LENGTH) : "",
      servicio,
      mensaje: sanitize(mensaje, MAX_MESSAGE_LENGTH),
    };

    // Log the contact submission (connect to email service later)
    console.log("Nuevo contacto:", sanitized);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
