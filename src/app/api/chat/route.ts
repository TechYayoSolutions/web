import { NextRequest } from "next/server";
import routellm, { ROUTELLM_MODEL } from "@/lib/routellm";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const stream = await routellm.chat.completions.create({
    model: ROUTELLM_MODEL,
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
