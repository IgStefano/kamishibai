import Header from "./header";

export interface LayoutProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  message?:
    | "Abra uma nova campanha e crie as aventuras do seu grupo!"
    | "Entre para ver e criar aventuras"
    | "Crie agora uma aventura para esta campanha!";
  subHeading?: string;
  addIcon?: boolean;
  isLogged?: boolean;
  mutation?: () => void;
}

export default function Layout({
  children,
  className = "",
  message = undefined,
  subHeading = "",
  addIcon = false,
  isLogged = false,
  mutation = undefined,
}: LayoutProps) {
  return (
    <section className={`w-full ${className}`}>
      <Header
        message={message}
        subHeading={subHeading}
        addIcon={addIcon}
        isLogged={isLogged}
        mutation={mutation}
      />
      {children}
    </section>
  );
}
