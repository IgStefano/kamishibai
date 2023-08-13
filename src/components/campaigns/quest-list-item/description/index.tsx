import type { Quest } from "@/src/types/shared.types";
import { getActivityStatus } from "@/src/types/shared.types";
import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import { formatDate } from "@utils/formatDate";
import { Fragment } from "react";

type renderedItem = {
  name: string;
  content: string;
};

interface DescriptionProps {
  quest: Quest;
  openQuests: string[];
}

export default function Description({ quest, openQuests }: DescriptionProps) {
  console.log(quest);
  const { id, activities, recommendedLevel, reward, description, startDate } =
    quest;

  const icons = [
    { status: "success", icon: "ph:check-bold", color: "text-burgundy-400" },
    { status: "failure", icon: "ph:x-bold", color: "text-lightYellow-900" },
    {
      status: "in_progress",
      icon: "ph:minus-bold",
      color: "text-gray-600",
    },
    { status: "not_started", icon: "ph:dots-three", color: "text-gray-600" },
  ];
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
        <span className="font-bold not-italic">{title}:</span> {text}
      </p>
    );
  };

  return (
    <div
      onAnimationEnd={(e) => console.log(e.currentTarget)}
      className={classnames(
        "flex flex-col gap-4 overflow-hidden transition-all duration-500",
        !isOpen ? "pointer-events-none max-h-0 opacity-0" : "mt-4 max-h-screen"
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
            {activities.map((activity) => {
              const iconData = icons.find(
                (state) => state.status === getActivityStatus(activity.status)
              );
              return (
                <div
                  key={activity.name}
                  className={
                    "flex items-center gap-1 text-sm font-normal text-gray-800"
                  }
                >
                  {iconData !== undefined && (
                    <Icon
                      fontSize={24}
                      icon={iconData.icon}
                      className={iconData.color}
                    />
                  )}
                  {activity.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
