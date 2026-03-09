import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const viewport: Viewport = {
  themeColor: "#4F46E5",
};

export const metadata: Metadata = {
  title: {
    default: "TechYayo Solutions — Tecnología, Legal, Contabilidad y Administración",
    template: "%s | TechYayo Solutions",
  },
  description:
    "Soluciones integrales en tecnología, legal, contabilidad y administración empresarial. Impulsa tu negocio con servicios profesionales y herramientas de IA.",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "TechYayo Solutions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
