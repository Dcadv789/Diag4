import React, { useState } from 'react';
import { Building2, X, ArrowRight, ArrowLeft } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

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

interface Question {
  id: string;
  text: string;
  points: number;
  positiveAnswer: 'SIM' | 'NÃO';
  answerType: 'BINARY' | 'TERNARY';
}

interface Pillar {
  id: number;
  name: string;
  questions: Question[];
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
  const [step, setStep] = useState<'form' | 'questions'>('form');
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [pillars] = useLocalStorage<Pillar[]>('pillars', []);
  const [answers, setAnswers] = useState<Record<string, string>>({});
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

  const [displayFaturamento, setDisplayFaturamento] = useState('');

  if (!isOpen) return null;

  const handleChange = (field: keyof CompanyData, value: any) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (value: string) => {
    value = value.replace(/\D/g, '');
    const numericValue = parseInt(value) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue);
  };

  const handleFaturamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const numericValue = parseInt(value) || 0;
    setCompanyData(prev => ({
      ...prev,
      faturamento: numericValue / 100
    }));
    setDisplayFaturamento(value ? formatCurrency(value) : 'R$ ');
  };

  const handleFaturamentoFocus = () => {
    setDisplayFaturamento('R$ ');
  };

  const handleSubmit = () => {
    if (step === 'form') {
      setStep('questions');
    } else {
      console.log('Respostas:', answers);
      onClose();
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const currentPillar = pillars[currentPillarIndex];

  const canGoNext = currentPillarIndex < pillars.length - 1;
  const canGoPrevious = currentPillarIndex > 0;

  const goToNextPillar = () => {
    if (canGoNext) {
      setCurrentPillarIndex(prev => prev + 1);
    }
  };

  const goToPreviousPillar = () => {
    if (canGoPrevious) {
      setCurrentPillarIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg w-full max-w-4xl">
        <div className="bg-zinc-800 p-6 border-b border-zinc-700 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center gap-4">
            <Building2 size={32} className="text-blue-500" />
            <div>
              <h2 className="text-2xl font-bold text-white">Diagnóstico Financeiro</h2>
              <p className="text-gray-400">
                {step === 'form' ? 'Preencha os dados da sua empresa para começar' : 'Responda as perguntas a seguir'}
              </p>
              {step === 'questions' && (
                <div className="mt-2 space-y-1">
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">Nome:</span>
                  </div>
                  <div className="text-white">{companyData.nome}</div>
                  <div className="text-sm text-gray-300">
                    <span className="font-medium">Empresa:</span>
                  </div>
                  <div className="text-white">{companyData.empresa}</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">powered by</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">CompanyName</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">C</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {step === 'form' ? (
            <div className="grid grid-cols-2 gap-6">
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
                    value={companyData.numeroFuncionarios || ''}
                    onChange={(e) => handleChange('numeroFuncionarios', parseInt(e.target.value) || 0)}
                    onFocus={(e) => e.target.value = ''}
                    className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ex: 10 funcionários"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Faturamento
                  </label>
                  <input
                    type="text"
                    value={displayFaturamento}
                    onChange={handleFaturamentoChange}
                    onFocus={handleFaturamentoFocus}
                    className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Ex: R$ 100.000,00"
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
          ) : (
            <div>
              {currentPillar && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {currentPillar.name}
                  </h3>
                  <div className="space-y-6">
                    {currentPillar.questions.map(question => (
                      <div key={question.id} className="bg-zinc-800 p-4 rounded-lg">
                        <p className="text-white mb-4">{question.text}</p>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleAnswer(question.id, 'SIM')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              answers[question.id] === 'SIM'
                                ? 'bg-green-600 text-white'
                                : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                            }`}
                          >
                            Sim
                          </button>
                          {question.answerType === 'TERNARY' && (
                            <button
                              onClick={() => handleAnswer(question.id, 'PARCIALMENTE')}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                answers[question.id] === 'PARCIALMENTE'
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                              }`}
                            >
                              Parcialmente
                            </button>
                          )}
                          <button
                            onClick={() => handleAnswer(question.id, 'NÃO')}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              answers[question.id] === 'NÃO'
                                ? 'bg-red-600 text-white'
                                : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                            }`}
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between items-center">
            {step === 'questions' ? (
              <>
                <button
                  onClick={goToPreviousPillar}
                  disabled={!canGoPrevious}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    canGoPrevious
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <ArrowLeft size={20} />
                  Anterior
                </button>
                <div className="text-gray-400">
                  Pilar {currentPillarIndex + 1} de {pillars.length}
                </div>
                {canGoNext ? (
                  <button
                    onClick={goToNextPillar}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    Próximo
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    Finalizar
                  </button>
                )}
              </>
            ) : (
              <div className="flex justify-end gap-3 w-full">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosticModal;