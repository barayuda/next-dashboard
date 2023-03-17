/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db/client';
import { generateUsername } from '../../../utils/generateUsername';

const ROOT_API = process.env.NEXT_PUBLIC_API || '';
console.log(`ROOT_API: ${ROOT_API}`);
const API_VERSION = 'v1';
const urlSignIn = `${ROOT_API}/${API_VERSION}/auth/signin`;

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }
      return { ...token, ...user };
    },
    session({ session, token, user }) {
      if (session.user) {
        if (user !== undefined) session.user.id = user.id;
        else session.user.accessToken = token;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@company.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as any;
        const res = await fetch(urlSignIn, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();
        console.log('user', user);
        if (!res.ok) {
          throw new Error(user.message);
        } else if (res.ok && user) {
          user.status = 'ok';
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: generateUsername(profile.name),
        };
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
