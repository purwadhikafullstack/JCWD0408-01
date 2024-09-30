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
          id: profile.id, 
          provider_name: profile.provider, 
          provider_account_id: profile.sub, 
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
      session.user.id = user.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
