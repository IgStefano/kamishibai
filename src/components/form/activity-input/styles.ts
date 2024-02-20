import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";

export const S = createStyles({
  Label: styled("label", {
    className: "pb-1 text-xs text-burgundy",
  }),
  Input: styled("input", {
    className:
      "w-full rounded border border-gray-50 bg-lightYellow p-2 text-xs transition-all duration-300 focus-visible:border-solid focus-visible:border-burgundy disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80",
  }),
});

export const props = {
  Container: cva("", {
    variants: {
      hidden: {
        true: "hidden",
        false: "flex w-full flex-col",
      },
    },
  }),
};
