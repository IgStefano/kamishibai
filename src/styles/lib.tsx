import type { ComponentType, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type GenericStyle = {
  children: ReactNode | ReactNode[];
};

interface StylizeProps {
  className: string;
}

type StyledComponentProps = HTMLAttributes<unknown> & GenericStyle;

export function styled(
  Tag: keyof JSX.IntrinsicElements,
  defaultStyles: StylizeProps
) {
  return function stylize(props: StyledComponentProps) {
    const { children, className, ...rest } = props;

    const classNames = twMerge(defaultStyles.className, className);

    return (
      <Tag className={classNames} {...rest}>
        {children}
      </Tag>
    );
  };
}

type StyledComponents<T extends Record<string, ComponentType<GenericStyle>>> = {
  [K in keyof T]: T[K];
};

export function createStyles<
  T extends Record<string, ComponentType<GenericStyle>>
>(components: T): StyledComponents<T> {
  return components as StyledComponents<T>;
}
