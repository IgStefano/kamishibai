/* eslint-disable react-hooks/exhaustive-deps */
import type { Quest } from "@/src/types/shared.types";
import { getActivityStatus } from "@/src/types/shared.types";
import Activity from "@components/form/activity";
import type { ActivityClient } from "@components/form/checkbox/checkbox-wrapper";
import { formatDate } from "@utils/formatDate";
import { Fragment, useState } from "react";
import { S, props } from "./styles";

type renderedItem = {
  name: string;
  content: string;
};

interface DescriptionProps {
  quest: Quest;
  openQuests: string[];
}

export default function Description({ quest, openQuests }: DescriptionProps) {
  const { id, activities, recommendedLevel, reward, description, startDate } =
    quest;

  const [formActivities, setFormActivities] = useState<ActivityClient[]>(
    activities.map((activity) => {
      return {
        id: activity.id,
        activityName: activity.name,
        activityStatus: getActivityStatus(activity.status),
        questId: id,
      };
    }) || []
  );

  const isOpen = openQuests.includes(id);

  const renderedItems: renderedItem[] = [
    { name: "Descrição", content: description || "" },
    {
      name: "Objetivo atual",
      content:
        activities.find(
          (activity) => getActivityStatus(activity.status) === "in_progress"
        )?.name || "",
    },
    { name: "Início", content: formatDate(startDate) },
    { name: "Recompensa", content: reward || "" },
    { name: "Nível recomendado", content: recommendedLevel?.toString() || "" },
  ];

  const item = (title: string, text: string, index: number) => {
    return (
      <p
        key={title + index.toString()}
        className="text-xs italic text-gray-900"
      >
        <strong className="not-italic">{title}:</strong> {text}
      </p>
    );
  };

  return (
    <S.Container className={props.Container({ isOpen })}>
      <S.RenderedItemsContainer>
        {renderedItems.map((currentItem, index) => {
          if (!currentItem.content) return <Fragment key={index} />;
          return item(currentItem.name, currentItem.content, index);
        })}
      </S.RenderedItemsContainer>
      <S.ActivityLogContainer>
        <S.ActivityLogHeading>Registro de Atividades</S.ActivityLogHeading>
        <div className="flex flex-col gap-1">
          <S.RenderedItemsContainer>
            {activities.map((activity) => (
              <Activity
                key={activity.id}
                activityName={activity.name}
                activityStatus={getActivityStatus(activity.status)}
                id={activity.id}
                questId={quest.id}
                editMode
                activities={formActivities}
                setActivities={setFormActivities}
                popUpOrientation="horizontal"
              />
            ))}
          </S.RenderedItemsContainer>
        </div>
      </S.ActivityLogContainer>
    </S.Container>
  );
}
