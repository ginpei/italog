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
        h-10 rounded-none border border-gray-400 bg-white px-2 text-black
        invalid:bg-red-50
        hover:border-gray-500
        focus:bg-white
        disabled:bg-gray-300 disabled:text-gray-500
      `}
      type="text"
      {...props}
    />
  );
}
