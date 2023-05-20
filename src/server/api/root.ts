import { campaignRouter } from "./routers/campaigns";
import { questRouter } from "./routers/quests";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  campaign: campaignRouter,
  quest: questRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
