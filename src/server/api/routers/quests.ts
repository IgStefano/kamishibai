import {
  createTRPCRouter,
  gameMasterProcedure,
  protectedProcedure,
} from "../trpc";
import { z } from "zod";

enum ActivityStatus {
  "not_started" = 0,
  "in_progress" = 1,
  "success" = 2,
  "failure" = 3,
}

export const questRouter = createTRPCRouter({
  newQuest: protectedProcedure
    .input(
      z.object({
        questName: z.string().min(5).max(64),
        activities: z
          .array(
            z.object({
              activityName: z.string().min(5).max(32),
              activityStatus: z.enum([
                "success",
                "failure",
                "in_progress",
                "not_started",
              ]),
            })
          )
          .min(1),
        recommendedLevel: z.number().min(1).optional(),
        isVisible: z.boolean().optional(),
        reward: z.string().min(3).max(32).optional(),
        campaignId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.quest.create({
        data: {
          name: input.questName,
          activities: {
            createMany: {
              data: input.activities.map((activity) => {
                return {
                  name: activity.activityName,
                  status: ActivityStatus[activity.activityStatus],
                };
              }),
            },
          },
          isVisible: input.isVisible || true,
          reward: input.reward,
          recommendedLevel: input.recommendedLevel,
          nextObjective: input.activities[0]?.activityName,
          campaignId: input.campaignId,
        },
      });
    }),

  editQuest: gameMasterProcedure
    .input(
      z.object({
        questId: z.string().cuid(),
        questName: z.string().min(5).max(64).optional(),
        activities: z
          .array(
            z.object({
              activityName: z.string().min(5).max(32),
              activityStatus: z.enum([
                "success",
                "failure",
                "in_progress",
                "not_started",
              ]),
            })
          )
          .min(1),
        recommendedLevel: z.number().min(1).optional(),
        isVisible: z.boolean().optional(),
        reward: z.string().min(3).max(32).optional(),
        campaignId: z.string().cuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.quest.update({
        where: {
          id: input.questId,
        },
        data: {
          name: input.questName,
          activities: {
            createMany: {
              data: input.activities.map((activity) => {
                return {
                  name: activity.activityName,
                  status: ActivityStatus[activity.activityStatus],
                };
              }),
              skipDuplicates: true,
            },
          },
          isVisible: input.isVisible,
          reward: input.reward,
          recommendedLevel: input.recommendedLevel,
          nextObjective: input.activities[0]?.activityName,
          campaignId: input.campaignId,
        },
      });
    }),
  // create procedure to soft delete campaigns
  deleteCampaign: gameMasterProcedure
    .input(
      z.object({
        questId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.quest.update({
        where: {
          id: input.questId,
        },
        data: {
          status: 0,
        },
      });
    }),

  getQuests: protectedProcedure
    .input(z.object({ page: z.number().default(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.quest.findMany({
        where: {
          status: 1,
        },
        take: 10,
        skip: 10 * (input.page - 1),
      });
    }),
});
