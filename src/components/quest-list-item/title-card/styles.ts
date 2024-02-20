import { notoSans } from "@styles/fonts";
import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const S = createStyles({
  RecommendedLevelText: styled("p", {
    className: "text-[8px] italic text-gray-50",
  }),
  DescriptionText: styled("p", {
    className:
      "w-5/6 overflow-hidden text-ellipsis whitespace-nowrap text-[8px] italic text-gray-50",
  }),
  Container: styled("div", {
    className: twMerge(
      "relative flex w-full items-center rounded bg-burgundy-400 py-1 text-gray-50 drop-shadow-default",
      notoSans.className
    ),
  }),
  SubtitleContainer: styled("div", {
    className: "flex w-full flex-col justify-center gap-1",
  }),
  IconContainer: styled("div", {
    className: "absolute right-2 top-2 cursor-pointer",
  }),
});

export const props = {
  Icon: cva("transform-all text-gray-50 duration-300", {
    variants: {
      isOpen: {
        true: "-rotate-90",
        false: "",
      },
    },
  }),
};
