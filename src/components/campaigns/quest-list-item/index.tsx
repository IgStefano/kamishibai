import type { Dispatch, SetStateAction } from "react";
import TitleCard from "./title-card";

interface QuestListItemProps {
  id: string;
  openQuests: string[];
  setOpenQuests: Dispatch<SetStateAction<string[]>>;
}

export default function QuestListItem({
  id,
  openQuests,
  setOpenQuests,
}: QuestListItemProps) {
  return (
    <>
      <TitleCard
        id={id}
        setOpenQuests={setOpenQuests}
        openQuests={openQuests}
        editable
        title="Buscar Remédios"
        description="Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum"
      />
    </>
  );
}
