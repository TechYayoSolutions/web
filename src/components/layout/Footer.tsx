import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "0000000000";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        {/* Company */}
        <div>
          <h3 className="text-lg font-bold text-white">
            TechYayo Solutions
          </h3>
          <p className="mt-2 text-sm">
            Soluciones integrales en tecnología, legal, contabilidad y
            administración para tu empresa.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-white">Enlaces</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-white">
                Servicios
              </Link>
            </li>
            <li>
              <Link href="/chat" className="hover:text-white">
                Asesor Virtual IA
              </Link>
            </li>
            <li>
              <Link href="/cotizador" className="hover:text-white">
                Cotizador IA
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-white">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white">Contacto</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:contacto@techyayosolutions.com"
                className="hover:text-white"
              >
                contacto@techyayosolutions.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} TechYayo Solutions. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
