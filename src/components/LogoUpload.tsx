import React, { useState, useEffect } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useStorage } from '../hooks/useStorage';
import { supabase } from '../lib/supabase';

function LogoUpload() {
  const { uploadLogo, removeLogo } = useStorage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<{ logo: string | null; navbar_logo: string | null }>({
    logo: null,
    navbar_logo: null
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // First check if the table exists
        const { error: tableError } = await supabase
          .from('settings')
          .select('*')
          .limit(1);

        if (tableError) {
          console.error('Settings table error:', tableError);
          setError('Unable to load settings');
          return;
        }

        // If table exists, get the settings
        const { data, error } = await supabase
          .from('settings')
          .select('logo, navbar_logo')
          .single();

        if (error) {
          console.error('Error fetching settings:', error);
          setError('Unable to load settings');
          return;
        }

        if (data) {
          setSettings(data);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Unable to load settings');
      }
    };

    fetchSettings();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('settings_changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'settings' 
      }, payload => {
        setSettings(payload.new);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'navbar_logo') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml' && file.type !== 'image/png') {
      alert('Por favor, selecione apenas arquivos SVG ou PNG.');
      return;
    }

    try {
      setLoading(true);
      const url = await uploadLogo(file, type);
      setSettings(prev => ({ ...prev, [type]: url }));
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da logo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoRemove = async (type: 'logo' | 'navbar_logo') => {
    try {
      setLoading(true);
      await removeLogo(type);
      setSettings(prev => ({ ...prev, [type]: null }));
    } catch (error) {
      console.error('Erro ao remover:', error);
      alert('Erro ao remover a logo.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-zinc-900 rounded-lg p-8 mt-6">
        <h2 className="text-2xl font-semibold text-white mb-6">Logos</h2>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-8 mt-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Logos</h2>
      <div className="flex justify-between">
        <div className="flex items-start gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Logo da Empresa</h3>
            <div className="mb-4">
              <label
                htmlFor="logo-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Upload size={20} />
                )}
                Fazer upload da logo
              </label>
              <input
                id="logo-upload"
                type="file"
                accept=".svg,.png"
                onChange={(e) => handleLogoUpload(e, 'logo')}
                className="hidden"
                disabled={loading}
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
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Visualização:</p>
              {settings.logo ? (
                <div className="relative group">
                  <img
                    src={settings.logo}
                    alt="Logo da empresa"
                    className="w-32 h-32 object-contain bg-zinc-800 rounded-lg p-4"
                  />
                  <button
                    onClick={() => handleLogoRemove('logo')}
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

        <div className="flex items-start gap-8">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Logo da NavBar</h3>
            <div className="mb-4">
              <label
                htmlFor="navbar-logo-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Upload size={20} />
                )}
                Fazer upload da logo
              </label>
              <input
                id="navbar-logo-upload"
                type="file"
                accept=".svg,.png"
                onChange={(e) => handleLogoUpload(e, 'navbar_logo')}
                className="hidden"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Formatos aceitos: SVG, PNG
              </p>
              <p className="text-sm text-gray-400">
                Tamanho recomendado: 120x40 pixels
              </p>
              <p className="text-sm text-gray-400">
                Tamanho máximo: 180x60 pixels
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Visualização:</p>
              {settings.navbar_logo ? (
                <div className="relative group">
                  <img
                    src={settings.navbar_logo}
                    alt="Logo da navbar"
                    className="w-32 h-12 object-contain bg-zinc-800 rounded-lg p-4"
                  />
                  <button
                    onClick={() => handleLogoRemove('navbar_logo')}
                    disabled={loading}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div className="w-32 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
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