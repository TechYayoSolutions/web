import Link from "next/link";

const features = [
  {
    title: "Asesor Virtual",
    description:
      "Chatea con nuestra IA para resolver dudas sobre nuestros servicios al instante.",
    href: "/chat",
    icon: "🤖",
  },
  {
    title: "Cotizador IA",
    description:
      "Obtén una cotización estimada en minutos con ayuda de inteligencia artificial.",
    href: "/cotizador",
    icon: "💰",
  },
  {
    title: "Recomendador",
    description:
      "Describe tu situación y nuestra IA te recomendará los servicios ideales.",
    href: "/recomendador",
    icon: "🎯",
  },
];

export default function AIFeatures() {
  return (
    <section className="bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Herramientas de <span className="text-brand-600">Inteligencia Artificial</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          Usa nuestras herramientas potenciadas por IA para obtener respuestas,
          cotizaciones y recomendaciones al instante.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group rounded-xl border border-slate-200 bg-white p-8 text-center transition-all hover:border-brand-200 hover:shadow-lg"
            >
              <span className="text-5xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-brand-600">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{f.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-brand-600">
                Probar ahora →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
