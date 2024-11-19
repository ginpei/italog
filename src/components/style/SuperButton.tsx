import NextLink from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { LinkProps } from "./Link";
import { buttonThemeClassNames } from "./controlClassNames";

export const superButtonShapeClassNames = `
  grid size-32 items-center justify-center border text-sm
`;

/**
 * TODO rename
 */
export function SuperButton({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">): React.JSX.Element {
  return (
    <button
      className={`${className} SuperButton ${superButtonShapeClassNames} ${buttonThemeClassNames}
      `}
      {...props}
    />
  );
}

export function SuperButtonLink({
  as,
  className,
  ...props
}: LinkProps): React.JSX.Element {
  const Tag = as === "a" ? "a" : NextLink;

  return (
    <Tag
      className={`${className} SuperButtonLink ${superButtonShapeClassNames} ${buttonThemeClassNames}
      `}
      {...props}
    />
  );
}
