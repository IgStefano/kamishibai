import { ActivityStatus } from "@/src/types/shared.types";
import {
  createTRPCRouter,
  gameMasterProcedure,
  protectedProcedure,
} from "../trpc";
import { z } from "zod";
import { questMapper } from "./mappers";

export const questRouter = createTRPCRouter({
  newQuest: protectedProcedure
    .input(
      z.object({
        questName: z.string().min(5).max(64),
        description: z.string().min(3).max(1280).optional(),
        nextObjective: z.object({
          activityName: z.string().min(5).max(64),
          activityStatus: z
            .enum(["success", "failure", "in_progress", "not_started"])
            .default("in_progress"),
        }),
        activities: z
          .array(
            z.object({
              activityName: z.string().min(5).max(64),
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
        reward: z.string().min(3).max(64).optional(),
        campaignId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.quest.create({
        data: {
          name: input.questName,
          description: input.description,
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
          nextObjective: input.nextObjective.activityName,
          campaignId: input.campaignId,
        },
      });
    }),

  editQuest: gameMasterProcedure
    .input(
      z.object({
        questId: z.string(),
        questName: z.string().min(5).max(64).optional(),
        description: z.string().min(3).max(128).optional(),
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
        campaignId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.quest.update({
        where: {
          id: input.questId,
        },
        data: {
          name: input.questName,
          description: input.description,
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
        questId: z.string(),
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
      const quests = await ctx.prisma.quest.findMany({
        include: {
          activities: true,
          campaign: true,
        },
        where: {
          status: 1,
        },
        take: 10,
        skip: 10 * (input.page - 1),
      });
      return quests.map((quest) => questMapper(quest));
    }),
});
