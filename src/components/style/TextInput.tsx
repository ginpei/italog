import { ComponentPropsWithoutRef } from "react";

export interface TextInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  type?: "text" | "password" | "email" | "search" | "url" | "tel";
}

export function TextInput({
  className,
  ...props
}: TextInputProps): React.JSX.Element {
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
