import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { ActivityClient } from "../checkbox/checkbox-wrapper";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  required?: boolean;
  disabled?: boolean;
  addNew: boolean;
  placeholder?: string;
  hidden?: boolean;
  activities: ActivityClient[];
  setActivities: Dispatch<SetStateAction<ActivityClient[]>>;
  setPopulate?: Dispatch<SetStateAction<string>>;
}

export default function ActivityInput({
  label,
  required = false,
  disabled = false,
  addNew,
  placeholder = "",
  hidden = false,
  activities,
  setActivities,
  setPopulate = undefined,
  ...rest
}: InputProps) {
  const [value, setValue] = useState("");

  const [lengthError, setLengthError] = useState(false);
  const handleAddActivity = () => {
    if (typeof value === "string" && value.length < 5) {
      setLengthError(true);
      return;
    }
    setLengthError(false);

    if (setActivities && activities) {
      setActivities((prevActivities) => [
        ...prevActivities,
        {
          activityName: typeof value === "string" ? value : "",
          activityStatus: "not_started",
        },
      ]);
      setValue("");
    }
  };

  return (
    <div className={classnames(hidden ? "hidden" : "flex w-full flex-col")}>
      <label htmlFor="activities" className="pb-1 text-xs text-burgundy">
        {label} {required && " *"}
      </label>
      <div className="relative">
        <input
          id="activities"
          name="activities"
          className="w-full rounded border border-gray-50 bg-lightYellow p-2 text-xs transition-all duration-300 focus-visible:border-solid focus-visible:border-burgundy disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-80 "
          disabled={disabled}
          required={required && !addNew}
          onChange={(e) => {
            setValue(e.target.value);
            if (setPopulate) setPopulate(e.target.value);
          }}
          value={value}
          placeholder={placeholder}
          onKeyDown={(e) => {
            e.key === "Enter" && addNew && handleAddActivity();
          }}
          {...rest}
        />
        <Icon
          onClick={() => handleAddActivity()}
          icon="ph:plus"
          className="absolute right-2 top-2 cursor-pointer text-burgundy-400"
        />
        {lengthError && (
          <p className="mt-1 text-xs text-burgundy-300">
            A atividade precisa ter ao menos 5 caracteres.
          </p>
        )}
      </div>
    </div>
  );
}
