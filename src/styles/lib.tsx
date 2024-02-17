import type { ComponentType, HTMLAttributes, ReactNode } from "react";

type GenericStyle = {
  children: ReactNode | ReactNode[];
};

interface StylizeProps {
  className: string;
}

type styledProps = HTMLAttributes<unknown> & GenericStyle;

export function styled(
  Tag: keyof JSX.IntrinsicElements,
  defaultStyles: StylizeProps
) {
  return function stylize(props: styledProps) {
    const { children, ...rest } = props;

    return (
      <Tag className={defaultStyles.className} {...rest}>
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
