import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface InputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  addNew?: boolean;
  placeholder?: string;
  hidden?: boolean;
  activities?: string[];
  setActivities?: Dispatch<SetStateAction<string[]>>;
}

export default function Input({
  name,
  label,
  required = false,
  disabled = false,
  addNew = false,
  placeholder = "",
  hidden = false,
  activities,
  setActivities,
}: InputProps) {
  const [value, setValue] = useState("");
  const handleAddActivity = () => {
    if (setActivities && activities) {
      setActivities([...activities, value]);
      setValue("");
    }
  };

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
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
          onKeyDown={(e) => {
            e.key === "Enter" && addNew && handleAddActivity();
          }}
        />
        {addNew && setActivities && activities && (
          <Icon
            onClick={() => {
              handleAddActivity();
            }}
            icon="ph:plus"
            className="absolute right-2 top-2 cursor-pointer text-burgundy-400"
          />
        )}
      </div>
    </div>
  );
}
