import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useStorage } from '../hooks/useStorage';
import { supabase } from '../lib/supabase';
import type { Settings } from '../types/diagnostic';

function LogoUpload() {
  const { uploadLogo, removeLogo, loading } = useStorage();
  const [settings, setSettings] = useState<Settings | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('*')
          .single();

        if (error) throw error;
        setSettings(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchSettings();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('settings_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'settings' },
        (payload) => {
          setSettings(payload.new as Settings);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>, isNavbar: boolean) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml' && file.type !== 'image/png') {
      setError('Por favor, selecione apenas arquivos SVG ou PNG.');
      return;
    }

    try {
      await uploadLogo(file, isNavbar ? 'navbar_logo' : 'logo');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogoRemove = async (isNavbar: boolean) => {
    try {
      await removeLogo(isNavbar ? 'navbar_logo' : 'logo');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!settings) {
    return (
      <div className="bg-zinc-900 rounded-lg p-8 mt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-zinc-800 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-32 bg-zinc-800 rounded"></div>
            <div className="h-32 bg-zinc-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-8 mt-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Logos da Empresa</h2>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Logo do Diagnóstico</h3>
          <div className="flex items-start gap-8">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="logo-upload"
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload size={20} />
                  {loading ? 'Enviando...' : 'Fazer upload da logo'}
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => handleLogoUpload(e, false)}
                  disabled={loading}
                  className="hidden"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  Formatos aceitos: SVG, PNG
                </p>
                <p className="text-sm text-gray-400">
                  Tamanho recomendado: 250x132 pixels
                </p>
                <p className="text-sm text-gray-400">
                  Tamanho máximo: 530x280 pixels
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Visualização:</p>
              {settings.logo ? (
                <div className="relative group">
                  <img
                    src={settings.logo}
                    alt="Logo da empresa"
                    className="w-32 h-32 object-contain bg-zinc-800 rounded-lg p-4"
                  />
                  <button
                    onClick={() => handleLogoRemove(false)}
                    disabled={loading}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-500">Sem logo</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">Logo da Navbar</h3>
          <div className="flex items-start gap-8">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="navbar-logo-upload"
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload size={20} />
                  {loading ? 'Enviando...' : 'Fazer upload da logo'}
                </label>
                <input
                  id="navbar-logo-upload"
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => handleLogoUpload(e, true)}
                  disabled={loading}
                  className="hidden"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  Formatos aceitos: SVG, PNG
                </p>
                <p className="text-sm text-gray-400">
                  Tamanho recomendado: 32x32 pixels
                </p>
                <p className="text-sm text-gray-400">
                  Tamanho máximo: 64x64 pixels
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">Visualização:</p>
              {settings.navbar_logo ? (
                <div className="relative group">
                  <img
                    src={settings.navbar_logo}
                    alt="Logo da navbar"
                    className="h-8 w-auto object-contain bg-zinc-800 rounded-lg p-2"
                  />
                  <button
                    onClick={() => handleLogoRemove(true)}
                    disabled={loading}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="h-8 w-32 bg-zinc-800 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-500">Sem logo</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoUpload;