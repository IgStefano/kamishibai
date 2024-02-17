import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import type { ModalOptions } from "../contexts/modal";

interface useModalStatusProps {
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

export default function useModalStatus({
  mutation,
  isModalOpen,
  setModalOptions,
  modalOptions,
}: useModalStatusProps) {
  useEffect(() => {
    if (isModalOpen) {
      if (mutation.isError) {
        setModalOptions({ ...modalOptions, status: "isError" });
      }
      if (mutation.isIdle) {
        setModalOptions({ ...modalOptions, status: "isIdle" });
      }
      if (mutation.isLoading) {
        setModalOptions({ ...modalOptions, status: "isLoading" });
      }
      if (mutation.isSuccess) {
        setModalOptions({ ...modalOptions, status: "isSuccess" });
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
