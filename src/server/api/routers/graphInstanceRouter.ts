import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const graphInstanceRouter = createTRPCRouter({
  getGraphInstance: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: instanceID }) => {
      const graphInstance = await ctx.prisma.graphInstance.findFirstOrThrow({
        where: {
          ID: instanceID,
        },
      });

      return graphInstance;
    }),

  createGraphInstance: publicProcedure
    .input(
      z.object({ graphTemplateID: z.string(), ratings: z.array(z.number()) })
    )
    .mutation(async ({ ctx, input }) => {
      const fields = await ctx.prisma.fieldTemplate.findMany({
        where: {
          graphTemplateID: input.graphTemplateID,
        },
      });

      const sortedFields = fields.sort((item) => item.fieldIndex);

      const getMediaID = await ctx.prisma.graphTemplate.findUniqueOrThrow({
        where: { ID: input.graphTemplateID },
        select: { mediaID: true },
      });

      const graphInstance = await ctx.prisma.graphInstance.create({
        data: {
          graphTemplateID: input.graphTemplateID,
          mediaID: getMediaID.mediaID,
          values: {
            create: [
              ...input.ratings.map((value, i) => {
                return { value: value, fieldID: sortedFields[i]!.ID };
              }),
            ],
          },
        },
      });
      return graphInstance;
    }),
});

export default graphInstanceRouter;
