import { createClient, SupabaseClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    flowType: 'pkce',
    persistSession: false,
    detectSessionInUrl: false,
    autoRefreshToken: false
  }
});