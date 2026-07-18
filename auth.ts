import { randomBytes } from "node:crypto";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isAuthConfigured } from "@/lib/env";

const providers = [];
const developmentSecret =
  process.env.NODE_ENV === "development"
    ? randomBytes(32).toString("base64url")
    : undefined;

if (isAuthConfigured()) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? developmentSecret,
  callbacks: {
    authorized({ auth: session, request }) {
      const path = request.nextUrl.pathname;
      const isProtected =
        path.startsWith("/dashboard") || path.startsWith("/api/me");
      if (!isProtected) return true;
      return !!session?.user;
    },
  },
});
