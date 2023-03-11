import Header from "../header";

interface LayoutProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  message?: string;
  addIcon?: boolean;
  isLogged?: boolean;
}

export default function Layout({
  children,
  className = "",
  message = "",
  addIcon = false,
  isLogged = false,
}: LayoutProps) {
  return (
    <main className={`w-full ${className}`}>
      <Header message={message} addIcon={addIcon} isLogged={isLogged} />
      {children}
    </main>
  );
}
