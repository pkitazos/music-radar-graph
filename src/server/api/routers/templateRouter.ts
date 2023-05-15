import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const templateRouter = createTRPCRouter({
  getGraphTemplate: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: templateID }) => {
      const graphTemplate = await ctx.prisma.graphTemplate.findFirstOrThrow({
        where: {
          ID: templateID,
        },
      });

      return graphTemplate;
    }),

  createGraphTemplate: publicProcedure
    .input(
      z.object({
        mediaID: z.string(),
        fieldNames: z.array(z.string()),
        maxRating: z.number(),
        visibility: z.enum(["PUBLIC", "PRIVATE", "UNLISTED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const graphTemplate = await ctx.prisma.graphTemplate.create({
        data: {
          mediaID: input.mediaID,
          maxValue: input.maxRating,
          visibility: input.visibility,
          ownerID: ctx.session!.user.id,
          templateFields: {
            create: [
              ...input.fieldNames.map((fieldName, i) => {
                return { name: fieldName, fieldIndex: i };
              }),
            ],
          },
        },
      });

      return graphTemplate;
    }),

  getGraphTemplateFieldNames: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: templateID }) => {
      let fields = await ctx.prisma.fieldTemplate.findMany({
        where: {
          graphTemplateID: templateID,
        },
      });
      return fields.map((field) => field.name);
    }),

  getGraphTemplateAverage: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: templateID }) => {
      let fields = await ctx.prisma.fieldTemplate.findMany({
        where: {
          graphTemplateID: templateID,
        },
      });
      const sortedFields = fields.sort((item) => item.fieldIndex);

      return sortedFields.reduce(async (acc, val) => {
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

export default templateRouter;
