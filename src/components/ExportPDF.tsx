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
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
    });

    const content = document.createElement('div');
    content.innerHTML = `
      <div style="padding: 40px; font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0;">
          <div>
            <h1 style="font-size: 28px; font-weight: bold; color: #1a1a1a; margin-bottom: 10px;">Relatório de Diagnóstico Digital</h1>
            <p style="font-size: 16px; color: #4a5568;">${new Date(result.date).toLocaleDateString('pt-BR')}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="font-size: 24px; font-weight: bold; color: #2563eb;">DC ADVISORS</h2>
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h3 style="font-size: 20px; font-weight: bold; color: #1a1a1a; margin-bottom: 20px;">Informações da Empresa</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div>
              <p style="margin-bottom: 10px;"><strong>Empresa:</strong> ${result.companyData.empresa}</p>
              <p style="margin-bottom: 10px;"><strong>CNPJ:</strong> ${result.companyData.cnpj}</p>
              <p style="margin-bottom: 10px;"><strong>Responsável:</strong> ${result.companyData.nome}</p>
              <p style="margin-bottom: 10px;"><strong>Funcionários:</strong> ${result.companyData.numeroFuncionarios}</p>
            </div>
            <div>
              <p style="margin-bottom: 10px;"><strong>Segmento:</strong> ${result.companyData.segmento}</p>
              <p style="margin-bottom: 10px;"><strong>Localização:</strong> ${result.companyData.localizacao}</p>
              <p style="margin-bottom: 10px;"><strong>Tempo de Atividade:</strong> ${result.companyData.tempoAtividade}</p>
              <p style="margin-bottom: 10px;"><strong>Forma Jurídica:</strong> ${result.companyData.formaJuridica}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h3 style="font-size: 20px; font-weight: bold; color: #1a1a1a; margin-bottom: 20px;">Pontuação Geral</h3>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; text-align: center;">
              <div>
                <p style="font-size: 24px; font-weight: bold; color: #2563eb;">${Math.round(result.totalScore)}</p>
                <p style="color: #4a5568;">Pontuação Total</p>
              </div>
              <div>
                <p style="font-size: 24px; font-weight: bold; color: #2563eb;">${Math.round(result.maxPossibleScore)}</p>
                <p style="color: #4a5568;">Pontuação Máxima</p>
              </div>
              <div>
                <p style="font-size: 24px; font-weight: bold; color: #2563eb;">${Math.round(result.percentageScore)}%</p>
                <p style="color: #4a5568;">Percentual Atingido</p>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 40px;">
          <h3 style="font-size: 20px; font-weight: bold; color: #1a1a1a; margin-bottom: 20px;">Pontuação por Pilar</h3>
          <div style="display: grid; gap: 20px;">
            ${result.pillarScores.map(pillar => `
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <h4 style="font-size: 16px; font-weight: bold; color: #1a1a1a;">${pillar.pillarName}</h4>
                  <p style="color: #4a5568;">${Math.round(pillar.score)} / ${pillar.maxPossibleScore} pontos</p>
                </div>
                <div style="width: 100%; height: 8px; background-color: #e2e8f0; border-radius: 4px; overflow: hidden;">
                  <div style="width: ${pillar.percentageScore}%; height: 100%; background-color: #2563eb;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="position: absolute; bottom: 40px; width: calc(100% - 80px);">
          <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
            <p style="color: #4a5568; font-size: 14px;">© ${new Date().getFullYear()} DC ADVISORS. Todos os direitos reservados.</p>
            <p style="color: #4a5568; font-size: 14px;">Relatório gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(content);

    try {
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
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