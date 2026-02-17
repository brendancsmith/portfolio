export default function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {children}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
    </div>
  );
}
