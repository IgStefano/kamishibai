import { Icon } from "@iconify/react";
import colors from "tailwindcss/colors";

interface ButtonProps {
  label: string;
  icon?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  label,
  icon,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      className="py-2- flex w-full items-center justify-center gap-4 rounded-3xl bg-burgundy p-2 text-base font-bold text-gray-50 drop-shadow-default transition-all duration-300 hover:bg-burgundy-900 focus:bg-burgundy-900 disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80"
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} color={colors.gray["50"]} />}
      {label}
    </button>
  );
}
