import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { useContext } from "react";
import { QuestFormContext } from "@/src/contexts/questForm";
import { S, props } from "./styles";
import Label from "../label";

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
    <div className={props.Container({ hidden })}>
      <Label htmlFor={name} text={label} required={required} />
      <div className="relative">
        <S.Input
          className=" "
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
