import { Icon } from "@iconify/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface CampaignListItemProps {
  id: string;
  title: string;
  master: string;
  image?: {
    url: string;
    alt: string;
  };
}

export default function CampaignListItem({
  id,
  title,
  master,
  image,
}: CampaignListItemProps) {
  const router = useRouter();

  return (
    <li
      className="relative flex w-full gap-4 rounded-3xl bg-lightYellow py-1 px-4 drop-shadow-default"
      onClick={() => void router.push(`/${id}`)}
    >
      <div className={`h-8 w-8 rounded-full bg-gray-400`}>
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
      <div className="flex w-full max-w-[70%] flex-col gap-1">
        <p className="w-full overflow-hidden text-ellipsis whitespace-pre text-xs italic text-burgundy-500">
          {title}
        </p>
        <p className="text-[0.5rem] italic text-gray-600">{master}</p>
      </div>
      {master && (
        <Icon
          icon="ph:pencil-simple"
          className="absolute top-2 right-2 text-burgundy"
        />
      )}
    </li>
  );
}
