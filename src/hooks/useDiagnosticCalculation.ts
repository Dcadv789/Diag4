import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { DiagnosticResult, CompanyData, Pillar, PillarScore } from '../types/diagnostic';

export function useDiagnosticCalculation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DiagnosticResult[]>([]);

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('diagnostic_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateScore = useCallback((answers: Record<string, string>, pillars: Pillar[]): {
    pillarScores: PillarScore[];
    totalScore: number;
    maxPossibleScore: number;
    percentageScore: number;
  } => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    const pillarScores = pillars.map(pillar => {
      let pillarScore = 0;
      let pillarMaxScore = 0;

      pillar.questions.forEach(question => {
        const answer = answers[question.id];
        pillarMaxScore += question.points;

        if (answer === question.positiveAnswer) {
          pillarScore += question.points;
        } else if (answer === 'PARCIALMENTE') {
          pillarScore += question.points / 2;
        }
      });

      totalScore += pillarScore;
      maxPossibleScore += pillarMaxScore;

      return {
        pillarId: pillar.id,
        pillarName: pillar.name,
        score: pillarScore,
        maxPossibleScore: pillarMaxScore,
        percentageScore: (pillarScore / pillarMaxScore) * 100
      };
    });

    return {
      pillarScores,
      totalScore,
      maxPossibleScore,
      percentageScore: (totalScore / maxPossibleScore) * 100
    };
  }, []);

  const saveDiagnosticResult = useCallback(async (
    companyData: CompanyData,
    answers: Record<string, string>,
    pillars: Pillar[]
  ) => {
    try {
      setLoading(true);
      const { pillarScores, totalScore, maxPossibleScore, percentageScore } = calculateScore(answers, pillars);

      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('User not authenticated');

      const result: Omit<DiagnosticResult, 'id' | 'date'> = {
        companyData,
        answers,
        pillarScores,
        totalScore,
        maxPossibleScore,
        percentageScore
      };

      const { data, error } = await supabase
        .from('diagnostic_results')
        .insert([{
          user_id: user.id,
          company_data: companyData,
          answers,
          pillar_scores: pillarScores,
          total_score: totalScore,
          max_possible_score: maxPossibleScore,
          percentage_score: percentageScore
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchResults();
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [calculateScore, fetchResults]);

  return {
    results,
    loading,
    error,
    calculateScore,
    saveDiagnosticResult,
    fetchResults
  };
}