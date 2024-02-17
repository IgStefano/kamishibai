import { classnames } from "@utils/classnames";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { useContext } from "react";
import { QuestFormContext } from "@/src/contexts/questForm";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  addNew?: boolean;
  placeholder?: string;
  hidden?: boolean;
  setPopulate?: Dispatch<SetStateAction<string>>;
}

export default function Input({
  name,
  label,
  required = false,
  disabled = false,
  addNew = false,
  placeholder = "",
  hidden = false,
  setPopulate = undefined,
  ...rest
}: InputProps) {
  const { dispatch, state } = useContext(QuestFormContext);

  const fieldName = (Object.keys(state) as (keyof typeof state)[]).find(
    (key) => key === name
  ) as keyof typeof state;

  return (
    <div className={classnames(hidden ? "hidden" : "flex w-full flex-col")}>
      <label className="pb-1 text-xs text-burgundy" htmlFor={name}>
        {label} {required && " *"}
      </label>
      <div className="relative">
        <input
          className="w-full rounded border border-gray-50 bg-lightYellow p-2 text-xs transition-all duration-300 focus-visible:border-solid focus-visible:border-burgundy disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80 "
          disabled={disabled}
          required={required && !addNew}
          name={name}
          id={name}
          onChange={(e) => {
            dispatch({
              fieldName: name,
              payload: e.target.value,
              type: "field",
            });
            if (setPopulate) setPopulate(e.target.value);
          }}
          value={
            fieldName === "startDate"
              ? state["startDate"]?.toISOString().substring(0, 10)
              : fieldName === "activities"
              ? ""
              : state[fieldName]
          }
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </div>
  );
}
