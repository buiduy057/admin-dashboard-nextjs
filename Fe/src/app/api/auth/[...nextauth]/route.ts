/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "login",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) return null;
        if (!credentials || !credentials.password) return null;
        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log('aa')
      if (user) token.role = (user as any).role;
      return token;
    },
    session: async ({ session, token }) => {
      (session.user as any).role = token.role as Role;
      console.log('aa')

      return session;
    },
  },
});

export { handler as GET, handler as POST };

