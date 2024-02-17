/* eslint-disable react-hooks/exhaustive-deps */
import type { Quest } from "@/src/types/shared.types";
import { getActivityStatus } from "@/src/types/shared.types";
import Activity from "@components/form/activity";
import type { ActivityClient } from "@components/form/checkbox/checkbox-wrapper";
import { api } from "@utils/api";
import { classnames } from "@utils/classnames";
import { formatDate } from "@utils/formatDate";
import { Fragment, useEffect, useState } from "react";

type renderedItem = {
  name: string;
  content: string;
};

interface DescriptionProps {
  quest: Quest;
  openQuests: string[];
}

export default function Description({ quest, openQuests }: DescriptionProps) {
  const {
    id,
    activities,
    recommendedLevel,
    reward,
    description,
    startDate,
    campaignId,
  } = quest;

  const activitiesMutation = api.quest.editQuestActivities.useMutation({
    onSuccess: () => api.useContext().quest.invalidate(),
  });

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
        className={classnames("text-xs italic text-gray-900")}
      >
        <strong className="not-italic">{title}:</strong> {text}
      </p>
    );
  };

  return (
    <div
      className={classnames(
        "flex flex-col gap-4 transition-all duration-500 [&_*]:transition-all [&_*]:duration-500",
        !isOpen
          ? "pointer-events-none max-h-0 opacity-0 [&_*]:invisible [&_*]:max-h-0 [&_*]:p-0"
          : "mt-4 max-h-screen [&_*]:max-h-screen"
      )}
    >
      <div className="flex flex-col gap-2">
        {renderedItems.map((currentItem, index) => {
          if (!currentItem.content) return <Fragment key={index} />;
          return item(currentItem.name, currentItem.content, index);
        })}
      </div>
      <div
        className={classnames(
          "flex flex-col gap-2 rounded bg-gray-200 px-4 pt-2 pb-4 drop-shadow-default"
        )}
      >
        <h6 className="text-center font-bold text-burgundy-400">
          Registro de Atividades
        </h6>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
