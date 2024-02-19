import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";

export const S = createStyles({
  Container: styled("div", {
    className: "flex w-fit items-center gap-1",
  }),
  CheckboxInput: styled("input", {
    className:
      "h-3 w-3 appearance-none bg-lightYellow-300 outline-none checked:relative checked:before:absolute checked:before:right-[1px] checked:before:top-[-5px] checked:before:text-sm checked:before:text-burgundy-700 checked:before:content-['\xb92713'] checked:before:bg-burgundy-900",
  }),
  CheckboxLabel: styled("label", {
    className: "text-xs text-burgundy",
  }),
});

export const props = {
  Container: cva("", {
    variants: {
      disabled: {
        true: "opacity-50",
        false: "cursor-pointer",
      },
    },
  }),
  CheckboxInput: cva("", {
    variants: {
      disabled: {
        true: "",
        false: "cursor-pointer",
      },
    },
  }),
};
