import { ComponentPropsWithoutRef } from "react";

export function TextInput({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"input">, "type">): React.JSX.Element {
  return (
    <input
      className={`
        ${className} TextInput
        border border-gray-400 p-2
        hover:border-gray-500
        disabled:bg-gray-300 disabled:text-gray-500
      `}
      type="text"
      {...props}
    />
  );
}
