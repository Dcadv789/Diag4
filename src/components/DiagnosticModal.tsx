import React, { useState } from 'react';
import { Building2, X } from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompanyData {
  nome: string;
  empresa: string;
  cnpj: string;
  temSocios: string;
  numeroFuncionarios: number;
  faturamento: number;
  segmento: string;
  tempoAtividade: string;
  localizacao: string;
  formaJuridica: string;
}

const SEGMENTOS = [
  'Tecnologia',
  'Varejo',
  'Indústria',
  'Serviços',
  'Saúde',
  'Educação',
  'Outros'
];

const TEMPO_ATIVIDADE = [
  'Menos de 1 ano',
  '1 a 3 anos',
  '3 a 5 anos',
  '5 a 10 anos',
  'Mais de 10 anos'
];

const LOCALIZACOES = [
  'Norte',
  'Nordeste',
  'Centro-Oeste',
  'Sudeste',
  'Sul'
];

const FORMAS_JURIDICAS = [
  'MEI',
  'EIRELI',
  'Sociedade Limitada',
  'Sociedade Anônima',
  'Outros'
];

function DiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [companyData, setCompanyData] = useState<CompanyData>({
    nome: '',
    empresa: '',
    cnpj: '',
    temSocios: '',
    numeroFuncionarios: 0,
    faturamento: 0,
    segmento: '',
    tempoAtividade: '',
    localizacao: '',
    formaJuridica: ''
  });

  if (!isOpen) return null;

  const handleChange = (field: keyof CompanyData, value: any) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSubmit = () => {
    console.log(companyData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg w-full max-w-4xl">
        {/* Cabeçalho */}
        <div className="p-6 border-b border-zinc-700 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Building2 size={32} className="text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold text-white">Diagnóstico Financeiro</h2>
              <p className="text-gray-400">Preencha os dados da sua empresa para começar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulário */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Coluna 1 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={companyData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  value={companyData.empresa}
                  onChange={(e) => handleChange('empresa', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Digite o nome da empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  CNPJ
                </label>
                <input
                  type="text"
                  value={companyData.cnpj}
                  onChange={(e) => handleChange('cnpj', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Digite o CNPJ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tem sócios?
                </label>
                <select
                  value={companyData.temSocios}
                  onChange={(e) => handleChange('temSocios', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Número de Funcionários
                </label>
                <input
                  type="number"
                  min="0"
                  value={companyData.numeroFuncionarios}
                  onChange={(e) => handleChange('numeroFuncionarios', parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Digite o número de funcionários"
                />
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Faturamento (R$)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={companyData.faturamento}
                  onChange={(e) => handleChange('faturamento', parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Digite o faturamento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Segmento
                </label>
                <select
                  value={companyData.segmento}
                  onChange={(e) => handleChange('segmento', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Selecione o segmento</option>
                  {SEGMENTOS.map(segmento => (
                    <option key={segmento} value={segmento}>{segmento}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tempo de Atividade
                </label>
                <select
                  value={companyData.tempoAtividade}
                  onChange={(e) => handleChange('tempoAtividade', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Selecione o tempo de atividade</option>
                  {TEMPO_ATIVIDADE.map(tempo => (
                    <option key={tempo} value={tempo}>{tempo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Localização
                </label>
                <select
                  value={companyData.localizacao}
                  onChange={(e) => handleChange('localizacao', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Selecione a localização</option>
                  {LOCALIZACOES.map(local => (
                    <option key={local} value={local}>{local}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Forma Jurídica
                </label>
                <select
                  value={companyData.formaJuridica}
                  onChange={(e) => handleChange('formaJuridica', e.target.value)}
                  className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Selecione a forma jurídica</option>
                  {FORMAS_JURIDICAS.map(forma => (
                    <option key={forma} value={forma}>{forma}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticModal;