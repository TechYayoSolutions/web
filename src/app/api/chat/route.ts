import { NextRequest, NextResponse } from "next/server";
import routellm, { ROUTELLM_MODEL } from "@/lib/routellm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Se requiere un arreglo de mensajes no vacío" },
        { status: 400 }
      );
    }

    const stream = await routellm.chat.completions.create({
      model: ROUTELLM_MODEL,
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch {
          controller.error(new Error("Error en el stream de respuesta"));
        }
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la solicitud de chat" },
      { status: 500 }
    );
  }
}
