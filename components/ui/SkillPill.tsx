export default function SkillPill({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm text-blue-700">
      {label}
    </span>
  );
}
