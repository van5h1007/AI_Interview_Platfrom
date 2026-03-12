import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { prisma } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    })
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt", // Use JWT instead of database sessions
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "github" && user.email) {

          await prisma.user.upsert({
            where: { email: user.email },
            update: {
              name: user.name || profile?.name || 'GitHub User',
              image: (user.image || profile?.avatar_url || null) as string | null,
              updatedAt: new Date(),
            },
            create: {
              email: user.email,
              name: user.name || profile?.name || 'GitHub User',
              image: (user.image || profile?.avatar_url || null) as string | null,
              location: 'Not specified',
              bio: 'No bio available',
              skills: []
            }
          });
          
        }
        return true;
      } catch (error) {
        console.error('Error creating/updating user on sign in:', error);
        return true;
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.email) {

        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email as string },
            select: { id: true }
          });
          
          return {
            ...session,
            user: {
              ...session.user,
              id: dbUser?.id || token.id as string,
            },
          };
        } catch (error) {
          console.error('Error fetching user in session callback:', error);
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id as string,
            },
          };
        }
      }
      return session;
    },
  },
})