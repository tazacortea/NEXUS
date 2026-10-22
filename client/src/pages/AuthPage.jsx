import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const initialForm = { name: "", email: "", password: "" };

export default function AuthPage() {
  const [mode, setMode] = useState("register");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const isRegister = mode === "register";

  function switchMode(nextMode) {
    setMode(nextMode); setError(""); setForm(initialForm);
  }
  async function handleSubmit(event) {
    event.preventDefault(); setError(""); setSubmitting(true);
    try {
      if (isRegister) await register(form); else await login({ email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (caught) { setError(caught.message); } finally { setSubmitting(false); }
  }

  return (
    <div className="grid min-h-screen bg-mist lg:grid-cols-2">
      <section className="hidden bg-navy p-10 text-white lg:flex lg:flex-col lg:justify-between"><Link to="/" className="flex items-center gap-2 font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-navy"><Sparkles size={18} /></span>NEXUS</Link><div className="max-w-md"><p className="text-sm font-bold uppercase tracking-[.18em] text-mint">A private wellbeing space</p><h1 className="mt-5 text-6xl font-black leading-none tracking-[-.06em]">Small signals.<br />Clearer days.</h1><p className="mt-7 text-lg leading-8 text-white/65">Your answers stay in your account. NEXUS turns them into practical next steps, never a medical diagnosis.</p></div><p className="text-sm text-white/45">Built for everyday reflection.</p></section>
      <section className="flex items-center justify-center px-5 py-12 sm:p-10"><div className="w-full max-w-md"><Link to="/" className="focus-ring mb-10 inline-flex items-center gap-2 text-sm font-bold text-ink/60 hover:text-navy lg:hidden"><ArrowLeft size={16} /> Back to NEXUS</Link><div className="mb-8"><p className="text-sm font-bold uppercase tracking-[.16em] text-teal">Your space</p><h2 className="mt-2 text-4xl font-black tracking-[-.045em] text-navy">{isRegister ? "Start with a fresh perspective." : "Welcome back."}</h2><p className="mt-3 leading-6 text-ink/60">{isRegister ? "Create an account to save your insights and daily check-ins." : "Sign in to continue building your routine."}</p></div>
        <div className="mb-7 grid grid-cols-2 rounded-2xl bg-navy/6 p-1"><button onClick={() => switchMode("register")} className={`focus-ring rounded-xl py-2.5 text-sm font-bold ${isRegister ? "bg-white text-navy shadow-sm" : "text-ink/55"}`}>Create account</button><button onClick={() => switchMode("login")} className={`focus-ring rounded-xl py-2.5 text-sm font-bold ${!isRegister ? "bg-white text-navy shadow-sm" : "text-ink/55"}`}>Sign in</button></div>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>{isRegister && <Field label="Your name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="e.g. Samira El Idrissi" autoComplete="name" />}<Field label="Email address" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} placeholder="you@example.com" autoComplete="email" /><Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} placeholder="At least 6 characters" autoComplete={isRegister ? "new-password" : "current-password"} />{error && <p role="alert" className="rounded-xl bg-coral/15 px-4 py-3 text-sm font-semibold text-navy">{error}</p>}<button disabled={submitting} className="focus-ring flex w-full items-center justify-center gap-2 rounded-2xl bg-teal px-5 py-4 font-bold text-white shadow-lg shadow-teal/15 transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Please wait…" : isRegister ? "Create my NEXUS space" : "Continue to dashboard"}<ArrowRight size={18} /></button></form><p className="mt-6 text-center text-xs leading-5 text-ink/45">By continuing, you acknowledge that NEXUS provides educational wellness insights only.</p></div></section>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, placeholder, autoComplete }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-navy">{label}</span><input required type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} autoComplete={autoComplete} className="focus-ring w-full rounded-xl border border-navy/12 bg-white px-4 py-3.5 text-ink placeholder:text-ink/35" /></label>;
}
