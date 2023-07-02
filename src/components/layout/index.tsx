import type { Dispatch, SetStateAction } from "react";
import Header from "../header";

interface LayoutProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  message?: string;
  subHeading?: string;
  addIcon?: boolean;
  isLogged?: boolean;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Layout({
  children,
  className = "",
  message = "",
  subHeading = "",
  addIcon = false,
  isLogged = false,
  setIsModalOpen,
}: LayoutProps) {
  return (
    <section className={`w-full ${className}`}>
      <Header
        message={message}
        subHeading={subHeading}
        addIcon={addIcon}
        isLogged={isLogged}
        setIsModalOpen={setIsModalOpen}
      />
      {children}
    </section>
  );
}
