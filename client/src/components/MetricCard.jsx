export default function MetricCard({ icon, label, value, suffix, detail, tint = "bg-white" }) {
  return (
    <article className={`${tint} rounded-3xl border border-navy/5 p-5 card-shadow`}>
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-navy/7 text-xl">{icon}</span>
        <span className="text-xs font-bold text-ink/45">7-day avg.</span>
      </div>
      <p className="mt-5 text-sm font-semibold text-ink/60">{label}</p>
      <p className="mt-1 text-3xl font-black tracking-tight text-navy">{value}<span className="ml-1 text-base font-bold text-ink/50">{suffix}</span></p>
      <p className="mt-2 text-xs text-ink/55">{detail}</p>
    </article>
  );
}
