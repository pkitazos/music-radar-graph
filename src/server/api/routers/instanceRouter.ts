/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const instanceRouter = createTRPCRouter({
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

  upsertGraphInstance: publicProcedure
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

      const { mediaID } = await ctx.prisma.graphTemplate.findUniqueOrThrow({
        where: { ID: input.graphTemplateID },
        select: { mediaID: true },
      });

      const data = {
        graphTemplateID: input.graphTemplateID,
        mediaID,
        values: {
          create: [
            ...input.ratings.map((value, i) => {
              return { value: value, fieldID: sortedFields[i]!.ID };
            }),
          ],
        },
      };

      const graphInstance = await ctx.prisma.graphInstance.upsert({
        where: {
          instanceIdentifier: {
            graphTemplateID: input.graphTemplateID,
            submitterID: ctx.session!.user.id,
          },
        },
        create: data,
        update: data,
      });
      return graphInstance;
    }),
});

export default instanceRouter;
