import type { ComponentType, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Children = {
  children: ReactNode | ReactNode[];
};

interface StylizeProps {
  className: string;
}

type NonSVGIntrinsicElements = {
  [K in keyof JSX.IntrinsicElements as K extends "svg"
    ? never
    : K extends "symbol"
    ? never
    : K]: JSX.IntrinsicElements[K];
};

type StyledComponentProps<T extends keyof NonSVGIntrinsicElements> =
  HTMLAttributes<T> &
    Children & {
      ref?: unknown;
    };

export function styled<T extends keyof NonSVGIntrinsicElements>(
  Tag: T,
  defaultStyles: StylizeProps
) {
  return function stylize(props: StyledComponentProps<T>) {
    const { children, className, ...rest } = props;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const Component = Tag as any;
    const classNames = twMerge(defaultStyles.className, className || "");

    return (
      <Component className={classNames} {...rest}>
        {children || ""}
      </Component>
    );
  };
}

type StyledComponents<T extends Record<string, ComponentType<Children>>> = {
  [K in keyof T]: T[K];
};

export function createStyles<T extends Record<string, ComponentType<Children>>>(
  components: T
): StyledComponents<T> {
  return components as StyledComponents<T>;
}
