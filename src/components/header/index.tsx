import { Icon } from "@iconify/react";
import localFont from "@next/font/local";
import { signOut } from "next-auth/react";
import { dosis } from "../../styles/fonts";
const LTCarpet = localFont({
  src: "../../../public/assets/fonts/LT Carpet/LTCarpet.ttf",
});

interface HeaderProps {
  message?: string;
  addIcon?: boolean;
  isLogged?: boolean;
}

export default function Header({
  message = "",
  addIcon = false,
  isLogged = false,
}: HeaderProps) {
  return (
    <header className="flex flex-col">
      <div className="flex items-center justify-between pb-6">
        <h1
          className={`w-full ${
            !isLogged ? "text-center" : ""
          } text-4xl font-medium text-burgundy ${LTCarpet.className}`}
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
      {message && (
        <div className="flex justify-between gap-2">
          <h4
            className={`w-full ${dosis.className} ${
              !addIcon ? "text-center font-medium" : ""
            } text-base text-gray-500`}
          >
            {message}
          </h4>
          {addIcon && (
            <Icon
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
