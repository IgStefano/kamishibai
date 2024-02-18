import { LTCarpet } from "@pages/_app";
import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const S = createStyles({
  ModalSection: styled("section", {
    className:
      "absolute right-0 top-0 flex h-full w-full items-center justify-center bg-[#000] bg-opacity-80 transition-all duration-300",
  }),
  ModalContainer: styled("div", {
    className:
      "relative flex max-h-[85vh] w-[40vw] flex-col items-center justify-center gap-4 rounded-lg bg-gray-50 p-6",
  }),
  ModalHeading: styled("h3", {
    className: twMerge(
      "mx-2 w-full text-center text-4xl uppercase text-gray-500 ",
      LTCarpet.className
    ),
  }),
  ModalContent: styled("div", {
    className: "max-h-[60vh] w-full overflow-y-auto",
  }),
  ModalErrorText: styled("p", {
    className: "text-center text-sm font-bold text-burgundy-300",
  }),
});

export const props = {
  ModalSection: cva("", {
    variants: {
      isModalOpen: {
        true: "",
        false: "pointer-events-none opacity-0",
      },
    },
  }),
};
