import { z } from "zod";

export enum ActivityStatus {
  "not_started" = 0,
  "in_progress" = 1,
  "success" = 2,
  "failure" = 3,
}

const Player = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  image: z.string().url().optional(),
});

const Campaign = z.object({
  id: z.string().cuid(),
  gameMaster: z.string(),
  name: z.string(),
  image: z.string().url().optional(),
  status: z.number().min(0).max(1),
});

const Quest = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  recommendedLevel: z.number().optional(),
  mainObjective: z.string(),
  isVisible: z.boolean(),
  reward: z.string().optional(),
  campaignId: z.string().cuid(),
  status: z.number().min(0).max(1),
});

const Activity = z.object({
  id: z.string().cuid(),
  name: z.string(),
  status: z.number().min(0).max(3),
  questId: z.string().cuid(),
});

export type Activity = z.infer<typeof Activity>;
export type Player = z.infer<typeof Player>;

export type Quest = z.infer<typeof Quest> & {
  campaign?: Campaign;
  activities: Activity[];
};

export type Campaign = z.infer<typeof Campaign> & {
  quests?: Quest[];
  players?: Player[];
};
