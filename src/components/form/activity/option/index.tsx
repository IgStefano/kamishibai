import type { ActivityStatus } from "@/src/types/shared.types";
import { Icon } from "@iconify/react";
import { cva } from "class-variance-authority";
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
} as const;

export default function Option({
  value,
  popUpOrientation = "vertical",
  ...otherProps
}: OptionProps) {
  return (
    <span
      className={cva(
        "flex appearance-none gap-1 p-2 text-xs font-light text-gray-900 transition-all duration-300 hover:opacity-80 focus:opacity-80",
        {
          variants: {
            failure: {
              true: "border-0",
              false: "",
            },
            vertical: {
              true: "border-b",
              false: "",
            },
            horizontalAndSuccess: {
              true: "items-center border-r",
              false: "",
            },
          },
        }
      )({
        failure: value === "failure",
        vertical: value !== "failure" && popUpOrientation === "vertical",
        horizontalAndSuccess:
          value !== "failure" && popUpOrientation !== "vertical",
      })}
      title={optionStatus[value].text}
      {...otherProps}
    >
      <Icon
        icon={optionStatus[value].icon}
        className={cva([optionStatus[value].color, "text-lg"])()}
      />
      {popUpOrientation == "vertical" && optionStatus[value].text}
    </span>
  );
}
