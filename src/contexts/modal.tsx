import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";
import type { Campaign, Quest } from "../types/shared.types";

export type ModalOptions = {
  module: "campaign" | "quest";
  type: "new" | "edit";
  mutation: () => void;
  populate?: {
    campaign?: { name: Campaign["name"] };
    quest?: Quest;
  };
  status?: "isSuccess" | "isLoading" | "isError" | "isIdle";
};

interface ModalContextProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalOptions: ModalOptions;
  setModalOptions: Dispatch<SetStateAction<ModalOptions>>;
}

export const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  setIsModalOpen: () => null,
  modalOptions: {
    module: "campaign",
    type: "new",
    mutation: () => null,
    populate: undefined,
    status: "isIdle",
  },
  setModalOptions: () => null,
});

export function ModalProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    module: "campaign",
    type: "new",
    mutation: () => null,
    populate: undefined,
    status: "isIdle",
  });

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        modalOptions,
        setModalOptions,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
