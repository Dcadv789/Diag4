import React from 'react';
import { Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';
import useLocalStorage from '../hooks/useLocalStorage';

function LogoUpload() {
  const [logo, setLogo] = useLocalStorage<string>('company_logo', '');
  const [navbarLogo, setNavbarLogo] = useLocalStorage<string>('navbar_logo', '');

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>, isNavbar: boolean) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.type !== 'image/svg+xml' && file.type !== 'image/png') {
        alert('Por favor, selecione apenas arquivos SVG ou PNG.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${isNavbar ? 'navbar' : 'main'}_${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath);

      if (isNavbar) {
        setNavbarLogo(publicUrl);
      } else {
        setLogo(publicUrl);
      }
    } catch (error) {
      console.error('Erro ao fazer upload da logo:', error);
      alert('Erro ao fazer upload da imagem. Por favor, tente novamente.');
    }
  };

  const handleRemoveLogo = async (isNavbar: boolean) => {
    try {
      const logoUrl = isNavbar ? navbarLogo : logo;
      if (!logoUrl) return;

      const filePath = logoUrl.split('/').slice(-2).join('/');
      if (!filePath) return;

      const { error } = await supabase.storage
        .from('logos')
        .remove([filePath]);

      if (error) throw error;

      if (isNavbar) {
        setNavbarLogo('');
      } else {
        setLogo('');
      }
    } catch (error) {
      console.error('Erro ao remover logo:', error);
      alert('Erro ao remover a imagem. Por favor, tente novamente.');
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-8 mt-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Logos da Empresa</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Logo do Diagnóstico</h3>
          <div className="flex items-start gap-8">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="logo-upload"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload size={20} />
                  Fazer upload da logo
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => handleLogoUpload(e, false)}
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
              {logo ? (
                <div className="relative group">
                  <img
                    src={logo}
                    alt="Logo da empresa"
                    className="w-32 h-32 object-contain bg-zinc-800 rounded-lg p-4"
                  />
                  <button
                    onClick={() => handleRemoveLogo(false)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Upload size={20} />
                  Fazer upload da logo
                </label>
                <input
                  id="navbar-logo-upload"
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => handleLogoUpload(e, true)}
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
              {navbarLogo ? (
                <div className="relative group">
                  <img
                    src={navbarLogo}
                    alt="Logo da navbar"
                    className="h-8 w-auto object-contain bg-zinc-800 rounded-lg p-2"
                  />
                  <button
                    onClick={() => handleRemoveLogo(true)}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
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