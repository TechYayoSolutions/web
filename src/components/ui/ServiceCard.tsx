import Link from "next/link";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-slate-200 p-6 transition-all hover:border-brand-200 hover:shadow-lg"
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-brand-600">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <span className="mt-4 inline-block text-sm font-medium text-brand-600">
        Ver más →
      </span>
    </Link>
  );
}
