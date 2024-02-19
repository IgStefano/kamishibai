import { Icon } from "@iconify/react";
import { useState } from "react";
import type { CheckboxT } from "./checkbox-wrapper";
import { motion } from "framer-motion";
import { S, props } from "./styles";

export default function Checkbox({
  id,
  label,
  name,
  editable = false,
  checked = false,
  disabled = false,
  deletable = false,
  checkboxes,
  setCheckboxes,
}: CheckboxT) {
  const [isChecked, setIsChecked] = useState(checked);
  const [currentLabel, setCurrentLabel] = useState(label);

  return (
    <motion.li
      key={id}
      className="flex w-full justify-between transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <S.Container className={props.Container({ disabled })}>
        <S.CheckboxInput
          id={id}
          checked={isChecked}
          onChange={() => !disabled && setIsChecked(!isChecked)}
          className={props.CheckboxInput({ disabled })}
          type="checkbox"
        />
        <S.CheckboxLabel
          className={props.CheckboxInput({ disabled })}
          htmlFor={name}
        >
          <span
            contentEditable={editable}
            suppressContentEditableWarning={editable}
            onBlur={(e) =>
              setCurrentLabel(
                (Boolean(e.currentTarget.textContent) &&
                  e.currentTarget.textContent !== "" &&
                  e.currentTarget.textContent) ||
                  label
              )
            }
          >
            {currentLabel}
          </span>
        </S.CheckboxLabel>
      </S.Container>
      {deletable && setCheckboxes && checkboxes && (
        <Icon
          onClick={() => {
            setCheckboxes([
              ...checkboxes
                .filter((checkbox) => checkbox.id !== id)
                .map((checkbox) => checkbox.name),
            ]);
          }}
          icon="ph:trash"
          className="cursor-pointer text-burgundy-400"
        />
      )}
    </motion.li>
  );
}
