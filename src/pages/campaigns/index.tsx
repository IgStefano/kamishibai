import type { IncomingMessage, ServerResponse } from "http";
import { useContext } from "react";
import CampaignListItem from "../../components/campaign-list-item";
import Divider from "../../components/ui/divider";
import Layout from "../../components/layout";
import { getServerAuthSession } from "../../server/auth";
import { dosis } from "../../styles/fonts";
import { api } from "@utils/api";
import { ModalContext } from "@/src/contexts/modal";
import { useQueryClient } from "@tanstack/react-query";
import useModalStatus from "@/src/hooks/useModalStatus";

export default function Campaigns() {
  const { setIsModalOpen, isModalOpen, setModalOptions, modalOptions } =
    useContext(ModalContext);
  const campaigns = api.campaign.getCampaigns.useQuery({});
  const { data, isSuccess } = campaigns;

  const queryClient = useQueryClient();
  const mutation = api.campaign.newCampaign.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries().then(() => setIsModalOpen(false)),
  });

  const handleCreateCampaign = () => {
    const campaignName =
      (document.getElementById("campaignName") as HTMLInputElement)?.value ||
      "";
    mutation.mutate({ campaignName });
  };

  useModalStatus({ mutation, modalOptions, isModalOpen, setModalOptions });

  return (
    <Layout
      isLogged
      addIcon
      message="Abra uma nova campanha e crie as aventuras do seu grupo!"
      mutation={handleCreateCampaign}
    >
      <>
        {isSuccess && data && data.length > 0 && (
          <>
            <Divider />
            <p
              className={`text-sm text-gray-500 ${dosis.className} mb-4 w-full`}
            >
              Selecione uma campanha para ver suas aventuras!
            </p>
            <section className="flex flex-col gap-3">
              {data?.map((campaign) => (
                <CampaignListItem
                  key={campaign.id}
                  id={campaign.id}
                  master={campaign.gameMaster}
                  title={campaign.name}
                  isEditable={campaign.editable}
                />
              ))}
            </section>
          </>
        )}
      </>
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
