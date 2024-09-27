import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add the id property
    } & DefaultSession['user']; // Keep existing properties
  }
}
