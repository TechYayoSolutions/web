import type { Metadata } from "next";
import Cotizador from "@/components/ai/Cotizador";

export const metadata: Metadata = {
  title: "Cotizador IA",
  description:
    "Obtén una cotización estimada al instante con nuestro cotizador potenciado por inteligencia artificial.",
};

export default function CotizadorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Cotizador <span className="text-brand-600">IA</span>
        </h1>
        <p className="mt-2 text-slate-600">
          Selecciona el tipo de servicio y responde algunas preguntas para
          obtener una cotización estimada al instante.
        </p>
      </div>
      <Cotizador />
    </div>
  );
}
