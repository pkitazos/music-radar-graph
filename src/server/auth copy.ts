/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { fetchAccessToken } from "~/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async session({ session: existingSession, user }) {
      if (!existingSession || !user) {
        return existingSession;
      }
      try {
        const spotifyAccount = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            accounts: true,
          },
        });

        // Create a new session object with all the information we need
        const session = {
          id: spotifyAccount!.id,
          name: spotifyAccount!.name,
          avatar: spotifyAccount!.image,
          account: spotifyAccount!.accounts[0]!.providerAccountId,
          token: spotifyAccount!.accounts[0]!.access_token,
        };

        // Prepare some data to check if the token is about to expire or has expired
        const now = Math.floor(Date.now() / 1000);
        const timeDiff = Math.floor(
          (spotifyAccount!.accounts[0]!.expires_at! - now) / 60
        );
        const refreshToken = spotifyAccount!.accounts[0]!.refresh_token!;
        console.log(`Token still active for ${timeDiff} minutes.`);

        // If the token is older than 50 minutes, fetch a new one
        if (timeDiff <= 10) {
          console.log("Token expired, fetching new one...");
          const request = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                  `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
                ).toString("base64")}`,
              },
              body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
              cache: "no-cache",
            }
          );

          if (request.ok) {
            const { access_token, expires_in, refresh_token } = await request
              .json()
              .then((res) => console.log(res))
              .then((res) => fetchAccessToken.parse(res));

            const timestamp = Math.floor(
              (Date.now() + expires_in * 1000) / 1000
            );

            console.log(`New access token: ${access_token}`);

            await prisma.account.update({
              where: {
                provider_providerAccountId: {
                  provider: "spotify",
                  providerAccountId: session.account,
                },
              },
              data: {
                access_token,
                expires_at: timestamp,
                refresh_token,
              },
            });

            session.token = access_token;
          } else {
            console.error(
              `Failed to refresh token: ${request.status} ${request.statusText}`
            );
          }
        }
        return { ...session, ...existingSession };
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.error(`Failed to fetch session: ${error}`);
        return existingSession;
      }
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
