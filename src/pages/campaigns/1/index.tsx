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

export default function CampaignQuests() {
  const [isOpen, setIsOpen] = useState(false);
  const [openQuests, setOpenQuests] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [checkboxes, setCheckboxes] = useState<CheckboxT[]>([]);

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
      subHeading="Hypernatural"
      setIsModalOpen={setIsOpen}
    >
      <ul className="my-4 flex list-none flex-col gap-4">
        <QuestListItem
          id="1"
          openQuests={openQuests}
          setOpenQuests={setOpenQuests}
        />
        <QuestListItem
          id="2"
          openQuests={openQuests}
          setOpenQuests={setOpenQuests}
        />
      </ul>
      <Modal
        buttonLabel="Criar Aventura"
        content={
          <form className="flex flex-col gap-4">
            <Input label="Nome da Aventura" name="questName" required />
            <Input label="Data de Início" name="startDate" required />
            <Input label="Objetivo" name="objective" required />
            <input
              name="activities"
              required
              hidden
              value={activities.join(",")}
            />
            <div id="activities">
              <Input
                label="Atividades"
                name=""
                addNew
                placeholder="Adicionar mais uma atividade"
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
            <Input label="Recompensa" name="reward" />
            <Input label="Nível Recomendado" name="recommendedLevel" required />
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
