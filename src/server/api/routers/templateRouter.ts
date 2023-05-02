import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const templateRouter = createTRPCRouter({
  getTemplateAverage: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: templateID }) => {
      let fields = await ctx.prisma.fieldTemplate.findMany({
        where: {
          graphTemplateID: templateID,
        },
      });

      return fields.reduce(async (acc, val) => {
        return {
          ...acc,
          [val.name]:
            (
              await ctx.prisma.fieldInstance.aggregate({
                _avg: {
                  value: true,
                },
                where: {
                  fieldID: val.ID,
                },
              })
            )._avg.value || 5,
        };
      }, {}) as Record<string, number>;
    }),
});
