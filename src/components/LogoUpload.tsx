import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useStorage } from '../hooks/useStorage';
import { useSettings } from '../hooks/useSettings';

function LogoUpload() {
  const { uploadFile, deleteFile } = useStorage();
  const { settings, updateSettings } = useSettings();
  const [loading, setLoading] = useState(false);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'image/svg+xml' && file.type !== 'image/png') {
        alert('Por favor, selecione apenas arquivos SVG ou PNG.');
        return;
      }

      try {
        setLoading(true);
        const path = `logos/company-logo-${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`;
        const downloadURL = await uploadFile(file, path);
        
        if (settings.logo) {
          const oldPath = settings.logo.split('?')[0].split('/o/')[1].replace(/%2F/g, '/');
          await deleteFile(decodeURIComponent(oldPath));
        }

        await updateSettings({ logo: downloadURL });
      } catch (error) {
        console.error('Erro ao fazer upload da logo:', error);
        alert('Erro ao fazer upload da logo. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNavbarLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'image/svg+xml' && file.type !== 'image/png') {
        alert('Por favor, selecione apenas arquivos SVG ou PNG.');
        return;
      }

      try {
        setLoading(true);
        const path = `logos/navbar-logo-${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`;
        const downloadURL = await uploadFile(file, path);

        if (settings.navbarLogo) {
          const oldPath = settings.navbarLogo.split('?')[0].split('/o/')[1].replace(/%2F/g, '/');
          await deleteFile(decodeURIComponent(oldPath));
        }

        await updateSettings({ navbarLogo: downloadURL });
      } catch (error) {
        console.error('Erro ao fazer upload da logo:', error);
        alert('Erro ao fazer upload da logo. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveLogo = async (type: 'logo' | 'navbar') => {
    try {
      setLoading(true);
      const currentLogo = type === 'logo' ? settings.logo : settings.navbarLogo;
      
      if (currentLogo) {
        const oldPath = currentLogo.split('?')[0].split('/o/')[1].replace(/%2F/g, '/');
        await deleteFile(decodeURIComponent(oldPath));
        
        await updateSettings({
          [type]: ''
        });
      }
    } catch (error) {
      console.error('Erro ao remover logo:', error);
      alert('Erro ao remover logo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

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
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                <Upload size={20} />
                Fazer upload da logo
              </label>
              <input
                id="logo-upload"
                type="file"
                accept=".svg,.png"
                onChange={handleLogoUpload}
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
                    onClick={() => handleRemoveLogo('logo')}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    disabled={loading}
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                <Upload size={20} />
                Fazer upload da logo
              </label>
              <input
                id="navbar-logo-upload"
                type="file"
                accept=".svg,.png"
                onChange={handleNavbarLogoUpload}
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
              {settings.navbarLogo ? (
                <div className="relative group">
                  <img
                    src={settings.navbarLogo}
                    alt="Logo da navbar"
                    className="w-32 h-12 object-contain bg-zinc-800 rounded-lg p-4"
                  />
                  <button
                    onClick={() => handleRemoveLogo('navbar')}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    disabled={loading}
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