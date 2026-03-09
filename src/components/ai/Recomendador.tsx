"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT: Message = {
  role: "system",
  content: `Eres el Recomendador de Servicios de TechYayo Solutions. Tu trabajo es analizar la situación o necesidad del usuario y recomendar los servicios más relevantes.

Servicios disponibles:
1. **Tecnología**: Desarrollo web y aplicaciones, apps móviles, consultoría IT, automatización de procesos, soporte técnico empresarial.
2. **Legal**: Asesoría legal empresarial, contratos y acuerdos comerciales, cumplimiento normativo, propiedad intelectual, constitución de empresas.
3. **Contabilidad**: Contabilidad general, declaración de impuestos, auditoría financiera, nóminas y planillas, asesoría fiscal.
4. **Administración**: Gestión empresarial, consultoría estratégica, planificación de negocios, recursos humanos, optimización de procesos.

Instrucciones:
1. Analiza la situación que describe el usuario
2. Recomienda los servicios más relevantes (puede ser de una o varias categorías)
3. Para cada recomendación explica BREVEMENTE por qué es relevante
4. Al final, sugiere al usuario solicitar una cotización o contactar al equipo
5. Responde siempre en español, sé profesional y conciso
6. Usa formato con viñetas o numeración para las recomendaciones`,
};

export default function Recomendador() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  async function analyze(content: string) {
    if (!content.trim() || loading) return;

    const userMsg: Message = { role: "user", content: content.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setLoading(true);
    setSubmitted(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [SYSTEM_PROMPT, ...allMessages],
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
        { role: "assistant", content: "Error al analizar. Inténtalo de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    analyze(input);
  }

  if (!submitted) {
    return (
      <div>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">
          Describe tu situación o necesidad
        </h2>
        <p className="mb-6 text-sm text-slate-600">
          Cuéntanos sobre tu empresa, tus desafíos o lo que necesitas resolver.
          Nuestra IA analizará tu caso y te recomendará los servicios más
          adecuados.
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ejemplo: Tengo una empresa pequeña de comercio y necesito organizar mi contabilidad, crear una página web y registrar mi marca..."
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="btn-primary mt-4 w-full"
          >
            Analizar mis necesidades
          </button>
        </form>

        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-slate-500">
            Ejemplos de consultas:
          </p>
          <div className="space-y-2">
            {[
              "Quiero crear una startup tecnológica desde cero",
              "Mi empresa necesita cumplir con regulaciones fiscales",
              "Necesito digitalizar todos los procesos de mi negocio",
            ].map((example) => (
              <button
                key={example}
                onClick={() => {
                  setInput(example);
                }}
                className="block w-full rounded-lg border border-slate-200 px-4 py-3 text-left text-sm text-slate-700 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={chatRef}
        className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4"
      >
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, i) => (
            <div
              key={i}
              className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
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
              <span className="text-sm text-slate-400">
                Analizando tus necesidades...
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Haz otra pregunta o describe más detalles..."
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
        <Link href="/cotizador" className="btn-primary text-sm">
          Solicitar Cotización
        </Link>
        <button
          onClick={() => {
            setSubmitted(false);
            setMessages([]);
            setInput("");
          }}
          className="btn-secondary text-sm"
        >
          Nuevo análisis
        </button>
      </div>
    </div>
  );
}
