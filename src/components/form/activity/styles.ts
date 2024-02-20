import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";
import { optionStatus } from "./option";

export const S = createStyles({
  IconContainer: styled("div", {
    className: "relative flex w-fit cursor-pointer items-center gap-1",
  }),
  OptionContainer: styled("div", {
    className:
      "form-select absolute z-10 flex appearance-none border-0 bg-none px-2 transition-all duration-500",
  }),
});

export const props = {
  Icon: cva("text-3xl transition-all duration-300", {
    variants: {
      isUnselected: {
        true: "",
        false: "text-xl",
      },
      isUnselectedAndOpen: {
        true: "-rotate-90",
        false: "",
      },
      activityStatus: {
        not_started: optionStatus["not_started"].color,
        in_progress: optionStatus["in_progress"].color,
        success: optionStatus["success"].color,
        failure: optionStatus["failure"].color,
        false: "text-gray-900",
      },
    },
  }),
  OptionContainer: cva("", {
    variants: {
      isOpen: {
        true: "opacity-100",
        false: "pointer-events-none -translate-x-12 opacity-0",
      },
      vertical: {
        true: "translate-y-24 flex-col",
        false: "-translate-y-9",
      },
    },
  }),
};
