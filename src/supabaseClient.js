import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmatlgpcvhvgeqiazutu.supabase.co'
const supabaseAnonKey = 'sb_publishable_2Ftop3-X7Atmo7CgmfQEUg_PEdtO0Df'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)