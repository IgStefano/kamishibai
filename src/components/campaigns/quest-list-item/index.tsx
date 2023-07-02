import type { Dispatch, SetStateAction } from "react";
import Description from "./description";
import TitleCard from "./title-card";
import type { Quest } from "@/src/types/shared.types";
import { ActivityStatus } from "@/src/types/shared.types";

interface QuestListItemProps {
  quest: Quest;
  openQuests: string[];
  setOpenQuests: Dispatch<SetStateAction<string[]>>;
}

export default function QuestListItem({
  quest,
  openQuests,
  setOpenQuests,
}: QuestListItemProps) {
  return (
    <li>
      <TitleCard
        id={quest.id}
        setOpenQuests={setOpenQuests}
        openQuests={openQuests}
        editable
        title={quest.name}
        description={quest.description}
      />
      <Description
        description={quest.description}
        objectives={quest.activities.map((activity) => {
          return {
            name: activity.name,
            state: ActivityStatus[activity.status] as
              | "not_started"
              | "in_progress"
              | "success"
              | "failure",
          };
        })}
        id={quest.id}
        openQuests={openQuests}
        reward={quest.reward}
        startDate={quest.createdAt}
        title={quest.name}
      />
    </li>
  );
}
