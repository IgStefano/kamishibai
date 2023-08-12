import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useState } from "react";

export const ModalContext = createContext<{
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}>({ isModalOpen: false, setIsModalOpen: () => null });

export function ModalProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
