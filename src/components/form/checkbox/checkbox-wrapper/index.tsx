import type { Dispatch, SetStateAction } from "react";
import Checkbox from "..";
import { AnimatePresence } from "framer-motion";

export type CheckboxT = {
  id: string;
  name: string;
  label: string;
  editable?: boolean;
  checked?: boolean;
  disabled?: boolean;
  deletable?: boolean;
  checkboxes?: CheckboxT[];
  setCheckboxes?: Dispatch<SetStateAction<string[]>>;
};

interface CheckboxWrapperProps {
  checkboxes: CheckboxT[];
  label?: string;
  required?: boolean;
  setCheckboxes?: Dispatch<SetStateAction<string[]>>;
}

export default function CheckboxWrapper({
  checkboxes,
  label = "",
  required = false,
  setCheckboxes,
}: CheckboxWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="pb-1 text-xs text-burgundy">
        {label} {required && " *"}
      </label>
      <ul className="flex flex-col gap-2">
        <AnimatePresence>
          {checkboxes.map((checkbox) => (
            <Checkbox
              id={checkbox.id}
              label={checkbox.label}
              deletable={checkbox.deletable}
              name={checkbox.name}
              checked={checkbox.checked}
              disabled={checkbox.disabled}
              editable={checkbox.editable}
              key={checkbox.id}
              setCheckboxes={setCheckboxes}
              checkboxes={checkboxes}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
