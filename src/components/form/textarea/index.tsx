import { QuestFormContext } from "@/src/contexts/questForm";
import type { ComponentPropsWithoutRef } from "react";
import { useContext, useState } from "react";

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export default function TextArea({
  label,
  name,
  required,
  disabled,
  placeholder,
  ...rest
}: TextAreaProps) {
  const [value, setValue] = useState("");
  const { dispatch } = useContext(QuestFormContext);

  return (
    <div className="flex w-full flex-col">
      <label className="pb-1 text-xs text-burgundy" htmlFor={name}>
        {label} {required && " *"}
      </label>
      <textarea
        className="h-32 w-full resize-none rounded border border-gray-50 bg-lightYellow p-2 text-xs transition-all duration-300 focus-visible:border-solid focus-visible:border-burgundy disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80"
        id={name}
        name={name}
        disabled={disabled}
        required={required}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() =>
          dispatch({ fieldName: name, payload: value, type: "field" })
        }
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
