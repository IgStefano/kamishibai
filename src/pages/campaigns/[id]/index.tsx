/* eslint-disable @typescript-eslint/no-non-null-assertion */
import QuestListItem from "@components/campaigns/quest-list-item";
import {
  ActivitiesWrapper,
  type ActivityClient,
} from "@components/form/checkbox/checkbox-wrapper";
import Input from "@components/form/input";
import Layout from "@components/layout";
import Modal from "@components/layout/modal";
import type { IncomingMessage, ServerResponse } from "http";
import { useContext, useState } from "react";
import { getServerAuthSession } from "../../../server/auth";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import TextArea from "@components/form/textarea";
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
  const quests = api.quest.getQuests.useQuery({}).data;
  const mutation = api.quest.newQuest.useMutation();

  const [openQuests, setOpenQuests] = useState<string[]>([]);
  const [formActivities, setFormActivities] = useState<ActivityClient[]>([]);

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
      <Modal
        mutation={handleCreateQuest}
        buttonLabel="Criar Aventura"
        content={
          <form id="new-quest" className="flex flex-col gap-4">
            <Input
              label="Nome da Aventura"
              name="questName"
              required
              maxLength={64}
            />
            <Input
              label="Data de Início"
              name="startDate"
              required
              type="date"
            />
            <Input
              label="Objetivo"
              name="mainObjective"
              required
              maxLength={64}
            />
            <input
              name="activities"
              required
              hidden
              maxLength={64}
              value={activities.join(",")}
            />
            <div id="activities">
              <Input
                label="Atividades"
                name=""
                addNew
                placeholder="Adicionar mais uma atividade"
                maxLength={64}
                activities={formActivities}
                setActivities={setFormActivities}
              />
              <AnimatePresence>
                {formActivities.length > 0 && (
                  <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <ActivitiesWrapper
                      activities={formActivities}
                      setActivities={setFormActivities}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Input label="Recompensa" name="reward" maxLength={64} />
            <Input label="Nível Recomendado" name="recommendedLevel" />
            <TextArea label="Descrição" name="description" maxLength={1280} />
          </form>
        }
        title="Crie a sua aventura"
      />
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
