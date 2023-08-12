import { ModalContext } from "@/src/contexts/modal";
import { Icon } from "@iconify/react";
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
  mutation?: () => void;
}

export default function CampaignListItem({
  id,
  title,
  master,
  image = undefined,
  mutation = undefined,
}: CampaignListItemProps) {
  const router = useRouter();
  const { setIsModalOpen, setModalOptions } = useContext(ModalContext);

  return (
    <li className="relative flex w-full cursor-pointer gap-4 rounded-3xl bg-lightYellow py-1 px-4 drop-shadow-default">
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
      {master && mutation && (
        <Icon
          onClick={() => {
            setModalOptions({ module: "campaign", type: "edit", mutation });
            setIsModalOpen(true);
          }}
          icon="ph:pencil-simple"
          className="absolute top-2 right-2 z-10 cursor-pointer text-burgundy"
        />
      )}
    </li>
  );
}
