import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import { AuthContext } from '../App';

function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await auth?.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-zinc-800 rounded-lg px-3 py-2 transition-colors hover:bg-zinc-700"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {auth?.user?.email?.[0].toUpperCase()}
          </span>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-white">{auth?.user?.email}</p>
        </div>
        {isOpen ? (
          <ChevronUp className="text-gray-400" size={20} />
        ) : (
          <ChevronDown className="text-gray-400" size={20} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-lg shadow-lg py-1 z-50">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/configuracoes');
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
          >
            <Settings size={16} />
            Configurações
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-zinc-700 transition-colors"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default UserNavbar;