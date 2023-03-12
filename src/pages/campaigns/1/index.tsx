import QuestListItem from "@components/campaigns/quest-list-item";
import Input from "@components/Input";
import Layout from "@components/layout";
import Modal from "@components/layout/modal";
import { classnames } from "@utils/classnames";
import type { IncomingMessage, ServerResponse } from "http";
import { useState } from "react";
import { getServerAuthSession } from "../../../server/auth";

export default function CampaignQuests() {
  const [isOpen, setIsOpen] = useState(false);
  const [openQuests, setOpenQuests] = useState<string[]>([]);

  return (
    <Layout
      isLogged
      addIcon
      message="Crie agora uma aventura para esta campanha!"
      subHeading="Hypernatural"
      setIsModalOpen={setIsOpen}
    >
      <ul className="mt-4 flex list-none flex-col gap-4">
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
        content={<Input label="Nome da Aventura" name="questName" required />}
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
