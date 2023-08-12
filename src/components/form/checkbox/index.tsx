import { Icon } from "@iconify/react";
import { classnames } from "@utils/classnames";
import { useState } from "react";
import type { CheckboxT } from "./checkbox-wrapper";
import { motion } from "framer-motion";

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
  const [isDisabled, setIsDisabled] = useState(disabled);
  const [currentLabel, setCurrentLabel] = useState(label);

  return (
    <motion.li
      key={id}
      className="flex w-full justify-between transition-all duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={classnames(
          "flex w-fit items-center gap-1",
          isDisabled ? "opacity-50" : "cursor-pointer"
        )}
      >
        <input
          id={id}
          checked={isChecked}
          onChange={() => !isDisabled && setIsChecked(!isChecked)}
          className={classnames(
            // prettier-ignore
            "h-3 w-3 appearance-none bg-lightYellow-300 outline-none checked:relative checked:before:absolute checked:before:right-[1px] checked:before:top-[-5px] checked:before:text-sm checked:before:text-burgundy-700 checked:before:content-['\xb92713'] checked:before:bg-burgundy-900 ",
            !isDisabled ? "cursor-pointer" : ""
          )}
          type="checkbox"
        />
        <label
          className={classnames(
            "text-xs text-burgundy",
            !isDisabled ? "cursor-pointer" : ""
          )}
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
        </label>
      </div>
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
