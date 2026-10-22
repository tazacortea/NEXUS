import { ArrowRight, CheckCircle2, CircleAlert, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { request } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import PageLoader from "../components/PageLoader.jsx";
import ScoreRing from "../components/ScoreRing.jsx";

const labels = { hydration: "Hydration", recovery: "Recovery", activity: "Activity", nutrition: "Nutrition", mindset: "Mindset" };
function statusFor(score) { return score >= 75 ? "Strong foundation" : score >= 50 ? "Growing steadily" : "Good place to start"; }

export default function ResultsPage() {
  const { token } = useAuth();
  // `undefined` means the request is still loading; `null` is a valid API result
  // when the user has not completed an assessment yet.
  const [assessment, setAssessment] = useState(undefined);
  const [error, setError] = useState("");
  useEffect(() => { request("/assessments/latest", { token }).then(({ assessment: data }) => setAssessment(data)).catch((caught) => setError(caught.message)); }, [token]);
  if (error) return <ErrorPanel message={error} />;
  if (assessment === undefined) return <PageLoader label="Opening your NEXUS insight…" />;
  if (!assessment) return <EmptyResults />;
  const scoreEntries = Object.entries(assessment.scores);
  return <div className="mx-auto max-w-5xl space-y-7"><section className="overflow-hidden rounded-[2rem] bg-navy p-7 text-white sm:p-10"><div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center"><ScoreRing score={assessment.overallScore} /><div><p className="text-sm font-bold uppercase tracking-[.16em] text-mint">Your NEXUS snapshot</p><h1 className="mt-2 text-4xl font-black tracking-[-.05em] sm:text-5xl">You have a useful place to begin.</h1><p className="mt-4 max-w-xl text-lg leading-7 text-white/65">{assessment.insights?.[0]}</p><p className="mt-5 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-mint">Completed {new Date(assessment.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p></div></div></section>
    <section className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><article className="rounded-[2rem] bg-white p-6 card-shadow sm:p-8"><div><p className="text-sm font-bold uppercase tracking-[.14em] text-teal">Your five dimensions</p><h2 className="mt-1 text-3xl font-black tracking-[-.04em] text-navy">Here’s what your answers suggest.</h2></div><div className="mt-8 space-y-5">{scoreEntries.map(([key, score]) => <div key={key}><div className="mb-2 flex justify-between gap-3 text-sm"><span className="font-bold text-navy">{labels[key]}</span><span className="font-bold text-ink/60">{score} · {statusFor(score)}</span></div><div className="h-3 overflow-hidden rounded-full bg-navy/8"><div className="h-full rounded-full bg-teal transition-all" style={{ width: `${score}%` }} /></div></div>)}</div></article>
        <article className="rounded-[2rem] bg-sun/45 p-6 sm:p-8"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-navy"><Compass size={21} /></span><h2 className="mt-6 text-2xl font-black tracking-[-.035em] text-navy">Your first focus</h2><p className="mt-3 leading-7 text-ink/70">{assessment.insights?.[1]}</p><p className="mt-7 text-sm font-bold text-navy">The aim is not perfection. Pick one idea below and repeat it enough to notice a difference.</p></article></section>
    <section className="rounded-[2rem] bg-white p-6 card-shadow sm:p-8"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint/60 text-teal"><Sparkles size={20} /></span><div><p className="text-sm font-bold uppercase tracking-[.14em] text-teal">Practical next steps</p><h2 className="text-2xl font-black tracking-[-.03em] text-navy">Keep it gentle and specific.</h2></div></div><div className="mt-7 grid gap-3 md:grid-cols-3">{assessment.recommendations.map((recommendation, index) => <article key={recommendation} className="rounded-2xl border border-navy/8 bg-mist p-5"><p className="text-xs font-black tracking-[.14em] text-teal">0{index + 1}</p><p className="mt-3 text-sm font-bold leading-6 text-navy">{recommendation}</p></article>)}</div><div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-navy/5 p-5 sm:flex-row sm:items-center"><p className="flex max-w-2xl gap-2 text-sm leading-6 text-ink/65"><CircleAlert className="mt-0.5 shrink-0 text-teal" size={18} />NEXUS is an educational tool for self-reflection. Your score is not a medical assessment or diagnosis.</p><Link to="/progress" className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-xl bg-teal px-4 py-3 text-sm font-bold text-white hover:bg-navy">Log today <ArrowRight size={16} /></Link></div></section>
  </div>;
}

function EmptyResults() { return <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center card-shadow"><CheckCircle2 className="mx-auto text-teal" size={34} /><h1 className="mt-5 text-3xl font-black text-navy">Your first insight is waiting.</h1><p className="mt-3 text-ink/60">Complete your five-question check-in to create it.</p><Link to="/assessment" className="focus-ring mt-7 inline-flex rounded-xl bg-teal px-5 py-3 font-bold text-white hover:bg-navy">Start check-in</Link></div>; }
function ErrorPanel({ message }) { return <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center card-shadow"><p className="font-bold text-navy">We could not open your results.</p><p className="mt-2 text-sm text-ink/60">{message}</p></div>; }
