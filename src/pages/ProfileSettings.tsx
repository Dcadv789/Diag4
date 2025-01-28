import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

function ProfileSettings() {
  const [user, setUser] = useLocalStorage('user', {
    name: 'User',
    email: 'user@example.com'
  });
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email
    });
    // Add password change logic here if needed
  };

  return (
    <div>
      <div className="bg-zinc-900 rounded-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-white mb-3">Configurações do Perfil</h1>
        <p className="text-gray-400">Gerencie suas informações pessoais e preferências de conta.</p>
      </div>

      <div className="bg-zinc-900 rounded-lg p-8">
        <div className="max-w-2xl">
          <div className="mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-4xl font-medium text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Foto do Perfil</h2>
                <label className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors inline-block">
                  <Upload size={20} />
                  Fazer upload
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-lg font-medium text-white mb-4">Alterar Senha</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save size={20} />
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;