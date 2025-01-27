import React from 'react';
import { FileDown } from 'lucide-react';
import type { DiagnosticResult } from '../types/diagnostic';

interface ExportPDFProps {
  result: DiagnosticResult;
}

function ExportPDF({ result }: ExportPDFProps) {
  const handleExport = () => {
    // Aqui será implementada a lógica de exportação do PDF
    console.log('Exportando PDF para:', result);
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