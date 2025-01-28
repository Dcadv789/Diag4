import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope, Building2, LineChart, Settings, LogOut, ChevronDown } from 'lucide-react';
import Diagnostico from './pages/Diagnostico';
import Backoffice from './pages/Backoffice';
import Resultados from './pages/Resultados';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Login';
import useLocalStorage from './hooks/useLocalStorage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user] = useLocalStorage('user', {
    name: 'User',
    email: 'user@example.com'
  });
  const auth = React.useContext(AuthContext);

  const handleSignOut = () => {
    if (auth) {
      auth.logout();
      navigate('/login');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:bg-zinc-800 rounded-lg px-3 py-2 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white font-medium">
            {user.name[0].toUpperCase()}
          </span>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-white">
            {user.name}
          </p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg py-2">
          <NavLink
            to="/configuracoes"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} />
            Configurações
          </NavLink>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition-colors w-full text-left"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAuthenticated) {
      navigate('/login');
    }
  }, [auth?.isAuthenticated, navigate]);

  if (!auth?.isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="bg-zinc-900 px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-[220px] pl-8">
            <div className="w-12" />
          </div>
          <div className="flex-1 flex justify-center space-x-8">
            <NavLink
              to="/diagnostico"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                }`
              }
            >
              <Stethoscope size={18} />
              Diagnóstico
            </NavLink>
            <NavLink
              to="/backoffice"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                }`
              }
            >
              <Building2 size={18} />
              Backoffice
            </NavLink>
            <NavLink
              to="/resultados"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                }`
              }
            >
              <LineChart size={18} />
              Resultados
            </NavLink>
          </div>
          <div className="w-[280px] flex justify-end pr-8">
            <UserMenu />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-8">
        {children}
      </main>
    </>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        resolve();
      }, 1500);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        <div className="min-h-screen bg-black">
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/diagnostico" /> : <Login />
            } />
            <Route path="/" element={
              <Navigate to={isAuthenticated ? "/diagnostico" : "/login"} />
            } />
            <Route path="/diagnostico" element={
              <ProtectedRoute>
                <Diagnostico />
              </ProtectedRoute>
            } />
            <Route path="/backoffice" element={
              <ProtectedRoute>
                <Backoffice />
              </ProtectedRoute>
            } />
            <Route path="/resultados" element={
              <ProtectedRoute>
                <Resultados />
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;