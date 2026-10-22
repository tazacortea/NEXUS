import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import AppShell from "./components/AppShell.jsx";
import PageLoader from "./components/PageLoader.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AssessmentPage from "./pages/AssessmentPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import ProgressPage from "./pages/ProgressPage.jsx";

function ProtectedLayout() {
  const { token, isLoading } = useAuth();
  if (isLoading) return <PageLoader label="Restoring your private space…" />;
  return token ? <AppShell /> : <Navigate to="/auth" replace />;
}

function GuestRoute({ children }) {
  const { token, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  return token ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<GuestRoute><AuthPage /></GuestRoute>} />
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
