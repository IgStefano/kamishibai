import { ModalContext } from "@/src/contexts/modal";
import useModalStatus from "@/src/hooks/useModalStatus";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import S from "./styles";

interface CampaignListItemProps {
  id: string;
  title: string;
  master: string;
  image?: {
    url: string;
    alt: string;
  };
  isEditable?: boolean;
}

export default function CampaignListItem({
  id,
  title,
  master,
  image = undefined,
  isEditable = false,
}: CampaignListItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isModalOpen, setIsModalOpen, setModalOptions, modalOptions } =
    useContext(ModalContext);

  const campaign = api.campaign.getCampaignById.useQuery({ id });

  const { data } = campaign;

  const mutation = api.campaign.editCampaign.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries().then(() => setIsModalOpen(false)),
  });

  const handleEditCampaign = () => {
    if (campaign && data)
      mutation.mutate({
        campaignId: id,
        campaignName:
          (document.getElementById("campaignName") as HTMLInputElement)
            ?.value || title,
        gameMaster: data.gameMaster,
      });
  };

  useModalStatus({ mutation, modalOptions, isModalOpen, setModalOptions });

  return (
    <S.Container>
      <S.ImageContainer onClick={() => void router.push(`/campaigns/${id}`)}>
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </S.ImageContainer>
      <S.TextContainer onClick={() => void router.push(`/campaigns/${id}`)}>
        <S.Title>{title}</S.Title>
        <S.GameMaster>{master}</S.GameMaster>
      </S.TextContainer>
      {master && isEditable && (
        <Icon
          onClick={() => {
            setModalOptions({
              module: "campaign",
              type: "edit",
              mutation: handleEditCampaign,
              populate: { campaign: { name: title } },
            });
            setIsModalOpen(true);
          }}
          icon="ph:pencil-simple"
          className="absolute right-2 top-2 z-10 cursor-pointer text-burgundy"
        />
      )}
    </S.Container>
  );
}
