/* eslint-disable @typescript-eslint/no-non-null-assertion */
import QuestListItem from "@components/quest-list-item";
import Layout from "@components/layout";
import type { IncomingMessage, ServerResponse } from "http";
import { useContext, useEffect, useRef, useState } from "react";
import { getServerAuthSession } from "../../../server/auth";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import { ModalContext } from "@/src/contexts/modal";
import { QuestFormContext } from "@/src/contexts/questForm";
import { useQueryClient } from "@tanstack/react-query";
import useModalStatus from "@/src/hooks/useModalStatus";

export default function CampaignQuests() {
  const { isModalOpen, setIsModalOpen, modalOptions, setModalOptions } =
    useContext(ModalContext);
  const { state } = useContext(QuestFormContext);
  const stateRef = useRef(state);

  const router = useRouter();
  const campaign = api.campaign.getCampaignById.useQuery({
    id: router.query.id as string,
  })?.data;

  const queryClient = useQueryClient();
  const mutation = api.quest.newQuest.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries().then(() => setIsModalOpen(false)),
  });

  const quests = api.quest.getQuests.useQuery({
    campaignId: campaign?.id || "",
    page: 1,
  })?.data;

  const [openQuests, setOpenQuests] = useState<string[]>([]);

  const handleCreateQuest = () => {
    const {
      activities,
      description,
      mainObjective,
      questName,
      recommendedLevel,
      reward,
      startDate,
    } = stateRef.current;

    const mutator = {
      campaignId: router.query.id as string,
      questName,
      mainObjective,
      startDate: new Date(startDate),
      activities,
      isVisible: true,
    };

    const optionalFields = {
      description,
      recommendedLevel: parseInt(recommendedLevel),
      reward,
    };

    Object.entries(optionalFields).forEach((field) => {
      if (field[1]) {
        Object.assign(mutator, { [field[0]]: field[1] });
      }
    });

    mutation.mutate(mutator);
  };

  useModalStatus({ mutation, modalOptions, isModalOpen, setModalOptions });

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return (
    <Layout
      isLogged
      addIcon={campaign?.editable}
      message="Crie agora uma aventura para esta campanha!"
      subHeading={campaign?.name || ""}
      mutation={handleCreateQuest}
    >
      <ul className="my-4 flex list-none flex-col gap-4">
        {quests?.map((quest) => (
          <QuestListItem
            key={quest.id}
            quest={quest}
            openQuests={openQuests}
            setOpenQuests={setOpenQuests}
            isEditable={campaign?.editable}
          />
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(ctx: {
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> };
  res: ServerResponse<IncomingMessage>;
  query: { [key: string]: string };
}) {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: { session },
  };
}
