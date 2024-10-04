'use client'

import { loginWithGoogle } from '@/libs/action/oauth';
import React from 'react';

export default function GoogleAuth() {
  const handleLogin = async () => {
    const response = await loginWithGoogle();
    if (response) {
      console.log('Login successful:', response);
      // Optionally handle user state here
    }
  };

  return (
    <div>
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Log in with Google
      </button>
    </div>
  );
}
