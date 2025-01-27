import React from 'react';
import { FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { DiagnosticResult } from '../types/diagnostic';

interface ExportPDFProps {
  result: DiagnosticResult;
}

function ExportPDF({ result }: ExportPDFProps) {
  const handleExport = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [210, 350]
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const content = document.createElement('div');
    content.style.width = `${pageWidth * 3.779527559}px`;
    content.style.height = `${pageHeight * 3.779527559}px`;
    content.innerHTML = `
      <div style="background-color: #0030b9; padding: 20px; font-family: Arial, sans-serif; height: 100%; position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
          <div style="flex-grow: 1; max-width: 70%;">
            <h1 style="font-size: 24px; font-weight: bold; color: white;">Relatório Financeiro Empresarial</h1>
            <p style="font-size: 14px; color: rgba(255, 255, 255, 0.8);">${new Date(result.date).toLocaleDateString('pt-BR')}</p>
          </div>
          <div style="text-align: right; margin-left: 20px;">
            <h2 style="font-size: 20px; font-weight: bold; color: white;">DC ADVISORS</h2>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 40px;">
          <div style="background-color: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px;">
            <h3 style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">Informações da Empresa</h3>
            <div style="display: grid; gap: 8px; font-size: 12px;">
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Empresa:</strong> ${result.companyData.empresa}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">CNPJ:</strong> ${result.companyData.cnpj}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Responsável:</strong> ${result.companyData.nome}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Funcionários:</strong> ${result.companyData.numeroFuncionarios}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Faturamento:</strong> ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.companyData.faturamento)}</p>
            </div>
          </div>
          <div style="background-color: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px;">
            <h3 style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">Dados do Negócio</h3>
            <div style="display: grid; gap: 8px; font-size: 12px;">
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Segmento:</strong> ${result.companyData.segmento}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Localização:</strong> ${result.companyData.localizacao}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Tempo de Atividade:</strong> ${result.companyData.tempoAtividade}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Forma Jurídica:</strong> ${result.companyData.formaJuridica}</p>
              <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Tem Sócios:</strong> ${result.companyData.temSocios === 'sim' ? 'Sim' : 'Não'}</p>
            </div>
          </div>
        </div>

        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px; margin-bottom: 40px;">
          <h3 style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">Pontuação Geral</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; text-align: center;">
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px;">
              <p style="font-size: 20px; font-weight: bold; color: white; margin-bottom: 4px;">${Math.round(result.totalScore)}</p>
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 12px;">Pontuação Total</p>
            </div>
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px;">
              <p style="font-size: 20px; font-weight: bold; color: white; margin-bottom: 4px;">${Math.round(result.maxPossibleScore)}</p>
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 12px;">Pontuação Máxima</p>
            </div>
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px;">
              <p style="font-size: 20px; font-weight: bold; color: white; margin-bottom: 4px;">${Math.round(result.percentageScore)}%</p>
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 12px;">Percentual Atingido</p>
            </div>
          </div>
        </div>

        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px; margin-bottom: 40px;">
          <h3 style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">Pontuação por Pilar</h3>
          <div style="display: grid; gap: 12px;">
            ${result.pillarScores.map(pillar => `
              <div style="background-color: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <h4 style="font-size: 14px; font-weight: bold; color: white;">${pillar.pillarName}</h4>
                  <p style="color: rgba(255, 255, 255, 0.8); font-size: 12px;">${Math.round(pillar.score)} / ${pillar.maxPossibleScore} pontos</p>
                </div>
                <div style="width: 100%; height: 6px; background-color: rgba(255, 255, 255, 0.1); border-radius: 3px; overflow: hidden;">
                  <div style="width: ${pillar.percentageScore}%; height: 100%; background-color: #F47400;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background-color: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px;">
          <h3 style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 12px;">Maturidade do Negócio</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; ${result.totalScore <= 40 ? 'border: 2px solid #F47400;' : ''}">
              <h4 style="font-size: 14px; font-weight: bold; color: white; margin-bottom: 4px;">Inicial</h4>
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 11px;">O negócio está começando ou ainda não possui processos bem definidos.</p>
            </div>
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; ${result.totalScore > 40 && result.totalScore <= 70 ? 'border: 2px solid #F47400;' : ''}">
              <h4 style="font-size: 14px; font-weight: bold; color: white; margin-bottom: 4px;">Em Desenvolvimento</h4>
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 11px;">O negócio já possui alguns processos organizados, mas ainda enfrenta desafios.</p>
            </div>
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 12px; border-radius: 8px; ${result.totalScore > 70 ? 'border: 2px solid #F47400;' : ''}">
              <h4 style="font-size: 14px; font-weight: bold; color: white; margin-bottom: 4px;">Consolidado</h4>
              <p style="color: rgba(255, 255, 255, 0.8); font-size: 11px;">O negócio tem processos bem estabelecidos e está em fase de expansão.</p>
            </div>
          </div>
        </div>

        <div style="position: absolute; bottom: 20px; left: 20px; right: 20px;">
          <div style="border-top: 2px solid rgba(255, 255, 255, 0.1); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 11px;">© ${new Date().getFullYear()} DC ADVISORS. Todos os direitos reservados.</p>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 11px;">Relatório gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(content);

    try {
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      pdf.save(`diagnostico-${result.companyData.empresa.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      document.body.removeChild(content);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
    >
      <FileDown size={20} />
      Exportar PDF
    </button>
  );
}

export default ExportPDF;