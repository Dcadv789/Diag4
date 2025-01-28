import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { Stethoscope, Building2, LineChart, Settings, LogOut, ChevronDown } from 'lucide-react';
import Diagnostico from './pages/Diagnostico';
import Backoffice from './pages/Backoffice';
import Resultados from './pages/Resultados';
import ProfileSettings from './pages/ProfileSettings';
import useLocalStorage from './hooks/useLocalStorage';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user] = useLocalStorage('user', {
    name: 'User',
    email: 'user@example.com'
  });

  const handleSignOut = () => {
    // Add your sign out logic here
    navigate('/');
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

function App() {
  const [navbarLogo] = useLocalStorage<string>('navbar_logo', '');

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <nav className="bg-zinc-900 px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="w-[220px] pl-8">
              {navbarLogo ? (
                <img
                  src={navbarLogo}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="w-12" />
              )}
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
          <Routes>
            <Route path="/" element={<Diagnostico />} />
            <Route path="/diagnostico" element={<Diagnostico />} />
            <Route path="/backoffice" element={<Backoffice />} />
            <Route path="/resultados" element={<Resultados />} />
            <Route path="/configuracoes" element={<ProfileSettings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;