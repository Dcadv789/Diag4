import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = 'https://buoseiyuiwpcdztpgvky.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1b3NlaXl1aXdwY2R6dHBndmt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwODcyOTUsImV4cCI6MjA1MzY2MzI5NX0.Y53RuWMARLoXS1Wz7gvOu82vwDE86UcAnPnFvfyJgSs';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);