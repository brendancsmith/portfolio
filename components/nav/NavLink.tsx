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
      className={`relative text-sm font-medium transition-colors ${
        active
          ? "text-blue-600 dark:text-blue-400"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
      }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-600 dark:bg-blue-400" />
      )}
    </a>
  );
}
