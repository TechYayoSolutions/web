"use client";

import { useState, FormEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

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
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Failed to get a response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>TechYayo Solutions Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: "1rem",
          minHeight: 300,
          maxHeight: 500,
          overflowY: "auto",
          marginBottom: "1rem",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#888" }}>Send a message to start chatting.</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: "0.75rem",
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            <strong>{msg.role === "user" ? "You" : "Assistant"}</strong>
            <p
              style={{
                background: msg.role === "user" ? "#0070f3" : "#f0f0f0",
                color: msg.role === "user" ? "#fff" : "#000",
                display: "inline-block",
                padding: "0.5rem 1rem",
                borderRadius: 12,
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: 8,
            border: "none",
            background: "#0070f3",
            color: "#fff",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </main>
  );
}
