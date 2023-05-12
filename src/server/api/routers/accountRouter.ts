import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAccessToken, fetchProfile } from "~/utils";

export const accountRouter = createTRPCRouter({
  getAccessToken: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) return;

    return await getAccessToken({ ctx });
  }),

  getSpotifyProfile: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) throw new Error("User not signed in.");

    let userAccount = await ctx.prisma.account.findFirstOrThrow({
      where: {
        userId: ctx.session.user.id,
      },
    });

    if (!userAccount.access_token) {
      throw new Error("Access Token is broken or some shit.");
    }

    let spotifyProfile = await fetchProfile(userAccount.access_token);

    return spotifyProfile;
  }),
});
