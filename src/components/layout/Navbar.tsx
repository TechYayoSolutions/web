"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
];

const aiLinks = [
  { href: "/chat", label: "Asesor Virtual" },
  { href: "/cotizador", label: "Cotizador IA" },
  { href: "/recomendador", label: "Recomendador" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiDropdown, setAiDropdown] = useState(false);

  const isActive = (href: string) =>
    pathname === href
      ? "text-brand-600 font-semibold"
      : "text-slate-700 hover:text-brand-600";

  const isAiActive = aiLinks.some((l) => pathname === l.href);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand-600">
          TechYayo<span className="text-slate-900"> Solutions</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${isActive(l.href)}`}
            >
              {l.label}
            </Link>
          ))}

          {/* AI Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAiDropdown(!aiDropdown)}
              onBlur={() => setTimeout(() => setAiDropdown(false), 150)}
              className={`text-sm transition-colors ${isAiActive ? "font-semibold text-brand-600" : "text-slate-700 hover:text-brand-600"}`}
            >
              IA ▾
            </button>
            {aiDropdown && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                {aiLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-brand-50 ${isActive(l.href)}`}
                    onClick={() => setAiDropdown(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contacto"
            className={`text-sm transition-colors ${isActive("/contacto")}`}
          >
            Contacto
          </Link>
          <Link href="/cotizador" className="btn-primary text-sm">
            Solicitar Cotización
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          <svg
            className="h-6 w-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm ${isActive(l.href)}`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <p className="mt-2 text-xs font-semibold uppercase text-slate-400">
              Inteligencia Artificial
            </p>
            {aiLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm ${isActive(l.href)}`}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className={`text-sm ${isActive("/contacto")}`}
              onClick={() => setMobileOpen(false)}
            >
              Contacto
            </Link>
            <Link
              href="/cotizador"
              className="btn-primary mt-2 text-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
