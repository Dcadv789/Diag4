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
      <div style="background-color: #0030b9; padding: 40px; font-family: Arial, sans-serif; min-height: 1080px; position: relative;">
        <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px; margin-bottom: 40px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
            <div>
              <h1 style="font-size: 32px; font-weight: bold; color: white; margin-bottom: 10px;">Relatório de Diagnóstico Digital</h1>
              <p style="font-size: 18px; color: rgba(255, 255, 255, 0.8);">${new Date(result.date).toLocaleDateString('pt-BR')}</p>
            </div>
            <div style="text-align: right;">
              <h2 style="font-size: 28px; font-weight: bold; color: white;">DC ADVISORS</h2>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin-bottom: 40px;">
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 24px; border-radius: 12px;">
              <h3 style="font-size: 20px; font-weight: bold; color: white; margin-bottom: 20px;">Informações da Empresa</h3>
              <div style="display: grid; gap: 12px;">
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Empresa:</strong> ${result.companyData.empresa}</p>
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">CNPJ:</strong> ${result.companyData.cnpj}</p>
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Responsável:</strong> ${result.companyData.nome}</p>
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Funcionários:</strong> ${result.companyData.numeroFuncionarios}</p>
              </div>
            </div>
            <div style="background-color: rgba(255, 255, 255, 0.1); padding: 24px; border-radius: 12px;">
              <h3 style="font-size: 20px; font-weight: bold; color: white; margin-bottom: 20px;">Dados do Negócio</h3>
              <div style="display: grid; gap: 12px;">
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Segmento:</strong> ${result.companyData.segmento}</p>
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Localização:</strong> ${result.companyData.localizacao}</p>
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Tempo de Atividade:</strong> ${result.companyData.tempoAtividade}</p>
                <p style="color: rgba(255, 255, 255, 0.9);"><strong style="color: white;">Forma Jurídica:</strong> ${result.companyData.formaJuridica}</p>
              </div>
            </div>
          </div>

          <div style="background-color: rgba(255, 255, 255, 0.1); padding: 24px; border-radius: 12px; margin-bottom: 40px;">
            <h3 style="font-size: 20px; font-weight: bold; color: white; margin-bottom: 20px;">Pontuação Geral</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; text-align: center;">
              <div style="background-color: rgba(255, 255, 255, 0.1); padding: 24px; border-radius: 8px;">
                <p style="font-size: 32px; font-weight: bold; color: white; margin-bottom: 8px;">${Math.round(result.totalScore)}</p>
                <p style="color: rgba(255, 255, 255, 0.8);">Pontuação Total</p>
              </div>
              <div style="background-color: rgba(255, 255, 255, 0.1); padding: 24px; border-radius: 8px;">
                <p style="font-size: 32px; font-weight: bold; color: white; margin-bottom: 8px;">${Math.round(result.maxPossibleScore)}</p>
                <p style="color: rgba(255, 255, 255, 0.8);">Pontuação Máxima</p>
              </div>
              <div style="background-color: rgba(255, 255, 255, 0.1); padding: 24px; border-radius: 8px;">
                <p style="font-size: 32px; font-weight: bold; color: white; margin-bottom: 8px;">${Math.round(result.percentageScore)}%</p>
                <p style="color: rgba(255, 255, 255, 0.8);">Percentual Atingido</p>
              </div>
            </div>
          </div>

          <div style="background-color: rgba(255, 255, 255, 0.1); padding: 24px; border-radius: 12px;">
            <h3 style="font-size: 20px; font-weight: bold; color: white; margin-bottom: 20px;">Pontuação por Pilar</h3>
            <div style="display: grid; gap: 16px;">
              ${result.pillarScores.map(pillar => `
                <div style="background-color: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h4 style="font-size: 18px; font-weight: bold; color: white;">${pillar.pillarName}</h4>
                    <p style="color: rgba(255, 255, 255, 0.8);">${Math.round(pillar.score)} / ${pillar.maxPossibleScore} pontos</p>
                  </div>
                  <div style="width: 100%; height: 8px; background-color: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
                    <div style="width: ${pillar.percentageScore}%; height: 100%; background-color: white;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="position: absolute; bottom: 40px; left: 40px; right: 40px;">
          <div style="border-top: 2px solid rgba(255, 255, 255, 0.1); padding-top: 20px; display: flex; justify-content: space-between; align-items: center;">
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">© ${new Date().getFullYear()} DC ADVISORS. Todos os direitos reservados.</p>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">Relatório gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
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