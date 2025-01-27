import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useDiagnosticCalculation } from '../hooks/useDiagnosticCalculation';
import type { DiagnosticResult } from '../types/diagnostic';

function DiagnosticCard({ result }: { result: DiagnosticResult }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-zinc-800 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-grow">
          <p className="text-white">{result.companyData.nome}</p>
          <span className="text-gray-400">•</span>
          <p className="text-white">{result.companyData.empresa}</p>
          <span className="text-gray-400">•</span>
          <p className="text-gray-400">CNPJ: {result.companyData.cnpj}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Pontuação</p>
            <p className="text-xl font-bold text-white">{result.percentageScore.toFixed(1)}%</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Informações da Empresa</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-400">Nome do Responsável:</span>{' '}
                  <span className="text-white">{result.companyData.nome}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-400">Tem Sócios:</span>{' '}
                  <span className="text-white">{result.companyData.temSocios === 'sim' ? 'Sim' : 'Não'}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-400">Funcionários:</span>{' '}
                  <span className="text-white">{result.companyData.numeroFuncionarios}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-400">Faturamento:</span>{' '}
                  <span className="text-white">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(result.companyData.faturamento)}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Dados Adicionais</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-400">Tempo de Atividade:</span>{' '}
                  <span className="text-white">{result.companyData.tempoAtividade}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-400">Localização:</span>{' '}
                  <span className="text-white">{result.companyData.localizacao}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-400">Forma Jurídica:</span>{' '}
                  <span className="text-white">{result.companyData.formaJuridica}</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-4">Pontuação por Pilar</h4>
            <div className="space-y-3">
              {result.pillarScores.map((pillar) => (
                <div key={pillar.pillarId} className="bg-zinc-900 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-white">{pillar.pillarName}</h3>
                    <p className="text-xs font-medium text-gray-400">
                      {pillar.score} / {pillar.maxPossibleScore} pontos
                    </p>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${pillar.percentageScore}%` }}
                    />
                  </div>
                  <p className="text-right text-xs text-gray-400 mt-1">
                    {pillar.percentageScore.toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-zinc-900 rounded-lg p-4 text-center">
              <BarChart3 size={24} className="text-blue-500 mx-auto mb-2" />
              <p className="text-base font-medium text-white mb-1">
                {result.totalScore} pontos
              </p>
              <p className="text-xs text-gray-400">Pontuação Total</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4 text-center">
              <TrendingUp size={24} className="text-green-500 mx-auto mb-2" />
              <p className="text-base font-medium text-white mb-1">
                {result.maxPossibleScore} pontos
              </p>
              <p className="text-xs text-gray-400">Pontuação Máxima</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4 text-center">
              <Award size={24} className="text-yellow-500 mx-auto mb-2" />
              <p className="text-base font-medium text-white mb-1">
                {result.percentageScore.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-400">Aproveitamento</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Resultados() {
  const { results } = useDiagnosticCalculation();
  const [isLatestExpanded, setIsLatestExpanded] = useState(false);
  const latestResult = results[results.length - 1];

  if (!latestResult) {
    return (
      <div>
        <div className="bg-zinc-900 rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-white mb-3">Resultados</h1>
          <p className="text-gray-400">Visualize e analise os resultados detalhados do seu diagnóstico de maturidade digital.</p>
        </div>

        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="text-center py-12">
            <TrendingUp size={48} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              Nenhum diagnóstico realizado ainda. Complete um diagnóstico para ver seus resultados aqui.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="bg-zinc-900 rounded-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-white mb-3">Resultados</h1>
        <p className="text-gray-400">Visualize e analise os resultados detalhados do seu diagnóstico de maturidade digital.</p>
      </div>

      <div className="space-y-6">
        {/* Latest Diagnostic */}
        <div className="bg-zinc-900 rounded-lg p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Último Diagnóstico</h2>
                <p className="text-gray-400">Realizado em {formatDate(latestResult.date)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Pontuação Geral</p>
                <p className="text-3xl font-bold text-white">
                  {latestResult.percentageScore.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-grow">
                  <p className="text-white">{latestResult.companyData.nome}</p>
                  <span className="text-gray-400">•</span>
                  <p className="text-white">{latestResult.companyData.empresa}</p>
                  <span className="text-gray-400">•</span>
                  <p className="text-gray-400">CNPJ: {latestResult.companyData.cnpj}</p>
                </div>
                <button
                  onClick={() => setIsLatestExpanded(!isLatestExpanded)}
                  className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  {isLatestExpanded ? (
                    <ChevronUp className="text-gray-400" />
                  ) : (
                    <ChevronDown className="text-gray-400" />
                  )}
                </button>
              </div>

              {isLatestExpanded && (
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Informações da Empresa</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-400">Nome do Responsável:</span>{' '}
                          <span className="text-white">{latestResult.companyData.nome}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Tem Sócios:</span>{' '}
                          <span className="text-white">{latestResult.companyData.temSocios === 'sim' ? 'Sim' : 'Não'}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Funcionários:</span>{' '}
                          <span className="text-white">{latestResult.companyData.numeroFuncionarios}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Faturamento:</span>{' '}
                          <span className="text-white">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(latestResult.companyData.faturamento)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Dados Adicionais</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-400">Tempo de Atividade:</span>{' '}
                          <span className="text-white">{latestResult.companyData.tempoAtividade}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Localização:</span>{' '}
                          <span className="text-white">{latestResult.companyData.localizacao}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Forma Jurídica:</span>{' '}
                          <span className="text-white">{latestResult.companyData.formaJuridica}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 mt-6">
              {latestResult.pillarScores.map((pillar) => (
                <div key={pillar.pillarId} className="bg-zinc-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-white">{pillar.pillarName}</h3>
                    <p className="text-sm font-medium text-gray-400">
                      {pillar.score} / {pillar.maxPossibleScore} pontos
                    </p>
                  </div>
                  <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${pillar.percentageScore}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-gray-400 mt-1">
                    {pillar.percentageScore.toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-zinc-800 rounded-lg p-6 text-center">
              <BarChart3 size={32} className="text-blue-500 mx-auto mb-3" />
              <p className="text-lg font-medium text-white mb-1">
                {latestResult.totalScore} pontos
              </p>
              <p className="text-sm text-gray-400">Pontuação Total</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-6 text-center">
              <TrendingUp size={32} className="text-green-500 mx-auto mb-3" />
              <p className="text-lg font-medium text-white mb-1">
                {latestResult.maxPossibleScore} pontos
              </p>
              <p className="text-sm text-gray-400">Pontuação Máxima</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-6 text-center">
              <Award size={32} className="text-yellow-500 mx-auto mb-3" />
              <p className="text-lg font-medium text-white mb-1">
                {latestResult.percentageScore.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-400">Aproveitamento</p>
            </div>
          </div>
        </div>

        {/* Historical Diagnostics */}
        {results.length > 1 && (
          <div className="bg-zinc-900 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Histórico de Diagnósticos</h2>
            <div className="space-y-4">
              {results.slice(0, -1).reverse().map((result) => (
                <DiagnosticCard key={result.id} result={result} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resultados;