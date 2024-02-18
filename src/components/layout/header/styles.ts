import { createStyles, styled } from "@styles/lib";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { LTCarpet } from "@pages/_app";
import { dosis } from "@styles/fonts";

export const S = createStyles({
  Header: styled("header", {
    className: "flex flex-col gap-4",
  }),
  LinkContainer: styled("div", {
    className: "flex items-center justify-between",
  }),
  Title: styled("h1", {
    className: twMerge([
      "w-full text-4xl font-medium text-burgundy",
      LTCarpet.className,
    ]),
  }),
  LogoutText: styled("span", {
    className:
      "cursor-pointer font-bold text-gray-700 transition-all duration-300 hover:text-burgundy-700",
  }),
  SubHeading: styled("h2", {
    className: twMerge([
      "w-full text-2xl font-medium text-gray-500",
      LTCarpet.className,
    ]),
  }),
  AddNewMessageContainer: styled("div", {
    className: "flex justify-between gap-2",
  }),
  AddNewMessageHeading: styled("h4", {
    className: twMerge(["w-full text-base text-gray-500", dosis.className]),
  }),
});

export const props = {
  LinkContainer: cva("", {
    variants: {
      isLogged: {
        true: "",
        false: "justify-center",
      },
    },
  }),
  AddNewMessageHeading: cva("", {
    variants: {
      addIcon: {
        true: "",
        false: "text-center font-medium",
      },
    },
  }),
};
