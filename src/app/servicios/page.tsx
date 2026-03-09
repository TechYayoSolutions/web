import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios profesionales en tecnología, legal, contabilidad y administración empresarial.",
};

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-center text-4xl font-bold text-slate-900">
        Nuestros Servicios
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
        Soluciones profesionales adaptadas a cada necesidad de tu empresa.
      </p>

      <div className="mt-16 space-y-20">
        {services.map((service) => (
          <section key={service.id} id={service.id} className="scroll-mt-24">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{service.icon}</span>
              <h2 className="text-2xl font-bold text-slate-900">
                {service.title}
              </h2>
            </div>
            <p className="mt-4 max-w-3xl text-slate-600">
              {service.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <span className="text-brand-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/cotizador" className="btn-primary mt-6 inline-block">
              Solicitar Cotización
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
