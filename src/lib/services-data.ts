export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "tecnologia",
    title: "Tecnología",
    icon: "💻",
    description:
      "Soluciones tecnológicas a medida para impulsar la transformación digital de tu empresa.",
    items: [
      "Desarrollo web y aplicaciones",
      "Aplicaciones móviles",
      "Consultoría IT",
      "Automatización de procesos",
      "Soporte técnico empresarial",
    ],
  },
  {
    id: "legal",
    title: "Legal",
    icon: "⚖️",
    description:
      "Asesoría legal integral para proteger y fortalecer tu negocio.",
    items: [
      "Asesoría legal empresarial",
      "Contratos y acuerdos comerciales",
      "Cumplimiento normativo",
      "Propiedad intelectual",
      "Constitución de empresas",
    ],
  },
  {
    id: "contabilidad",
    title: "Contabilidad",
    icon: "📊",
    description:
      "Gestión contable y fiscal profesional para mantener tus finanzas en orden.",
    items: [
      "Contabilidad general",
      "Declaración de impuestos",
      "Auditoría financiera",
      "Nóminas y planillas",
      "Asesoría fiscal",
    ],
  },
  {
    id: "administracion",
    title: "Administración",
    icon: "📋",
    description:
      "Consultoría estratégica para optimizar la gestión y el crecimiento de tu empresa.",
    items: [
      "Gestión empresarial",
      "Consultoría estratégica",
      "Planificación de negocios",
      "Recursos humanos",
      "Optimización de procesos",
    ],
  },
];
