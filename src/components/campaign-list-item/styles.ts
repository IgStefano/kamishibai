import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";

export const S = createStyles({
  Container: styled("li", {
    className:
      "relative flex w-full cursor-pointer gap-4 rounded-3xl bg-lightYellow px-4 py-1 drop-shadow-default",
  }),
  ImageContainer: styled("div", {
    className: "h-8 w-8 rounded-full bg-gray-400",
  }),
  TextContainer: styled("div", {
    className: "flex w-full flex-col gap-1",
  }),
  Title: styled("p", {
    className: cva(
      "w-full overflow-hidden text-ellipsis whitespace-pre text-xs italic text-burgundy-500"
    )(),
  }),
  GameMaster: styled("p", {
    className: "text-[0.5rem] italic text-gray-600",
  }),
});
