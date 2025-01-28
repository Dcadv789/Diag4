import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

interface Settings {
  logo?: string;
  navbarLogo?: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const settingsRef = doc(db, 'settings', 'logos');
    
    const unsubscribe = onSnapshot(settingsRef, (doc) => {
      try {
        if (doc.exists()) {
          setSettings(doc.data() as Settings);
        }
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar configurações:', err);
        setError('Erro ao carregar configurações');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const settingsRef = doc(db, 'settings', 'logos');
      await setDoc(settingsRef, newSettings, { merge: true });
    } catch (err) {
      console.error('Erro ao atualizar configurações:', err);
      throw new Error('Erro ao atualizar configurações');
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings
  };
}