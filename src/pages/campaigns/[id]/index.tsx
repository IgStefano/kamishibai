/* eslint-disable @typescript-eslint/no-non-null-assertion */
import QuestListItem from "@components/campaigns/quest-list-item";
import Layout from "@components/layout";
import type { IncomingMessage, ServerResponse } from "http";
import { useContext, useState } from "react";
import { getServerAuthSession } from "../../../server/auth";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import { ModalContext } from "@/src/contexts/modal";
import { QuestFormContext } from "@/src/contexts/questForm";

export default function CampaignQuests() {
  const { setIsModalOpen } = useContext(ModalContext);
  const { state } = useContext(QuestFormContext);
  const {
    activities,
    description,
    mainObjective,
    questName,
    recommendedLevel,
    reward,
    startDate,
  } = state;

  const router = useRouter();
  const campaign = api.campaign.getCampaignById.useQuery({
    id: router.query.id as string,
  })?.data;
  const quests = api.quest.getQuests.useQuery({
    campaignId: campaign?.id || "",
    page: 1,
  })?.data;
  const mutation = api.quest.newQuest.useMutation({
    onSuccess: () => api.useContext().quest.invalidate(),
  });

  const [openQuests, setOpenQuests] = useState<string[]>([]);

  const handleCreateQuest = () => {
    if (campaign) {
      const mutator = {
        campaignId: campaign.id,
        questName,
        mainObjective,
        startDate: new Date(startDate),
        activities,
        isVisible: true,
      };

      const optionalFields = {
        description,
        recommendedLevel,
        reward,
      };

      Object.entries(optionalFields).forEach((field) => {
        if (field[1]) {
          Object.assign(mutator, { [field[0]]: field[1] });
        }
      });

      mutation.mutate(mutator);
    }

    setIsModalOpen(false);
  };

  return (
    <Layout
      isLogged
      addIcon
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
          />
        ))}
      </ul>
    </Layout>
  );
}

export async function getServerSideProps(ctx: {
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> };
  res: ServerResponse<IncomingMessage>;
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
