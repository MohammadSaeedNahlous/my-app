import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define NextAuth configuration
export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // Add authentication providers here
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      // this funtion is called when user tries to sign in
      // the credentials object contains the email and password
      async authorize(credentials, request) {
        if (credentials == null) return null;
        // Find the user with the given email in the database
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        // Check if user exists and password matches
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          // if password matches, return the user object
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
          // if password does not match return null
          return null;
        }
        // ensure null is returned instead of undefined
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user, trigger, token }: any) {
      // set the user Id from the token
      // sub is a standard JWT claim that contains the user ID
      session.user.id = token.sub;

      // if theres a trigger called "update" we update the session data
      if (trigger === 'update') {
        session.user.name = token.name;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

// Initialize NextAuth with the configuration
export const { handlers, auth, signIn, signOut } = NextAuth(config);
