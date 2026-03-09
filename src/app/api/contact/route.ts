import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { nombre, email, telefono, servicio, mensaje } = await req.json();

  if (!nombre || !email || !servicio || !mensaje) {
    return NextResponse.json(
      { error: "Campos requeridos: nombre, email, servicio, mensaje" },
      { status: 400 }
    );
  }

  // Log the contact submission (connect to email service later)
  console.log("Nuevo contacto:", { nombre, email, telefono, servicio, mensaje });

  return NextResponse.json({ success: true });
}
