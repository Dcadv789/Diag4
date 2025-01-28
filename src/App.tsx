import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { Stethoscope, Building2, LineChart } from 'lucide-react';
import Diagnostico from './pages/Diagnostico';
import Backoffice from './pages/Backoffice';
import Resultados from './pages/Resultados';
import ProfileSettings from './pages/ProfileSettings';
import Login from './pages/Login';
import UserNavbar from './components/UserNavbar';
import useLocalStorage from './hooks/useLocalStorage';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = React.useContext(AuthContext);
  
  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  const [navbarLogo] = useLocalStorage<string>('navbar_logo', '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    // In a real app, this would validate credentials against a backend
    if (email && password) {
      setIsAuthenticated(true);
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        {isAuthenticated ? (
          <div className="min-h-screen bg-black">
            <nav className="bg-zinc-900 px-4 py-3">
              <div className="max-w-7xl mx-auto flex items-center">
                <div className="w-1/4">
                  {navbarLogo ? (
                    <img src={navbarLogo} alt="Logo" className="h-8 w-auto object-contain ml-4" />
                  ) : null}
                </div>
                
                <div className="flex-1 flex justify-center">
                  <div className="flex space-x-8">
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
                </div>
                
                <div className="w-1/4 flex justify-end pr-4">
                  <UserNavbar />
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 px-4">
              <Routes>
                <Route path="/" element={<Navigate to="/diagnostico" replace />} />
                <Route
                  path="/diagnostico"
                  element={
                    <PrivateRoute>
                      <Diagnostico />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/backoffice"
                  element={
                    <PrivateRoute>
                      <Backoffice />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/resultados"
                  element={
                    <PrivateRoute>
                      <Resultados />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/configuracoes"
                  element={
                    <PrivateRoute>
                      <ProfileSettings />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Navigate to="/diagnostico" replace />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;