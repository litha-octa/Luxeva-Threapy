import { createContext, useContext, useState } from 'react';

// Auth dummy sementara: email/password apa pun diterima.
// Session disimpan di sessionStorage supaya tidak hilang saat refresh.
const STORAGE_KEY = 'luxeva_session';

function loadSession() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  const signIn = async (email, _password, role) => {
    const newSession = { user: { email }, role };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } catch {}
    setSession(newSession);
    return { error: null };
  };

  const signOut = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
