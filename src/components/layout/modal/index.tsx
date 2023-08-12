/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import useOutsideClickRef from "@/src/hooks/useOutsideClickRef";
import { LTCarpet } from "@pages/_app";
import { useContext, type ReactNode } from "react";
import { classnames } from "../../../utils/classnames";
import Button from "../../button";
import { ModalContext } from "@/src/contexts/modal";

interface ModalProps {
  title: string;
  buttonLabel: string;
  content: ReactNode | ReactNode[];
  mutation: () => void;
}

export default function Modal({
  buttonLabel,
  content,
  title,
  mutation,
}: ModalProps) {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const modalRef = useOutsideClickRef({ setIsOpen: setIsModalOpen });

  return (
    <section
      role="dialog"
      className={classnames(
        "absolute top-0 right-0 flex h-full w-full items-center justify-center bg-[#000] bg-opacity-80 transition-all duration-300",
        !isModalOpen ? "pointer-events-none opacity-0" : ""
      )}
    >
      <div
        ref={modalRef}
        role="dialog"
        className="relative flex max-h-[85vh] w-[40vw] flex-col items-center justify-center gap-4 rounded-lg bg-gray-50 p-6"
      >
        <h3
          className={classnames(
            LTCarpet.className,
            "mx-2 w-full text-center text-4xl uppercase text-gray-500"
          )}
        >
          {title}
        </h3>
        <div className="max-h-[60vh] w-full overflow-y-auto">{content}</div>
        <Button label={buttonLabel} onClick={mutation} />
      </div>
    </section>
  );
}
