import { supabase } from "@/utils/supabase/client";


export const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Login error:', error);
    return null;
  }

  return { data };
};
