/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { ModalContext } from "@/src/contexts/modal";
import Link from "next/link";
import type { LayoutProps } from "@components/layout";
import { S, props } from "./styles";

type HeaderProps = Omit<LayoutProps, "children" | "className">;

export default function Header({
  message = undefined,
  subHeading = "",
  addIcon = false,
  isLogged = false,
  mutation = undefined,
}: HeaderProps) {
  const { setIsModalOpen, setModalOptions } = useContext(ModalContext);
  return (
    <S.Header>
      <S.LinkContainer className={props.LinkContainer({ isLogged })}>
        <Link href={"/"}>
          <S.Title>Kamishibai</S.Title>
        </Link>
        {isLogged && (
          <S.LogoutText onClick={() => void signOut()}>Deslogar</S.LogoutText>
        )}
      </S.LinkContainer>
      {subHeading && <S.SubHeading>{subHeading}</S.SubHeading>}
      {addIcon && message && (
        <S.AddNewMessageContainer>
          <S.AddNewMessageHeading
            className={props.AddNewMessageHeading({ addIcon })}
          >
            {message}
          </S.AddNewMessageHeading>
          {addIcon && setIsModalOpen && mutation && message && (
            <Icon
              onClick={() => {
                setIsModalOpen(true);
                setModalOptions({
                  module:
                    message === "Crie agora uma aventura para esta campanha!"
                      ? "quest"
                      : "campaign",
                  type: "new",
                  mutation,
                });
              }}
              style={{ clipPath: "circle(45%)" }}
              className="clip cursor-pointer rounded-full text-[32px] text-burgundy transition-colors duration-300 hover:bg-burgundy hover:text-gray-50"
              icon="ph:plus-circle"
            />
          )}
        </S.AddNewMessageContainer>
      )}
    </S.Header>
  );
}
