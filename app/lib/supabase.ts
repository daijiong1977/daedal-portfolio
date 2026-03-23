import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../src/types/database.types'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser client (anon, RLS-enforced)
export const supabase = createClient<Database>(url, anon)

// Server-side client (same anon key — service key only needed in Edge Functions)
export const supabaseServer = createClient<Database>(url, anon, {
  auth: { persistSession: false },
})
