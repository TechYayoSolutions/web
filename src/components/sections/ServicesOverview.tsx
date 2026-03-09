import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/lib/services-data";

export default function ServicesOverview() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Nuestros Servicios
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          Ofrecemos soluciones profesionales adaptadas a las necesidades de tu
          empresa.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              icon={s.icon}
              title={s.title}
              description={s.description}
              href={`/servicios#${s.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
