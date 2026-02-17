export default function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full border border-blue-200 bg-blue-50 dark:border-blue-800/50 dark:bg-blue-950/50 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 transition-colors duration-200 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-800 dark:hover:border-blue-600/50 dark:hover:bg-blue-900/50 dark:hover:text-blue-200">
      {label}
    </span>
  );
}
