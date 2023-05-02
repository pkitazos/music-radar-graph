import { accountRouter } from "~/server/api/routers/accountRouter";
import { templateRouter } from "~/server/api/routers/templateRouter";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  templateRouter,
  accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
