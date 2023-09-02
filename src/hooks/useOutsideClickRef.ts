import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";

export default function useOutsideClickRef({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!ref?.current?.contains(event.target as HTMLDivElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [ref]);

  return ref;
}
