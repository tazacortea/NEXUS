import { ArrowRight, BarChart3, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const features = [
  { icon: Sparkles, title: "See your patterns", text: "Turn five lifestyle answers into an easy-to-understand wellbeing snapshot." },
  { icon: HeartHandshake, title: "Build one habit at a time", text: "Receive realistic, non-judgmental next steps based on your own answers." },
  { icon: BarChart3, title: "Notice progress", text: "Log simple daily check-ins and watch your routines become more visible." }
];

export default function LandingPage() {
  const { token } = useAuth();
  const destination = token ? "/dashboard" : "/auth";
  return (
    <div className="min-h-screen overflow-hidden bg-mist text-ink">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-black tracking-tight text-navy"><span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-mint"><Sparkles size={18} /></span>NEXUS</Link>
        <Link to={destination} className="focus-ring rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal">{token ? "Open dashboard" : "Sign in"}</Link>
      </header>

      <main>
        <section className="grid-noise relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pb-30 lg:pt-24">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-teal"><span className="h-2 w-2 rounded-full bg-coral" />Your wellbeing, made practical</p>
            <h1 className="text-5xl font-black leading-[.98] tracking-[-.055em] text-navy sm:text-6xl lg:text-7xl">Feel your patterns.<br /><span className="text-teal">Shape your days.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-ink/70">NEXUS gives you a clear, gentle starting point for building healthier everyday routines — no pressure, no diagnosis, just useful insight.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={destination} className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-6 py-4 font-bold text-white shadow-lg shadow-teal/20 transition hover:-translate-y-0.5 hover:bg-navy">Start your 3-minute check-in <ArrowRight size={18} /></Link>
              <a href="#how-it-works" className="focus-ring inline-flex items-center justify-center rounded-2xl border border-navy/12 bg-white px-6 py-4 font-bold text-navy transition hover:border-teal">How it works</a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-ink/55"><ShieldCheck size={15} className="text-teal" />Designed for reflection, not medical diagnosis.</p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="hero-orb absolute inset-9 rounded-[3rem] opacity-95 blur-[1px]" />
            <div className="relative mx-auto w-[82%] rounded-[2rem] border border-white/75 bg-white/94 p-5 card-shadow backdrop-blur sm:p-7">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-ink/45">Today’s NEXUS</p><p className="mt-1 text-xl font-black text-navy">Your balanced start</p></div><span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-xl">✦</span></div>
              <div className="mt-6 rounded-2xl bg-mist p-4"><div className="flex items-end justify-between"><div><p className="text-sm font-bold text-ink/60">Wellbeing snapshot</p><p className="mt-1 text-4xl font-black tracking-tight text-navy">72<span className="ml-1 text-base text-ink/45">/100</span></p></div><div className="h-13 w-13 rounded-full border-[7px] border-teal border-t-mint" /></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-navy/8"><div className="h-full w-[72%] rounded-full bg-teal" /></div></div>
              <div className="mt-4 flex gap-2"><span className="rounded-full bg-mint/65 px-3 py-1.5 text-xs font-bold text-teal">Hydration</span><span className="rounded-full bg-sun/50 px-3 py-1.5 text-xs font-bold text-ink">Mindset</span></div>
              <div className="mt-5 rounded-2xl border border-teal/15 bg-teal/5 p-4"><p className="text-xs font-bold uppercase tracking-[.12em] text-teal">Today’s small move</p><p className="mt-1.5 text-sm font-semibold leading-5 text-navy">Add a 10-minute walk after lunch.</p></div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-navy px-5 py-20 text-white sm:px-8">
          <div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[.16em] text-mint">A simpler wellbeing system</p><div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-2xl text-4xl font-black tracking-[-.04em] sm:text-5xl">One thoughtful check-in can be a powerful beginning.</h2><p className="max-w-sm leading-7 text-white/65">NEXUS keeps the process small enough to repeat, then makes your answers useful.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">{features.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-3xl border border-white/10 bg-white/6 p-6"><span className="text-xs font-bold text-mint">0{index + 1}</span><Icon className="mt-8 text-sun" size={28} /><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-6 text-white/65">{text}</p></article>)}</div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8"><CheckCircle2 className="mx-auto text-teal" size={30} /><h2 className="mt-5 text-4xl font-black tracking-[-.04em] text-navy">Make your next step feel possible.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-ink/65">Create a private NEXUS space, complete your first check-in, and choose one routine to strengthen this week.</p><Link to={destination} className="focus-ring mt-8 inline-flex items-center gap-2 rounded-2xl bg-navy px-6 py-4 font-bold text-white hover:bg-teal">Begin with NEXUS <ArrowRight size={18} /></Link></section>
      </main>
    </div>
  );
}
