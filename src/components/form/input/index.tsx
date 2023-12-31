import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { useContext, useState } from "react";
import type { ActivityClient } from "../checkbox/checkbox-wrapper";
import { QuestFormContext } from "@/src/contexts/questForm";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  addNew?: boolean;
  placeholder?: string;
  hidden?: boolean;
  activities?: ActivityClient[];
  setActivities?: Dispatch<SetStateAction<ActivityClient[]>>;
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
  activities,
  setActivities,
  setPopulate = undefined,
  ...rest
}: InputProps) {
  const { dispatch, state } = useContext(QuestFormContext);

  const fieldName = (Object.keys(state) as (keyof typeof state)[]).find(
    (key) => key === name
  ) as keyof typeof state;
  const [value, setValue] = useState(
    fieldName && typeof state[fieldName] === "string" ? state[fieldName] : ""
  );

  const [lengthError, setLengthError] = useState(false);
  const handleAddActivity = () => {
    if (typeof value === "string" && value.length < 5) {
      setLengthError(true);
      return;
    }
    setLengthError(false);

    if (setActivities && activities) {
      setActivities([
        ...activities,
        {
          activityName: typeof value === "string" ? value : "",
          activityStatus: "not_started",
        },
      ]);
      setValue("");
      dispatch({
        fieldName: name,
        payload: "",
        type: "field",
      });
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
          onChange={(e) => {
            setValue(e.target.value);
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
          onKeyDown={(e) => {
            e.key === "Enter" && addNew && handleAddActivity();
          }}
          {...rest}
        />
        {addNew && setActivities && activities && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
