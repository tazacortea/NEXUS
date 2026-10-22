import { LayoutDashboard, ClipboardCheck, ChartNoAxesCombined, LogOut, Sparkles } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assessment", label: "Check-in", icon: ClipboardCheck },
  { to: "/progress", label: "Progress", icon: ChartNoAxesCombined }
];

export default function AppShell() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-20 border-b border-navy/8 bg-white/90 backdrop-blur">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <NavLink to="/dashboard" className="flex items-center gap-2 font-black tracking-tight text-navy">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-mint"><Sparkles size={18} /></span>
            NEXUS
          </NavLink>
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `focus-ring flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition ${isActive ? "bg-mint/60 text-navy" : "text-ink/65 hover:bg-navy/5"}`}>
                <Icon size={16} /><span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden text-right text-xs text-ink/55 md:block">Welcome back,<br /><strong className="text-ink">{user?.name?.split(" ")[0]}</strong></span>
            <button onClick={logout} className="focus-ring grid h-9 w-9 place-items-center rounded-xl text-ink/60 hover:bg-coral/15 hover:text-navy" aria-label="Log out"><LogOut size={17} /></button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:py-10"><Outlet /></main>
    </div>
  );
}
