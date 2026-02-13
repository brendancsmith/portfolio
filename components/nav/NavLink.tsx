"use client";

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

export default function NavLink({ href, label, active, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        active ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {label}
    </a>
  );
}
