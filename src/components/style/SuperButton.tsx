import NextLink from "next/link";
import { ComponentProps, ComponentPropsWithoutRef } from "react";
import { buttonThemeClassNames } from "./controlClassNames";

const superButtonShapeClassNames = `
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
  className,
  ...props
}: ComponentProps<typeof NextLink>): React.JSX.Element {
  return (
    <NextLink
      className={`${className} SuperButtonLink ${superButtonShapeClassNames} ${buttonThemeClassNames}
      `}
      {...props}
    />
  );
}
