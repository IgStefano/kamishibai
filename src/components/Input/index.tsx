import { useState } from "react";

interface InputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input({ name, label, required, disabled }: InputProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full flex-col">
      <label className="pb-1 text-xs text-burgundy" htmlFor={name}>
        {label} {required && " *"}
      </label>
      <input
        className="w-full rounded border border-gray-50 bg-lightYellow p-2 text-xs transition-all duration-300 focus-visible:border-solid focus-visible:border-burgundy disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80"
        disabled={disabled}
        required={required}
        name={name}
        id={name}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}
