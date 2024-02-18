import {
  type Dispatch,
  type SetStateAction,
  useContext,
  useRef,
  useEffect,
} from "react";
import Description from "./description";
import TitleCard from "./title-card";
import type { Quest } from "@/src/types/shared.types";
import { useRouter } from "next/router";
import { api } from "@utils/api";
import { ModalContext } from "@/src/contexts/modal";
import { QuestFormContext } from "@/src/contexts/questForm";
import { useQueryClient } from "@tanstack/react-query";
import useModalStatus from "@/src/hooks/useModalStatus";

interface QuestListItemProps {
  quest: Quest;
  openQuests: string[];
  setOpenQuests: Dispatch<SetStateAction<string[]>>;
  isEditable?: boolean;
}

export default function QuestListItem({
  quest,
  openQuests,
  setOpenQuests,
  isEditable = false,
}: QuestListItemProps) {
  const { isModalOpen, setIsModalOpen, modalOptions, setModalOptions } =
    useContext(ModalContext);

  const { state } = useContext(QuestFormContext);
  const stateRef = useRef(state);

  const router = useRouter();
  const campaign = api.campaign.getCampaignById.useQuery({
    id: router.query.id as string,
  })?.data;
  const queryClient = useQueryClient();
  const mutation = api.quest.editQuest.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries().then(() => setIsModalOpen(false)),
  });

  const handleEditQuest = () => {
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
        startDate,
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
    }
  };

  useModalStatus({ mutation, modalOptions, isModalOpen, setModalOptions });

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return (
    <li>
      <TitleCard
        quest={quest}
        setOpenQuests={setOpenQuests}
        openQuests={openQuests}
        editable={isEditable}
        mutation={handleEditQuest}
      />
      <Description quest={quest} openQuests={openQuests} />
    </li>
  );
}
