import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = Boolean(supabase)

export async function saveOpportunityDNA(profile) {
  if (!supabase) return { data: profile, error: null, demo: true }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: profile, error: null, demo: true }

  const { data, error } = await supabase.from('profiles').upsert({
    id: user.id,
    opportunity_dna: profile,
    updated_at: new Date().toISOString(),
  }).select().single()

  return { data, error, demo: false }
}