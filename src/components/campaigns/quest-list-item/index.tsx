import { type Dispatch, type SetStateAction, useContext, useRef } from "react";
import Description from "./description";
import TitleCard from "./title-card";
import type { Quest } from "@/src/types/shared.types";
import { useRouter } from "next/router";
import { api } from "@utils/api";
import { ModalContext } from "@/src/contexts/modal";
import { QuestFormContext } from "@/src/contexts/questForm";

interface QuestListItemProps {
  quest: Quest;
  openQuests: string[];
  setOpenQuests: Dispatch<SetStateAction<string[]>>;
}

export default function QuestListItem({
  quest,
  openQuests,
  setOpenQuests,
}: QuestListItemProps) {
  const { setIsModalOpen } = useContext(ModalContext);

  const { state } = useContext(QuestFormContext);
  const stateRef = useRef(state);
  stateRef.current = state;

  const router = useRouter();
  const campaign = api.campaign.getCampaignById.useQuery({
    id: router.query.id as string,
  })?.data;
  const mutation = api.quest.editQuest.useMutation();
  const invalidate = api.useContext().quest.invalidate();

  const handleEditQuest = async () => {
    const {
      activities,
      description,
      mainObjective,
      questName,
      recommendedLevel,
      reward,
      startDate,
    } = stateRef.current;

    if (campaign) {
      const mutator = {
        questId: quest.id,
        campaignId: campaign.id,
        questName,
        mainObjective,
        startDate: new Date(startDate),
        activities,
        isVisible: true,
      };

      const optionalFields = {
        description,
        recommendedLevel: Number(recommendedLevel),
        reward,
      };

      Object.entries(optionalFields).forEach((field) => {
        if (field[1]) {
          Object.assign(mutator, { [field[0]]: field[1] });
        }
      });

      mutation.mutate(mutator);
      await invalidate;
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <li>
        <TitleCard
          quest={quest}
          setOpenQuests={setOpenQuests}
          openQuests={openQuests}
          editable
          mutation={handleEditQuest}
        />
        <Description quest={quest} openQuests={openQuests} />
      </li>
    </>
  );
}
