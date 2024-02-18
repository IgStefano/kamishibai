/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import useOutsideClickRef from "@/src/hooks/useOutsideClickRef";
import { useContext } from "react";
import Button from "../../ui/button";
import { ModalContext } from "@/src/contexts/modal";
import CampaignModule from "./campaign-module";
import QuestModule from "./quest-module";
import { S, props } from "./styles";

export default function Modal() {
  const { isModalOpen, setIsModalOpen, modalOptions } =
    useContext(ModalContext);
  const modalRef = useOutsideClickRef({ setIsOpen: setIsModalOpen });
  const { module, type, mutation, status } = modalOptions;

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
    <S.ModalSection
      role="dialog"
      className={props.ModalSection({ isModalOpen })}
    >
      <S.ModalContainer ref={modalRef} role="dialog">
        <S.ModalHeading>{label[type].title}</S.ModalHeading>
        <S.ModalContent className="max-h-[60vh] w-full overflow-y-auto">
          {content[module]}
        </S.ModalContent>
        <Button
          label={label[type].button}
          onClick={mutation}
          disabled={status === "isLoading"}
        />
        {status === "isError" && (
          <S.ModalErrorText>
            Encontramos um erro ao tentar {label[type].error}. Por favor, tente
            novamente mais tarde.
          </S.ModalErrorText>
        )}
      </S.ModalContainer>
    </S.ModalSection>
  );
}
