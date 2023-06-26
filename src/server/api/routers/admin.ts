/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { albumIDs } from "~/data/albumIDs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const adminRouter = createTRPCRouter({
  addFeatureAlbums: publicProcedure.mutation(({ ctx }) => {
    const fieldNames = [
      "(underrated)",
      "Strum Strum",
      "Depression",
      "We Live in a Society",
      "Bleep Bloop",
      "Anxiety",
    ];
    const featuredAlbums = albumIDs.map(async (album) => {
      await ctx.prisma.media.create({
        data: { mediaID: album.id, name: album.name, imageURL: album.imageURL },
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

    return featuredAlbums;
  }),

  addFirstInstance: publicProcedure.mutation(async ({ ctx }) => {
    const graphTemplates = await ctx.prisma.graphTemplate.findMany({
      where: {
        featured: true,
      },
    });

    return graphTemplates.map(async (template) => {
      const fieldTemplates = await ctx.prisma.fieldTemplate.findMany({
        where: {
          graphTemplateID: template.ID,
        },
      });

      return await ctx.prisma.graphInstance.create({
        data: {
          mediaID: template.mediaID,
          graphTemplateID: template.ID,
          values: {
            create: fieldTemplates.map((field) => {
              return {
                fieldID: field.ID,
                value: 5,
              };
            }),
          },
        },
      });
    });
  }),
});

export default adminRouter;
