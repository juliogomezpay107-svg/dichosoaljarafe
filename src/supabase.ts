import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oopnueiikywrzcahzgno.supabase.co";
const supabaseAnonKey = "sb_publishable_h12JGUMgn9_-wYqIJ511Qw_TKbTWQIc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
