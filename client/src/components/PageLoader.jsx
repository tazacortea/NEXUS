export default function PageLoader({ label = "Loading your NEXUS…" }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-teal/20 border-t-teal" />
        <p className="mt-4 text-sm font-medium text-ink/65">{label}</p>
      </div>
    </div>
  );
}
