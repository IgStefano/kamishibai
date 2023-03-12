import Input from "@components/Input";
import type { IncomingMessage, ServerResponse } from "http";
import { useState } from "react";
import CampaignListItem from "../../components/campaigns/campaign-list-item";
import Divider from "../../components/divider";
import Layout from "../../components/layout";
import Modal from "../../components/layout/modal";
import { getServerAuthSession } from "../../server/auth";
import { dosis } from "../../styles/fonts";

export default function Campaigns() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout
      isLogged
      addIcon
      message="Abra uma nova campanha e crie as aventuras do seu grupo!"
      setIsModalOpen={setIsOpen}
    >
      <Divider />
      <p className={`text-sm text-gray-500 ${dosis.className} mb-4 w-full`}>
        Selecione uma campanha para ver suas aventuras!
      </p>
      <section className="flex flex-col gap-3">
        <CampaignListItem
          master="Deneime"
          title="Laminaobscura e a Era Dracônica"
        />
        <CampaignListItem master="Deneime" title="Hypernatural" />
        <CampaignListItem master="Deneime" title="Assassinos de Enigmas" />
        <CampaignListItem master="Deneime" title="A Morte de uma Estrela" />
      </section>
      <Modal
        buttonLabel="Criar Campanha"
        content={
          <Input label="Nome da campanha" name="campaignName" required />
        }
        title="Crie a sua campanha"
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
