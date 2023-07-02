import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import { formatDate } from "@utils/formatDate";
import { Fragment } from "react";

type Objective = {
  name: string;
  state: "success" | "failure" | "in_progress" | "not_started";
};

type renderedItem = {
  name: string;
  content: string;
};

interface DescriptionProps {
  id: string;
  title: string;
  level?: string | number;
  description?: string;
  startDate: Date;
  reward?: string;
  objectives: Objective[];
  openQuests: string[];
}

export default function Description({
  id,
  title,
  level,
  description,
  startDate,
  reward,
  objectives,
  openQuests,
}: DescriptionProps) {
  const icons = [
    { status: "success", icon: "ph:check-bold", color: "text-burgundy-400" },
    { status: "failure", icon: "ph:x-bold", color: "text-lightYellow-900" },
    {
      status: "in_progress",
      icon: "ph:minus-bold",
      color: "text-gray-600",
    },
    { status: "not_started", icon: "", color: "" },
  ];
  const isOpen = openQuests.includes(id);

  const renderedItems: renderedItem[] = [
    { name: "Descrição", content: description || "" },
    {
      name: "Objetivo atual",
      content:
        objectives.find((objective) => objective.state === "in_progress")
          ?.name || "",
    },
    { name: "Início", content: formatDate(startDate) },
    { name: "Recompensa", content: reward || "" },
    { name: "Nível recomendado", content: level?.toString() || "" },
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
            {objectives.map((objective) => {
              const iconData = icons.find(
                (state) => state.status === objective.state
              );
              return (
                <div
                  key={objective.name}
                  className={
                    "flex items-center gap-1 text-sm font-normal text-gray-800"
                  }
                >
                  {iconData !== undefined && (
                    <Icon icon={iconData.icon} className={iconData.color} />
                  )}
                  {objective.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
