import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AuthContext } from '../App';

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

function UserNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);
  const [userData] = useLocalStorage<UserData>('user_data', {
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const handleLogout = () => {
    auth?.logout();
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-zinc-800 rounded-lg px-3 py-2 transition-colors hover:bg-zinc-700"
      >
        <img
          src={userData.avatar}
          alt={userData.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-left">
          <p className="text-sm font-medium text-white">{userData.name}</p>
          <p className="text-xs text-gray-400">{userData.email}</p>
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