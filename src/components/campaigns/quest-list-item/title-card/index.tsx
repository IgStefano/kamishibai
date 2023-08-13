import { ModalContext } from "@/src/contexts/modal";
import { notoSans } from "@/src/styles/fonts";
import type { Quest } from "@/src/types/shared.types";
import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import { useContext, type Dispatch, type SetStateAction } from "react";

interface TitleCardProps {
  quest: Quest;
  openQuests: string[];
  setOpenQuests: Dispatch<SetStateAction<string[]>>;
  editable: boolean;
  mutation?: () => void;
}

export default function TitleCard({
  quest,
  openQuests,
  setOpenQuests,
  editable,
  mutation = undefined,
}: TitleCardProps) {
  const { setIsModalOpen, setModalOptions } = useContext(ModalContext);
  const { id, recommendedLevel, description, name } = quest;
  const isOpen = openQuests.includes(id);

  const handleCloseQuest = () => {
    setOpenQuests(openQuests.filter((quest) => quest !== id));
  };
  const handleOpenQuest = () => {
    setOpenQuests([...openQuests, id]);
  };

  const getSubtitle = () => {
    if (recommendedLevel)
      return (
        <p className="text-[8px] italic text-gray-50">
          <span className="not-italic">Nível recomendado:</span>{" "}
          {recommendedLevel}
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
        <Icon
          icon="ph:arrow-down"
          className={classnames(
            "transform-all text-gray-50 duration-300",
            isOpen ? "-rotate-90" : ""
          )}
        />
      </div>

      <div className="flex w-full flex-col justify-center gap-1">
        <h5 className={classnames("text-xs italic text-gray-50")}>{name}</h5>
        {getSubtitle()}
      </div>

      {editable && mutation && (
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            void setIsModalOpen(true);
            setModalOptions({
              module: "quest",
              type: "edit",
              mutation,
              populate: { quest: { ...quest } },
            });
          }}
        >
          <Icon icon="ph:pencil-simple" className=" text-gray-50" />
        </div>
      )}
    </div>
  );
}
