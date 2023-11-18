/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import useOutsideClickRef from "@/src/hooks/useOutsideClickRef";
import { LTCarpet } from "@pages/_app";
import { useContext } from "react";
import { classnames } from "../../../utils/classnames";
import Button from "../../button";
import { ModalContext } from "@/src/contexts/modal";
import CampaignModule from "./campaign-module";
import QuestModule from "./quest-module";

export default function Modal() {
  const { isModalOpen, setIsModalOpen, modalOptions } =
    useContext(ModalContext);
  const modalRef = useOutsideClickRef({ setIsOpen: setIsModalOpen });
  const { module, type, mutation, state } = modalOptions;

  const content = {
    campaign: <CampaignModule />,
    quest: <QuestModule type={type} />,
  };

  const label = {
    new: {
      button: `Criar ${module === "quest" ? "Aventura" : "Campanha"}`,
      title: `Crie a sua ${module === "quest" ? "aventura" : "campanha"}`,
      error: `criar a sua ${module === "quest" ? "aventura" : "campanha"}`,
    },
    edit: {
      button: `Editar ${module === "quest" ? "Aventura" : "Campanha"}`,
      title: `Edite esta ${module === "quest" ? "aventura" : "campanha"}`,
      error: `editar a sua ${module === "quest" ? "aventura" : "campanha"}`,
    },
  };

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
          {label[type].title}
        </h3>
        <div className="max-h-[60vh] w-full overflow-y-auto">
          {content[module]}
        </div>
        <Button
          label={label[type].button}
          onClick={mutation}
          disabled={state === "isLoading"}
        />
        {state === "isError" && (
          <p className="text-center text-sm font-bold text-burgundy-300">
            Encontramos um erro ao tentar {label[type].error}. Por favor, tente
            novamente mais tarde.
          </p>
        )}
      </div>
    </section>
  );
}
