import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { request } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("nexus_token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await request("/auth/me", { token });
        setUser(data.user);
      } catch {
        localStorage.removeItem("nexus_token");
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, [token]);

  function saveSession(data) {
    localStorage.setItem("nexus_token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  async function register(form) {
    const data = await request("/auth/register", { method: "POST", body: form });
    saveSession(data);
  }

  async function login(form) {
    const data = await request("/auth/login", { method: "POST", body: form });
    saveSession(data);
  }

  function logout() {
    localStorage.removeItem("nexus_token");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, isLoading, register, login, logout }), [token, user, isLoading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
