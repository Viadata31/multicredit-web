
// import { createClient } from "@supabase/supabase-js";
// import type { Database } from "./types";

// const SUPABASE_URL = "https://ynummkcgjehqboxfrfyf.supabase.co";

// const SUPABASE_ANON_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludW1ta2NnamVocWJveGZyZnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyODE2ODUsImV4cCI6MjEwMzg1NzY4NX0.AS9O0t3UTD7zIO5h8kkU9m3lzuGtHXuUPbOSLyQq-ZQ";

// export const supabase = createClient<Database>(
//   SUPABASE_URL,
//   SUPABASE_ANON_KEY,
// );



import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);