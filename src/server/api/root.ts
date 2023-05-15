import {
  accountRouter,
  instanceRouter,
  templateRouter,
  spotifyRouter,
} from "~/server/api/routers";
import { createTRPCRouter } from "~/server/api/trpc";
import adminRouter from "./routers/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  adminRouter,
  accountRouter,
  instanceRouter,
  templateRouter,
  spotifyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
