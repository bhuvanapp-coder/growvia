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

export async function publishOpportunity(opportunity) {
  if (!supabase) return { data: opportunity, error: null, demo: true }
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: opportunity, error: null, demo: true }
  const { data, error } = await supabase.from('opportunities').insert({
    ...opportunity,
    organizer_id: user.id,
    required_skills: opportunity.requiredSkills,
    registration_url: opportunity.registrationUrl,
    published_at: new Date().toISOString(),
  }).select().single()
  return { data, error, demo: false }
}

export async function loadReminderIds() {
  if (!supabase) return { data: [], error: null, demo: true }
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: [], error: null, demo: true }
  const { data, error } = await supabase.from('reminders').select('opportunity_id').eq('user_id', user.id)
  return { data: (data || []).map((row) => row.opportunity_id), error, demo: false }
}

export async function saveReminder(opportunity) {
  if (!supabase) return { data: opportunity, error: null, demo: true }
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: opportunity, error: null, demo: true }
  const { data, error } = await supabase.from('reminders').upsert({
    user_id: user.id,
    opportunity_id: opportunity.id,
    reminder_at: opportunity.deadline,
  }, { onConflict: 'user_id,opportunity_id', ignoreDuplicates: true }).select().single()
  return { data, error, demo: false }
}

export async function removeReminder(opportunityId) {
  if (!supabase) return { data: null, error: null, demo: true }
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: null, demo: true }
  const { data, error } = await supabase.from('reminders').delete().eq('user_id', user.id).eq('opportunity_id', opportunityId)
  return { data, error, demo: false }
}