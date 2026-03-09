"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT: Message = {
  role: "system",
  content: `Eres el Asesor Virtual de TechYayo Solutions, una empresa que ofrece servicios profesionales en:

1. **Tecnología**: Desarrollo web y aplicaciones, apps móviles, consultoría IT, automatización de procesos, soporte técnico empresarial.
2. **Legal**: Asesoría legal empresarial, contratos y acuerdos comerciales, cumplimiento normativo, propiedad intelectual, constitución de empresas.
3. **Contabilidad**: Contabilidad general, declaración de impuestos, auditoría financiera, nóminas y planillas, asesoría fiscal.
4. **Administración**: Gestión empresarial, consultoría estratégica, planificación de negocios, recursos humanos, optimización de procesos.

Tu rol es:
- Responder preguntas sobre los servicios de TechYayo Solutions
- Orientar al cliente hacia el servicio más adecuado para sus necesidades
- Ser profesional, amigable y responder siempre en español
- Cuando el cliente esté interesado, dirigirlo a solicitar una cotización en /cotizador o contactar por /contacto
- No inventar precios específicos, sino invitar a solicitar cotización personalizada`,
};

const QUICK_SUGGESTIONS = [
  "¿Qué servicios ofrecen?",
  "Necesito asesoría legal",
  "Quiero una cotización",
  "¿Cómo pueden ayudar a mi empresa?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [SYSTEM_PROMPT, ...updatedMessages],
        }),
      });

      if (!res.ok) throw new Error("Error en la respuesta");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Sin reader disponible");

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
        {
          role: "assistant",
          content: "Lo siento, hubo un error. Inténtalo de nuevo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Asesor Virtual <span className="text-brand-600">TechYayo</span>
        </h1>
        <p className="mt-2 text-slate-600">
          Pregúntame sobre nuestros servicios de tecnología, legal, contabilidad
          o administración.
        </p>
      </div>

      <div
        ref={chatRef}
        className="h-[500px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="text-sm text-slate-500">
              Selecciona una pregunta o escribe la tuya:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm text-brand-600 transition-colors hover:bg-brand-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

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
              <span className="text-sm text-slate-400">Escribiendo...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
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
    </div>
  );
}
