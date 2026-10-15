import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avogznwmvftprsszyvim.supabase.co';
const supabaseKey = 'sb_publishable_VY8z3xAyo08Y8HZNSQp41g_ukYk6Gd7';

export const supabase = createClient(supabaseUrl, supabaseKey);