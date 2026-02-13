export default function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full border border-blue-800 bg-blue-950 px-3 py-1 text-sm text-blue-300">
      {label}
    </span>
  );
}
