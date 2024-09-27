import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: (profile) => {
        return {
          id: profile.id, // Ensure to include the provider's user ID
          provider_name: profile.provider, // Adjust accordingly
          provider_account_id: profile.sub, // Google account ID
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
          avatar: profile.picture,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Ensure the user's ID is included in the session
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Ensure the user's ID is included in the JWT
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
