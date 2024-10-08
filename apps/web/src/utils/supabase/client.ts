// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://aaglfpkxqnesorbjhvir.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZ2xmcGt4cW5lc29yYmpodmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMTM0NDQsImV4cCI6MjA0MzU4OTQ0NH0.vuM6DHfHTpnk6Jfc1UTaZ8WCXx7j3VfwxIskv_fZTd0"

export const supabase = createClient(supabaseUrl!, supabaseKey!);
