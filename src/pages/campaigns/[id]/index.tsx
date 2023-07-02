/* eslint-disable @typescript-eslint/no-non-null-assertion */
import QuestListItem from "@components/campaigns/quest-list-item";
import type { CheckboxT } from "@components/form/checkbox/checkbox-wrapper";
import CheckboxWrapper from "@components/form/checkbox/checkbox-wrapper";
import Input from "@components/form/input";
import Layout from "@components/layout";
import Modal from "@components/layout/modal";
import type { IncomingMessage, ServerResponse } from "http";
import { useEffect, useState } from "react";
import { getServerAuthSession } from "../../../server/auth";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "@utils/api";
import { useRouter } from "next/router";
import TextArea from "@components/form/textarea";

export default function CampaignQuests() {
  const router = useRouter();
  const campaign = api.campaign.getCampaignById.useQuery({
    id: router.query.id as string,
  })?.data;
  const quests = api.quest.getQuests.useQuery({}).data;
  const mutation = api.quest.newQuest.useMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [openQuests, setOpenQuests] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [checkboxes, setCheckboxes] = useState<CheckboxT[]>([]);

  const handleCreateQuest = () => {
    const formData = new FormData(
      document.getElementById("new-quest") as HTMLFormElement
    );

    if (campaign)
      mutation.mutate({
        questName: formData.get("questName")!.toString(),
        activities: formData
          .get("activities")!
          .toString()
          .split(",")
          .map((activity) => {
            return { activityName: activity, activityStatus: "not_started" };
          }),
        campaignId: campaign.id,
        description: formData.get("description")!.toString(),
        isVisible: true,
        recommendedLevel: Number(formData.get("recommendedLevel")!.toString()),
        reward: formData.get("reward")!.toString(),
      });

    setIsOpen(false);
  };

  useEffect(() => {
    setCheckboxes(
      activities.map((activity) => {
        return {
          id: activity,
          label: activity,
          name: activity,
          deletable: true,
        };
      })
    );
  }, [activities]);

  return (
    <Layout
      isLogged
      addIcon
      message="Crie agora uma aventura para esta campanha!"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      subHeading={campaign?.name}
      setIsModalOpen={setIsOpen}
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
              label="Próximo objetivo"
              name="objective"
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
                activities={activities}
                setActivities={setActivities}
              />
              <AnimatePresence>
                {checkboxes.length > 0 && (
                  <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <CheckboxWrapper
                      label=""
                      checkboxes={checkboxes}
                      setCheckboxes={setActivities}
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
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
