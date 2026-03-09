"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { services } from "@/lib/services-data";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "0000000000";

function getSystemPrompt(categoria: string): Message {
  const service = services.find((s) => s.id === categoria);
  return {
    role: "system",
    content: `Eres el Cotizador IA de TechYayo Solutions. Tu trabajo es generar cotizaciones estimadas para servicios de ${service?.title || "la empresa"}.

Servicios disponibles en esta categoría: ${service?.items.join(", ") || "varios"}.

Instrucciones:
1. Haz preguntas breves y específicas para entender el alcance del proyecto (máximo 3-4 preguntas)
2. Pregunta sobre: tipo de servicio específico, tamaño/complejidad, urgencia, y cualquier detalle relevante
3. Cuando tengas suficiente información, genera un RESUMEN DE COTIZACIÓN con:
   - Descripción del servicio
   - Alcance estimado
   - Rango de inversión estimado (usa rangos razonables en USD)
   - Tiempo estimado de entrega
   - Nota: "Esta es una cotización estimada. Para una cotización formal, contáctanos."
4. Responde siempre en español, sé profesional y conciso
5. Formatea la cotización final de forma clara y profesional`,
  };
}

export default function Cotizador() {
  const [categoria, setCategoria] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function startCotizacion(cat: string) {
    setCategoria(cat);
    setStarted(true);
    setLoading(true);

    const systemMsg = getSystemPrompt(cat);
    const userMsg: Message = {
      role: "user",
      content: `Quiero una cotización para servicios de ${services.find((s) => s.id === cat)?.title}.`,
    };

    setMessages([userMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [systemMsg, userMsg] }),
      });

      if (!res.ok) throw new Error();

      const reader = res.body?.getReader();
      if (!reader) throw new Error();

      const decoder = new TextDecoder();
      let content = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error al conectar. Inténtalo de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;

    const userMsg: Message = { role: "user", content: content.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [getSystemPrompt(categoria), ...updatedMessages],
        }),
      });

      if (!res.ok) throw new Error();

      const reader = res.body?.getReader();
      if (!reader) throw new Error();

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: assistantContent },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error. Inténtalo de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const lastAssistantMsg = [...messages]
    .reverse()
    .find((m) => m.role === "assistant")?.content;
  const whatsappText = lastAssistantMsg
    ? `Hola, obtuve esta cotización estimada de su sitio web:\n\n${lastAssistantMsg}`
    : "";

  if (!started) {
    return (
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          ¿Qué tipo de servicio necesitas?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => startCotizacion(s.id)}
              className="rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-brand-200 hover:shadow-md"
            >
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={chatRef}
        className="h-[450px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4"
      >
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-brand-600 text-white"
                    : "bg-white text-slate-900 shadow-sm"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
              </div>
            </div>
          ))}

        {loading && (
          <div className="mb-4 flex justify-start">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <span className="text-sm text-slate-400">Analizando...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Responde aquí..."
          disabled={loading}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary"
        >
          Enviar
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp text-sm"
        >
          Enviar a WhatsApp
        </a>
        <button
          onClick={() => {
            setStarted(false);
            setMessages([]);
            setCategoria("");
          }}
          className="btn-secondary text-sm"
        >
          Nueva cotización
        </button>
      </div>
    </div>
  );
}
