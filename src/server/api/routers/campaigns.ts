import {
  createTRPCRouter,
  gameMasterProcedure,
  protectedProcedure,
} from "../trpc";
import { z } from "zod";

export const campaignRouter = createTRPCRouter({
  newCampaign: protectedProcedure
    .input(
      z.object({
        campaignName: z.string().min(5).max(64),
        campaignImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.campaign.create({
        data: {
          gameMaster: ctx.session.user.id,
          image: input.campaignImage,
          name: input.campaignName,
        },
      });
    }),

  editCampaign: gameMasterProcedure
    .input(
      z.object({
        campaignId: z.string().cuid(),
        gameMaster: z.string().cuid(),
        campaignName: z.string().min(5).max(64),
        campaignImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.campaign.update({
        where: {
          id: input.campaignId,
        },
        data: {
          image: input.campaignImage,
          name: input.campaignName,
        },
      });
    }),

  // create procedure to soft delete campaigns
  deleteCampaign: gameMasterProcedure
    .input(
      z.object({
        campaignId: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.campaign.update({
        where: {
          id: input.campaignId,
        },
        data: {
          status: 0,
        },
      });
    }),

  // create procedure to list campaigns, with pagination
  getCampaigns: protectedProcedure
    .input(z.object({ page: z.number().default(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.campaign.findMany({
        where: {
          status: 1,
        },
        take: 10,
        skip: 10 * (input.page - 1),
      });
    }),
});
