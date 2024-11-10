import NextLink from "next/link";
import { ComponentProps, ComponentPropsWithoutRef } from "react";

export function Button({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">): React.JSX.Element {
  return (
    <button
      className={`
        ${className} Button
        min-h-10 border border-gray-400 bg-gray-50 p-2
        hover:border-gray-500
        active:bg-gray-200
        disabled:bg-gray-300 disabled:text-gray-500
      `}
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
      className={`
        ${className} Button
        min-h-10 border border-red-700 bg-red-50 p-2 text-red-700
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
      className={`Button ${className} border border-gray-400 bg-gray-50 p-2 hover:bg-gray-100 active:bg-gray-200`}
      {...props}
    />
  );
}
