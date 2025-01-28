import React from 'react';
import { Settings, User, Shield, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function Configuracoes() {
  const { user } = useAuth();

  return (
    <div>
      <div className="bg-zinc-900 rounded-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-white mb-3">Configurações</h1>
        <p className="text-gray-400">Gerencie suas preferências e configurações do sistema.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <User size={24} className="text-blue-500" />
            <h2 className="text-2xl font-semibold text-white">Perfil</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2 border border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
                Alterar senha
              </button>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-blue-500" />
            <h2 className="text-2xl font-semibold text-white">Notificações</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Notificações por e-mail</p>
                <p className="text-sm text-gray-400">Receba atualizações sobre diagnósticos</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Relatórios semanais</p>
                <p className="text-sm text-gray-400">Receba resumos semanais</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={24} className="text-blue-500" />
            <h2 className="text-2xl font-semibold text-white">Segurança</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Autenticação em duas etapas</p>
                <p className="text-sm text-gray-400">Adicione uma camada extra de segurança</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Sessões ativas</p>
                <p className="text-sm text-gray-400">Gerencie seus dispositivos conectados</p>
              </div>
              <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
                Visualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Configuracoes;