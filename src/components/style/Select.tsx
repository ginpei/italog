import { ComponentPropsWithoutRef } from "react";

export function Select({
  className,
  ...props
}: ComponentPropsWithoutRef<"select">): React.JSX.Element {
  return (
    <select
      className={`
        ${className} Select
        h-10 rounded-none border border-gray-400 bg-white px-2 text-black
        hover:border-gray-500
        active:bg-gray-200
        disabled:bg-gray-300 disabled:text-gray-500
      `}
      {...props}
    />
  );
}
