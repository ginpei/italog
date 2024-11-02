import NextLink from "next/link";
import { ComponentProps, ComponentPropsWithoutRef } from "react";

export function Select({
  className,
  ...props
}: ComponentPropsWithoutRef<"select">): React.JSX.Element {
  return (
    <select
      className={`
        ${className} Select
        rounded-none border border-gray-400 bg-white
        p-2
        hover:border-gray-500
        active:bg-gray-200
        disabled:bg-gray-300 disabled:text-gray-500
      `}
      {...props}
    />
  );
}

export function SelectLink({
  className,
  ...props
}: ComponentProps<typeof NextLink>): React.JSX.Element {
  return (
    <NextLink
      className={`Select ${className} border border-gray-400 bg-gray-50 p-2 hover:bg-gray-100 active:bg-gray-200`}
      {...props}
    />
  );
}
