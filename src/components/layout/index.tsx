import Header from "../header";

interface LayoutProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  message?: string;
  subHeading?: string;
  addIcon?: boolean;
  isLogged?: boolean;
  mutation?: () => void;
}

export default function Layout({
  children,
  className = "",
  message = "",
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
