export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        {children}
      </h2>
      <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-blue-600" />
    </div>
  );
}
