import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="bg-brand-600 px-4 py-16 text-center text-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold">
          ¿Listo para impulsar tu empresa?
        </h2>
        <p className="mt-4 text-brand-100">
          Cada proyecto es único. Cuéntanos qué necesitas y te enviaremos una
          cotización personalizada sin compromiso.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/cotizador"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-brand-50"
          >
            Solicitar Cotización
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Contactarnos
          </Link>
        </div>
      </div>
    </section>
  );
}
