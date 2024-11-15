import NextLink from "next/link";
import { ComponentPropsWithoutRef } from "react";
import { LinkProps } from "./Link";
import {
  buttonThemeClassNames,
  controlShapeClassNames,
} from "./controlClassNames";

export function Button({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">): React.JSX.Element {
  return (
    <button
      className={`${className} Button ${controlShapeClassNames} ${buttonThemeClassNames}`}
      {...props}
    />
  );
}

export function DangerButton({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">): React.JSX.Element {
  return (
    <button
      className={`${className} DangerButton ${controlShapeClassNames}
        border-red-700 bg-red-50 text-red-700
        hover:border-red-500
        active:bg-red-200
        disabled:border-gray-500 disabled:bg-gray-300 disabled:text-gray-500
      `}
      {...props}
    />
  );
}

export function ButtonLink({
  as,
  className,
  ...props
}: LinkProps): React.JSX.Element {
  const Tag = as === "a" ? "a" : NextLink;

  return (
    <Tag
      className={`${className} ButtonLink
        inline-grid place-items-center
        ${controlShapeClassNames} ${buttonThemeClassNames}
      `}
      {...props}
    />
  );
}

export function ButtonLabel({
  className,
  disabled,
  ...props
}: ComponentPropsWithoutRef<"label"> & {
  disabled?: boolean;
}): React.JSX.Element {
  return (
    <fieldset className="contents" disabled={disabled}>
      <label
        className={`${className} ButtonLabel
          inline-grid cursor-pointer place-items-center
          ${controlShapeClassNames} ${buttonThemeClassNames}
        `}
        {...props}
      />
    </fieldset>
  );
}
