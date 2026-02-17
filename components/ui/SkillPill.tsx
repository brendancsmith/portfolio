export default function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full border border-blue-800/50 bg-blue-950/50 px-3 py-1 text-sm text-blue-300 transition-colors duration-200 hover:border-blue-600/50 hover:bg-blue-900/50 hover:text-blue-200">
      {label}
    </span>
  );
}
