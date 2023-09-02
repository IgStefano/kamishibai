import type { ActivityStatus } from "@/src/types/shared.types";
import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import type { ComponentPropsWithoutRef } from "react";

interface OptionProps extends ComponentPropsWithoutRef<"option"> {
  value: keyof typeof ActivityStatus;
  popUpOrientation?: "vertical" | "horizontal";
}

export const optionStatus = {
  not_started: {
    text: "Não iniciada",
    icon: "ph:dots-three",
    color: "text-gray-600",
  },
  in_progress: {
    text: "Em progresso",
    icon: "ph:minus-bold",
    color: "text-gray-600",
  },
  success: {
    text: "Sucesso",
    icon: "ph:check-bold",
    color: "text-burgundy-400",
  },
  failure: {
    text: "Falha",
    icon: "ph:x-bold",
    color: "text-lightYellow-900",
  },
};

export default function Option({
  value,
  popUpOrientation = "vertical",
  ...otherProps
}: OptionProps) {
  return (
    <span
      className={classnames(
        "flex appearance-none gap-1 p-2 text-xs font-light text-gray-900 transition-all duration-300 hover:opacity-80 focus:opacity-80",
        value === "failure"
          ? "border-0"
          : popUpOrientation === "vertical"
          ? "border-b"
          : "items-center border-r"
      )}
      title={optionStatus[value].text}
      {...otherProps}
    >
      <Icon
        icon={optionStatus[value].icon}
        className={classnames(optionStatus[value].color, "text-lg")}
      />
      {popUpOrientation == "vertical" && optionStatus[value].text}
    </span>
  );
}
