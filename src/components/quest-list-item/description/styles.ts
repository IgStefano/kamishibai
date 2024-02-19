import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";

export const S = createStyles({
  Container: styled("div", {
    className:
      "flex flex-col gap-4 transition-all duration-500 [&_*]:transition-all [&_*]:duration-500",
  }),
  RenderedItemsContainer: styled("div", {
    className: "flex flex-col gap-2",
  }),
  ActivityLogContainer: styled("div", {
    className:
      "flex flex-col gap-2 rounded bg-gray-200 px-4 pb-4 pt-2 drop-shadow-default",
  }),
  ActivityLogHeading: styled("h6", {
    className: "text-center font-bold text-burgundy-400",
  }),
});

export const props = {
  Container: cva("", {
    variants: {
      isOpen: {
        true: "mt-4 max-h-screen [&_*]:max-h-screen",
        false:
          "pointer-events-none max-h-0 opacity-0 [&_*]:invisible [&_*]:max-h-0 [&_*]:p-0",
      },
    },
  }),
};
