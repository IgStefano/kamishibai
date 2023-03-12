import { notoSans } from "@/src/styles/fonts";
import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import type { Dispatch, SetStateAction } from "react";

interface TitleCardProps {
  id: string;
  title: string;
  level?: string | number;
  description?: string;
  openQuests: string[];
  setOpenQuests: Dispatch<SetStateAction<string[]>>;
  editable: boolean;
}

export default function TitleCard({
  id,
  title,
  level,
  description,
  openQuests,
  setOpenQuests,
  editable,
}: TitleCardProps) {
  const isOpen = openQuests.includes(id);

  const handleCloseQuest = () => {
    setOpenQuests(openQuests.filter((quest) => quest !== id));
  };
  const handleOpenQuest = () => {
    setOpenQuests([...openQuests, id]);
  };

  const getSubtitle = () => {
    if (level)
      return (
        <p className="text-[8px] italic text-gray-50">
          <span className="not-italic">Nível recomendado:</span> {level}
        </p>
      );
    if (description)
      return (
        <p className="w-5/6 overflow-hidden text-ellipsis whitespace-nowrap text-[8px] italic text-gray-50">
          <span className="not-italic">Descrição:</span> {description}
        </p>
      );
    return <></>;
  };

  return (
    <div
      className={classnames(
        "relative flex w-full items-center rounded bg-burgundy-400 py-1 text-gray-50 drop-shadow-default",
        notoSans.className
      )}
    >
      <div
        className="p-4"
        onClick={() => (isOpen ? handleCloseQuest() : handleOpenQuest())}
      >
        {isOpen ? (
          <Icon icon="ph:arrow-down" className="text-gray-50" />
        ) : (
          <Icon icon="ph:arrow-right" className="text-gray-50" />
        )}
      </div>

      <div className="flex w-full flex-col justify-center gap-1">
        <h5 className={classnames("text-xs italic text-gray-50")}>{title}</h5>
        {getSubtitle()}
      </div>

      {editable && (
        <div className="absolute top-2 right-2">
          <Icon icon="ph:pencil-simple" className=" text-gray-50" />
        </div>
      )}
    </div>
  );
}