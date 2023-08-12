import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";

type ModalOptions = {
  module: "campaign" | "quest";
  type: "new" | "edit";
  mutation: () => void;
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
  modalOptions: { module: "campaign", type: "new", mutation: () => null },
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
