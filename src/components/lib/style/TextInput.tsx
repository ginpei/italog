import { ComponentPropsWithoutRef } from "react";

export function TextInput({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"input">, "type">): React.JSX.Element {
  return (
    <input
      className={`TextInput ${className} border border-gray-400 p-2`}
      type="text"
      {...props}
    />
  );
}
