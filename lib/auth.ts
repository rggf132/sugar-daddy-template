import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from 'db'
import {
  user as userTable,
  account as accountTable,
  session as sessionTable,
} from 'db/schema'
import { eq } from 'drizzle-orm'

declare module 'next-auth' {
  interface User {
    isAdmin?: boolean | null
  }

  interface Session {
    user: {
      image?: string
      id?: string
      name?: string
      email?: string
      isAdmin?: boolean
    }
  }
}

export const authConfig = {
  debug: process.env.NODE_ENV !== 'production',
  trustHost: true,
  pages: {
    signIn: '/',
  },
  adapter: DrizzleAdapter(db, {
    usersTable: userTable as any,
    accountsTable: accountTable as any,
    sessionsTable: sessionTable as any,
  }),
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'database',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user: authUser }) {
      if (session.user !== undefined && authUser?.id) {
        session.user.id = authUser.id

        const [dbUser] = await db
          .select({ isAdmin: userTable.isAdmin })
          .from(userTable)
          .where(eq(userTable.id, authUser.id))
          .limit(1)

        session.user.isAdmin = dbUser?.isAdmin ?? false
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)
