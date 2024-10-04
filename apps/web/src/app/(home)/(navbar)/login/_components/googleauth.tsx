'use client';

import { createCookie, navigate } from '@/libs/action/server';
import { supabase } from '@/utils/supabase/client';
import { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';

export default function GoogleAuth() {
  const onLogin = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error('Error signing out:', signOutError);
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href,
      },
    });

    if (error) {
      console.error('Google login error:', error);
    }
  };

  const handleSession = async (session: any) => {
    if (session) {
      const { user } = session;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}oauth/google`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              avatar: user.user_metadata.avatar_url || null,
              first_name: user.user_metadata.full_name || '',
            }),
          },
        )
        console.log(`Response is= `, res);
        const dat = await res.json();
        console.log(`data is:`, dat);
        createCookie('token', dat.token)
        navigate('/');
      } catch (err) {
        console.error('Error saving user to database:', err);
      }
    } else {
      console.log('No session data found.');
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        await handleSession(session);
      }
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          await handleSession(session);
        }
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [handleSession]);
  return (
    <section>
      <button
        onClick={onLogin}
        type="button"
        className="flex w-full justify-center rounded-md border border-btn py-2"
      >
        <FaGoogle className="h-8 w-8 text-black" />
      </button>
    </section>
  );
};


