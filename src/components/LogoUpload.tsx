import React from 'react';
import { Upload } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

function LogoUpload() {
  const [logo, setLogo] = useLocalStorage<string>('company_logo', '');

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'image/svg+xml' && file.type !== 'image/png') {
        alert('Por favor, selecione apenas arquivos SVG ou PNG.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-8 mt-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Logo da Empresa</h2>
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
              onChange={handleLogoUpload}
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
                onClick={() => setLogo('')}
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
  );
}

export default LogoUpload;