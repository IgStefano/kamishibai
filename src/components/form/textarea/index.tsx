import { QuestFormContext } from "@/src/contexts/questForm";
import type { ComponentPropsWithoutRef } from "react";
import { useContext } from "react";
import Label from "../label";

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
}: TextAreaProps) {
  const { dispatch, state } = useContext(QuestFormContext);

  const fieldName = (Object.keys(state) as (keyof typeof state)[]).find(
    (key) => key === name
  );

  return (
    <div className="flex w-full flex-col">
      <Label htmlFor={name} text={label} required={required} />
      <textarea
        className="h-32 w-full resize-none rounded border border-gray-50 bg-lightYellow p-2 text-xs transition-all duration-300 focus-visible:border-solid focus-visible:border-burgundy disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80"
        id={name}
        name={name}
        disabled={disabled}
        required={required}
        onChange={(e) => {
          dispatch({
            fieldName: name,
            payload: e.target.value,
            type: "field",
          });
        }}
        placeholder={placeholder}
        value={fieldName !== "description" ? "" : state[fieldName]}
      />
    </div>
  );
}
