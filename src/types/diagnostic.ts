export interface CompanyData {
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

export interface DiagnosticResult {
  id: string;
  user_id: string;
  date: string;
  companyData: CompanyData;
  answers: Record<string, string>;
  pillarScores: PillarScore[];
  totalScore: number;
  maxPossibleScore: number;
  percentageScore: number;
}

export interface PillarScore {
  pillarId: number;
  pillarName: string;
  score: number;
  maxPossibleScore: number;
  percentageScore: number;
}

export interface Question {
  id: string;
  text: string;
  points: number;
  positiveAnswer: 'SIM' | 'NÃO';
  answerType: 'BINARY' | 'TERNARY';
  order?: number;
}

export interface Pillar {
  id: number;
  name: string;
  order?: number;
  questions: Question[];
}

export interface Settings {
  id: string;
  logo: string | null;
  navbar_logo: string | null;
  created_at: string;
  updated_at: string;
}