import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ERoutes } from "@/enums/routes.enum";
import { axiosInstance } from "@/lib/axios";

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "text", type: "text", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials.password) return null;
          const res = await axiosInstance.post("/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (user && user.ok) {
            return user as User;
          } else {
            return null;
          }
        } catch (err) {
          throw new Error("Next Auth - Authorize: Authentication error");
        }
      },
    }),
  ],
  pages: {
    signIn: ERoutes.Auth,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
};
