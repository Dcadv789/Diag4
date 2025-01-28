import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Pillar, Question } from '../types/diagnostic';

export function usePillars() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPillars = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pillars')
        .select(`
          id,
          name,
          order,
          questions (
            id,
            text,
            points,
            positive_answer,
            answer_type,
            order
          )
        `)
        .order('order');

      if (error) throw error;

      setPillars(data?.map(pillar => ({
        id: pillar.id,
        name: pillar.name,
        questions: pillar.questions.map(q => ({
          id: q.id,
          text: q.text,
          points: q.points,
          positiveAnswer: q.positive_answer,
          answerType: q.answer_type,
        }))
      })) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPillars();
  }, [fetchPillars]);

  const addPillar = async (name: string) => {
    try {
      setLoading(true);
      const { data: lastPillar } = await supabase
        .from('pillars')
        .select('order')
        .order('order', { ascending: false })
        .limit(1)
        .single();

      const newOrder = (lastPillar?.order || 0) + 1;

      const { error } = await supabase
        .from('pillars')
        .insert([{ name, order: newOrder }]);

      if (error) throw error;
      await fetchPillars();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePillar = async (pillarId: string, data: Partial<Pillar>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('pillars')
        .update({ name: data.name })
        .eq('id', pillarId);

      if (error) throw error;
      await fetchPillars();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePillar = async (pillarId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('pillars')
        .delete()
        .eq('id', pillarId);

      if (error) throw error;
      await fetchPillars();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (pillarId: string, question: Omit<Question, 'id'>) => {
    try {
      setLoading(true);
      const { data: lastQuestion } = await supabase
        .from('questions')
        .select('order')
        .eq('pillar_id', pillarId)
        .order('order', { ascending: false })
        .limit(1)
        .single();

      const newOrder = (lastQuestion?.order || 0) + 1;

      const { error } = await supabase
        .from('questions')
        .insert([{
          pillar_id: pillarId,
          text: question.text,
          points: question.points,
          positive_answer: question.positiveAnswer,
          answer_type: question.answerType,
          order: newOrder
        }]);

      if (error) throw error;
      await fetchPillars();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuestion = async (questionId: string, data: Partial<Question>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('questions')
        .update({
          text: data.text,
          points: data.points,
          positive_answer: data.positiveAnswer,
          answer_type: data.answerType
        })
        .eq('id', questionId);

      if (error) throw error;
      await fetchPillars();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (questionId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionId);

      if (error) throw error;
      await fetchPillars();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    pillars,
    loading,
    error,
    addPillar,
    updatePillar,
    deletePillar,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    fetchPillars
  };
}