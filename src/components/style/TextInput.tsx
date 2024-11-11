import { ComponentPropsWithoutRef } from "react";
import {
  controlShapeClassNames,
  inputThemeClassNames,
} from "./controlClassNames";

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
        ${className} TextInput ${controlShapeClassNames} ${inputThemeClassNames}`}
      type="text"
      {...props}
    />
  );
}
