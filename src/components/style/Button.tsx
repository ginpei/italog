import NextLink from "next/link";
import { ComponentProps, ComponentPropsWithoutRef } from "react";
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
  className,
  ...props
}: ComponentProps<typeof NextLink>): React.JSX.Element {
  return (
    <NextLink
      className={`${className} ButtonLink ${controlShapeClassNames} ${buttonThemeClassNames}`}
      {...props}
    />
  );
}
