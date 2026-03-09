import type { Metadata } from "next";
import Recomendador from "@/components/ai/Recomendador";

export const metadata: Metadata = {
  title: "Recomendador de Servicios",
  description:
    "Describe tu situación y nuestra IA te recomendará los servicios ideales para tu empresa.",
};

export default function RecomendadorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Recomendador de{" "}
          <span className="text-brand-600">Servicios</span>
        </h1>
        <p className="mt-2 text-slate-600">
          Nuestra IA analiza tus necesidades y te recomienda los servicios más
          adecuados para tu empresa.
        </p>
      </div>
      <Recomendador />
    </div>
  );
}
