import { createId } from "@paralleldrive/cuid2";
import {
  createTRPCRouter,
  gameMasterProcedure,
  protectedProcedure,
} from "../trpc";
import { z } from "zod";
import type { User } from "@prisma/client";
import { campaignMapper } from "./mappers";

export const campaignRouter = createTRPCRouter({
  newCampaign: protectedProcedure
    .input(
      z.object({
        campaignName: z.string().min(5).max(64),
        campaignImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newCampaignId = createId();
      const newCampaign = await ctx.prisma.campaign.create({
        data: {
          id: newCampaignId,
          gameMaster: ctx.session.user.id,
          image: input.campaignImage,
          name: input.campaignName,
        },
      });

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          campaigns: {
            connect: {
              id: newCampaignId,
            },
          },
        },
      });

      return newCampaign;
    }),

  editCampaign: gameMasterProcedure
    .input(
      z.object({
        campaignId: z.string(),
        gameMaster: z.string(),
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
        campaignId: z.string(),
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
      const rawCampaigns = await ctx.prisma.campaign.findMany({
        where: {
          status: 1,
        },
        take: 10,
        skip: 10 * (input.page - 1),
      });

      const gameMaster = await ctx.prisma.user.findFirst({
        where: {
          id: {
            equals: ctx.session.user.id,
          },
        },
      });

      const mappedCampaigns = rawCampaigns.map((campaign) => {
        return { ...campaign, gameMaster: (gameMaster as User)?.name };
      });

      return mappedCampaigns.map((campaign) => campaignMapper(campaign));
    }),

  getCampaignById: protectedProcedure
    .input(z.object({ page: z.number().default(1), id: z.string() }))
    .query(async ({ ctx, input }) => {
      const rawCampaign = await ctx.prisma.campaign.findFirst({
        where: {
          status: 1,
          id: {
            equals: input.id,
          },
        },
        take: 10,
        skip: 10 * (input.page - 1),
      });

      const gameMaster = await ctx.prisma.user.findFirst({
        where: {
          id: {
            equals: ctx.session.user.id,
          },
        },
      });

      if (rawCampaign != null && gameMaster?.name != null)
        rawCampaign.gameMaster = gameMaster?.name;

      return campaignMapper(rawCampaign);
    }),
});
