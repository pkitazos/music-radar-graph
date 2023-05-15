import { albumIDs } from "~/data/albumIDs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const adminRouter = createTRPCRouter({
  addFeatureAlbums: publicProcedure.mutation(async ({ ctx }) => {
    let fieldNames = [
      "(underrated)",
      "Strum Strum",
      "Depression",
      "We Live in a Society",
      "Bleep Bloop",
      "Anxiety",
    ];
    let featuredAlbums = albumIDs.map(async (album) => {
      await ctx.prisma.media.create({
        data: { mediaID: album.id },
      });

      return await ctx.prisma.graphTemplate.create({
        data: {
          mediaID: album.id,
          maxValue: 10,
          visibility: "PUBLIC",
          templateFields: {
            create: fieldNames.map((fieldName, i) => {
              return { name: fieldName, fieldIndex: i };
            }),
          },
          ownerID: ctx.session!.user.id,
          featured: true,
        },
      });
    });

    // const featuredAlbums = await ctx.prisma.graphTemplate.createMany({
    //   data: albumIDs.map((album) => {
    //     return {};
    //   }),
    // });

    return featuredAlbums;
  }),
});

export default adminRouter;