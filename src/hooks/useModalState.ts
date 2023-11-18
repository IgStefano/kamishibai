import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import type { ModalOptions } from "../contexts/modal";

interface useModalStateProps {
  mutation: {
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    error?: unknown;
  };
  isModalOpen: boolean;
  setModalOptions: Dispatch<SetStateAction<ModalOptions>>;
  modalOptions: ModalOptions;
}

export default function useModalState({
  mutation,
  isModalOpen,
  setModalOptions,
  modalOptions,
}: useModalStateProps) {
  useEffect(() => {
    if (isModalOpen) {
      if (mutation.isError) {
        setModalOptions({ ...modalOptions, state: "isError" });
      }
      if (mutation.isIdle) {
        setModalOptions({ ...modalOptions, state: "isIdle" });
      }
      if (mutation.isLoading) {
        setModalOptions({ ...modalOptions, state: "isLoading" });
      }
      if (mutation.isSuccess) {
        setModalOptions({ ...modalOptions, state: "isSuccess" });
      }
    }
  }, [
    isModalOpen,
    mutation.isIdle,
    mutation.isError,
    mutation.isLoading,
    mutation.isSuccess,
  ]);
}
