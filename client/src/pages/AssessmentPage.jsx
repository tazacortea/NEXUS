import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import PageLoader from "../components/PageLoader.jsx";

export default function AssessmentPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => { request("/assessments/questions").then(({ questions: data }) => setQuestions(data)).catch((caught) => setError(caught.message)); }, []);
  if (error && !questions) return <div className="rounded-3xl bg-white p-8 text-center card-shadow"><p className="font-bold text-navy">We could not load the check-in.</p><p className="mt-2 text-sm text-ink/60">{error}</p></div>;
  if (!questions) return <PageLoader label="Preparing your check-in…" />;
  const question = questions[index]; const value = answers[question.id]; const isLast = index === questions.length - 1;
  async function submit() { setSubmitting(true); setError(""); try { await request("/assessments", { method: "POST", token, body: { answers: questions.map((item) => ({ questionId: item.id, value: answers[item.id] })) } }); navigate("/results"); } catch (caught) { setError(caught.message); } finally { setSubmitting(false); } }
  return <div className="mx-auto max-w-3xl"><div className="mb-7 flex items-center justify-between"><div><p className="text-sm font-bold uppercase tracking-[.15em] text-teal">Personal check-in</p><h1 className="mt-1 text-3xl font-black tracking-[-.04em] text-navy">A moment for you.</h1></div><span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink/60">{index + 1} of {questions.length}</span></div><div className="h-2 overflow-hidden rounded-full bg-navy/8"><div className="h-full rounded-full bg-teal transition-all duration-500" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
    <section className="mt-5 rounded-[2rem] bg-white p-6 card-shadow sm:p-10"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint/60 text-teal"><ClipboardCheck size={20} /></span><p className="text-sm font-bold uppercase tracking-[.13em] text-teal">{question.category}</p></div><h2 className="mt-8 text-3xl font-black leading-tight tracking-[-.04em] text-navy sm:text-4xl">{question.prompt}</h2><p className="mt-3 leading-6 text-ink/60">{question.helper}</p><div className="mt-8 grid gap-3">{question.choices.map((choice) => { const selected = value === choice.value; return <button key={choice.value} onClick={() => setAnswers({ ...answers, [question.id]: choice.value })} className={`focus-ring flex items-center justify-between rounded-2xl border p-4 text-left font-bold transition ${selected ? "border-teal bg-mint/45 text-navy" : "border-navy/10 text-ink hover:border-teal/45 hover:bg-mist"}`}><span>{choice.label}</span><span className={`grid h-6 w-6 place-items-center rounded-full border ${selected ? "border-teal bg-teal text-white" : "border-navy/18"}`}>{selected && <Check size={14} />}</span></button>; })}</div>{error && <p role="alert" className="mt-5 rounded-xl bg-coral/15 px-4 py-3 text-sm font-semibold text-navy">{error}</p>}
      <div className="mt-9 flex justify-between gap-3"><button onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0} className="focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-ink/65 hover:bg-navy/5 disabled:invisible"><ArrowLeft size={17} />Back</button>{isLast ? <button onClick={submit} disabled={value === undefined || submitting} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 font-bold text-white hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Creating your insight…" : <>See my NEXUS <Sparkles size={17} /></>}</button> : <button onClick={() => setIndex(index + 1)} disabled={value === undefined} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 font-bold text-white hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50">Next <ArrowRight size={17} /></button>}</div>
    </section><p className="mx-auto mt-5 max-w-xl text-center text-xs leading-5 text-ink/45">Your responses create educational lifestyle insights. They are not a diagnosis or medical advice.</p></div>;
}
