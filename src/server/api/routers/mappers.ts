import type { Activity, Campaign, Quest } from "@prisma/client";
import type { Quest as QuestClient, Campaign as CampaignClient, Player } from "@/src/types/shared.types";
import { Activity as ActivityClient } from "@/src/types/shared.types"

interface QuestAPIResponse extends Quest {
    campaign?: Campaign,
    activities?: Activity[] | undefined
}

interface CampaignAPIResponse extends Campaign {
    quests?: Quest[],
    players?: Player[]
}

export const campaignMapper = (campaign: CampaignAPIResponse) => {
    const optionalFields = {quests: campaign?.quests?.map(quest => questMapper(quest)), players: campaign.players}

    const mappedCampaign: CampaignClient = {
        id: campaign.id,
        name: campaign.name,
        gameMaster: campaign.gameMaster,
        status: campaign.status,
        image: campaign.image || undefined,
    }

    if (optionalFields.quests || optionalFields.players) Object.assign(mappedCampaign, optionalFields)

    return mappedCampaign
}

export const questMapper = (quest: QuestAPIResponse) => {

    const optionalField = {campaign: quest.campaign}

    const mappedQuest: QuestClient = {
        activities: quest?.activities,
        campaign: quest.campaign && campaignMapper(quest.campaign),
        id: quest.id,
        campaignId: quest.campaignId,
        name: quest.name,
        isVisible: quest.isVisible,
        createdAt: quest.createdAt,
        status: quest.status,
        description: quest.description || undefined,
        nextObjective: quest.nextObjective || undefined,
        recommendedLevel: quest.recommendedLevel || undefined,
        reward: quest.reward || undefined,
    }

    if (optionalField.campaign) Object.assign(mappedQuest, optionalField)


    return mappedQuest
}