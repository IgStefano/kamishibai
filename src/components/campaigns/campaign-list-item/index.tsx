import { ModalContext } from "@/src/contexts/modal";
import useModalStatus from "@/src/hooks/useModalStatus";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";

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
  const { isModalOpen, setIsModalOpen, setModalOptions, modalOptions } =
    useContext(ModalContext);
  const campaign = api.campaign.getCampaignById.useQuery({ id }).data;
  const queryClient = useQueryClient();
  const mutation = api.campaign.editCampaign.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries().then(() => setIsModalOpen(false)),
  });
  const handleEditCampaign = () => {
    if (campaign)
      mutation.mutate({
        campaignId: campaign.id,
        campaignName:
          (document.getElementById("campaignName") as HTMLInputElement)
            ?.value || title,
        gameMaster: campaign.gameMaster,
      });
  };

  useModalStatus({ mutation, modalOptions, isModalOpen, setModalOptions });

  return (
    <li className="relative flex w-full cursor-pointer gap-4 rounded-3xl bg-lightYellow px-4 py-1 drop-shadow-default">
      <div
        className={`h-8 w-8 rounded-full bg-gray-400`}
        onClick={() => void router.push(`/campaigns/${id}`)}
      >
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt}
            width={32}
            height={32}
            className={`${!image ? "bg-gray-400" : ""} rounded-full`}
          />
        )}
      </div>
      <div
        className="flex w-full flex-col gap-1"
        onClick={() => void router.push(`/campaigns/${id}`)}
      >
        <p className="w-full overflow-hidden text-ellipsis whitespace-pre text-xs italic text-burgundy-500">
          {title}
        </p>
        <p className="text-[0.5rem] italic text-gray-600">{master}</p>
      </div>
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
    </li>
  );
}
