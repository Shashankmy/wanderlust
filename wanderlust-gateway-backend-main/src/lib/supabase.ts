
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from your project's API settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vyozztclqdavbnurspjp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5b3p6dGNscWRhdmJudXJzcGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExNDQ3MTMsImV4cCI6MTk5NjcyMDcxM30.2k8ym_Qq4VT0U0YnMDBnQnjN12FQwwJKtLf_JpYJmcQ';

/**
 * IMPORTANT: Edge Functions Deployment
 * 
 * The Edge Functions code in src/api/edgeFunctions folder needs to be deployed separately
 * to Supabase using the Supabase CLI with commands like:
 * 
 * supabase functions deploy inquiries
 * supabase functions deploy destinations
 * 
 * Once deployed, set VITE_USE_EDGE_FUNCTIONS=true and VITE_EDGE_FUNCTION_URL to your
 * Supabase project's Functions URL (https://[YOUR_PROJECT_REF].supabase.co/functions/v1)
 */

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// For backend operations, often using server-side with service role
export const createServiceClient = (serviceRoleKey: string) => {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    }
  });
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      destinations: {
        Row: {
          id: string
          name: string
          country: string
          description: string
          short_description: string
          image_url: string
          rating: number
          activities: string[]
          price: number
          currency: string
          continent: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          country: string
          description: string
          short_description: string
          image_url: string
          rating: number
          activities: string[]
          price: number
          currency: string
          continent: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          country?: string
          description?: string
          short_description?: string
          image_url?: string
          rating?: number
          activities?: string[]
          price?: number
          currency?: string
          continent?: string
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          name: string
          email: string
          destination: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          destination: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          destination?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}
