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
        active ? "text-blue-400" : "text-slate-400 hover:text-slate-100"
      }`}
    >
      {label}
    </a>
  );
}
