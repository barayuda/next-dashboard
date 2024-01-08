import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        else session.user.token = token;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
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
      authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        const user = {id: "1", name: "udin", email: "udin@testing.com", password: "161ebd7d45089b3446ee4e0d86dbcf92" };

        const res = {
          id: user.id, 
          email: "udin@testing.com",
          accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJ1ZGluIiwicm9sZXMiOlsiT1dORVIiXSwiZW1haWwiOiJ1ZGluQGdtYWlsLmNvbSIsImF2YXRhciI6Ii9hc3NldHMvaW1nL3RlYW0tMS04MDB4ODAwLmpwZyIsImlkIjoiNjUxZjc0ZTdjNmZmNjY5ODA1ZmI3MTFkIn0sImlhdCI6MTcwMzE0NjY4OSwiZXhwIjoxNzAzMTQ3NTg5fQ.VG7f36PRt7Rycpl6PVbmv9_5j_LKBaj3RGER3oE8KnE",
          refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidWRpbkBnbWFpbC5jb20ifSwiaWF0IjoxNzAzMTQ2Njg5LCJleHAiOjIzMDc5NDY2ODl9.H0VyHo9JDWK1KM4krdvvbs_Tmt0bp5SlqECkZQUQpeA"
        };

        if (user.email === email && user.password === password) {
          return res
        } else {
          return null;
        }
        
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
