import { createClient } from '@supabase/supabase-js'

function env(name: string): string | undefined {
  const v = import.meta.env[name] as string | undefined
  const t = v?.trim()
  return t || undefined
}

const url = env('VITE_SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL')
/** Solo el JWT «anon public» (empieza por eyJ). `sb_publishable_…` no vale para esta API → Invalid API key. */
const anonKey =
  env('VITE_SUPABASE_ANON_KEY') ||
  env('NEXT_PUBLIC_SUPABASE_ANON_KEY')

export const supabase = url && anonKey ? createClient(url, anonKey) : null

/** Nombres de variables que faltan (para mensajes en UI). No incluye secretos. */
export function missingSupabaseEnvVars(): string[] {
  const m: string[] = []
  if (!url) m.push('VITE_SUPABASE_URL')
  if (!anonKey) m.push('VITE_SUPABASE_ANON_KEY (JWT eyJ…; no sb_publishable / publishable)')
  return m
}
