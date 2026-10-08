import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fwtxguwiaximrhtogdcd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dHhndXdpYXhpbXJodG9nZGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0Mjg0MDIsImV4cCI6MjEwNzAwNDQwMn0.yoJmzF443M7oDRgUUrWVVSxOszaubTlHTSxtFodeURY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteContentItem {
  id: string;
  section: string;
  key_name: string;
  title: string | null;
  content: string;
  extra_data?: Record<string, any>;
  updated_at?: string;
}
