/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Icon } from "@iconify/react";
import { LTCarpet } from "@pages/_app";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { dosis } from "../../styles/fonts";
import { classnames } from "../../utils/classnames";
import { ModalContext } from "@/src/contexts/modal";

interface HeaderProps {
  message?: string;
  subHeading?: string;
  addIcon?: boolean;
  isLogged?: boolean;
}

export default function Header({
  message = "",
  subHeading = "",
  addIcon = false,
  isLogged = false,
}: HeaderProps) {
  const { setIsModalOpen } = useContext(ModalContext);
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1
          className={classnames(
            "w-full text-4xl font-medium text-burgundy",
            !isLogged ? "text-center" : "",
            LTCarpet.className
          )}
        >
          Kamishibai
        </h1>
        {isLogged && (
          <span
            onClick={() => void signOut()}
            className="cursor-pointer font-bold text-gray-700 transition-all duration-300 hover:text-burgundy-700"
          >
            Deslogar
          </span>
        )}
      </div>
      {subHeading && (
        <h2
          className={classnames(
            "w-full text-2xl font-medium text-gray-500",
            LTCarpet.className
          )}
        >
          {subHeading}
        </h2>
      )}
      {message && (
        <div className="flex justify-between gap-2">
          <h4
            className={classnames(
              `w-full text-base text-gray-500`,
              dosis.className,
              !addIcon ? "text-center font-medium" : ""
            )}
          >
            {message}
          </h4>
          {addIcon && setIsModalOpen && (
            <Icon
              onClick={() => setIsModalOpen(true)}
              style={{ clipPath: "circle(45%)" }}
              className="clip cursor-pointer rounded-full text-[32px] text-burgundy transition-colors duration-300 hover:bg-burgundy hover:text-gray-50"
              icon="ph:plus-circle"
            />
          )}
        </div>
      )}
    </header>
  );
}
