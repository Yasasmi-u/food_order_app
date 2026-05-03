import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  userId: number | null;
  role: string | null;
  username: string | null;
  login: (token: string, userId: number, role: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState<number | null>(
    Number(localStorage.getItem('userId')) || null
  );
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const login = (t: string, id: number, r: string, u: string) => {
    localStorage.setItem('token', t);
    localStorage.setItem('userId', String(id));
    localStorage.setItem('role', r);
    localStorage.setItem('username', u);
    setToken(t); setUserId(id); setRole(r); setUsername(u);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null); setUserId(null); setRole(null); setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);