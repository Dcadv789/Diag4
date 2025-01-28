import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useStorage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadLogo = useCallback(async (file: File, type: 'logo' | 'navbar_logo') => {
    try {
      setLoading(true);
      
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}_${Math.random()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(filePath);

      // Update settings
      const { error: updateError } = await supabase
        .from('settings')
        .update({ [type]: publicUrl })
        .eq('id', (await supabase.from('settings').select('id').single()).data?.id);

      if (updateError) throw updateError;

      return publicUrl;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeLogo = useCallback(async (type: 'logo' | 'navbar_logo') => {
    try {
      setLoading(true);
      
      // Get current logo URL
      const { data: settings } = await supabase
        .from('settings')
        .select(type)
        .single();

      if (settings && settings[type]) {
        // Extract file path from URL
        const filePath = settings[type].split('/').pop();
        
        // Remove from storage
        await supabase.storage
          .from('logos')
          .remove([`logos/${filePath}`]);
      }

      // Update settings
      const { error: updateError } = await supabase
        .from('settings')
        .update({ [type]: null })
        .eq('id', (await supabase.from('settings').select('id').single()).data?.id);

      if (updateError) throw updateError;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    uploadLogo,
    removeLogo
  };
}