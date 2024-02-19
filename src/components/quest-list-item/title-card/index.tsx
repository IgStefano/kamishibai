import { ModalContext } from "@/src/contexts/modal";
import type { Quest } from "@/src/types/shared.types";
import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import { useContext, type Dispatch, type SetStateAction } from "react";
import { S } from "./styles";

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
        <S.RecommendedLevelText>
          <span className="not-italic">Nível recomendado:</span>{" "}
          {recommendedLevel}
        </S.RecommendedLevelText>
      );
    if (description)
      return (
        <S.DescriptionText>
          <span className="not-italic">Descrição:</span> {description}
        </S.DescriptionText>
      );
    return <></>;
  };

  return (
    <S.Container>
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

      <S.SubtitleContainer>
        <h5 className="text-xs italic text-gray-50">{name}</h5>
        {getSubtitle()}
      </S.SubtitleContainer>

      {editable && mutation && (
        <S.IconContainer
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
        </S.IconContainer>
      )}
    </S.Container>
  );
}
