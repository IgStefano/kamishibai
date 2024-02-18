import {
  createTRPCRouter,
  gameMasterProcedure,
  protectedProcedure,
} from "../trpc";
import { z } from "zod";
import { campaignMapper } from "./mappers";
import { TRPCError } from "@trpc/server";
import type { Campaign, User } from "@prisma/client";

export const campaignRouter = createTRPCRouter({
  newCampaign: protectedProcedure
    .input(
      z.object({
        campaignName: z.string().min(5).max(64),
        campaignImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const hasDuplicate = await ctx.prisma.campaign.findFirst({
        where: {
          name: input.campaignName,
        },
      });

      if (hasDuplicate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Duplicate campaign name found: " + input.campaignName,
        });
      }

      const newCampaign = await ctx.prisma.campaign.create({
        data: {
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
              id: newCampaign.id,
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

      const gameMasterPromises = rawCampaigns.map((campaign) =>
        ctx.prisma.user.findFirst({
          where: {
            id: campaign.gameMaster,
          },
        })
      );

      const gameMasters = (await Promise.all(gameMasterPromises)) as User[];

      const mappedCampaigns = rawCampaigns.map((campaign, index) => {
        const gameMaster = gameMasters[index];
        const editable = gameMaster
          ? gameMaster.id === ctx.session.user.id
          : false;

        return {
          ...campaign,
          gameMaster: gameMaster ? gameMaster.name : "",
          editable,
        };
      });

      return (mappedCampaigns as Campaign[]).map((campaign) =>
        campaignMapper(campaign)
      );
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

      if (!rawCampaign)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No campaigns matching the provided id were found",
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
