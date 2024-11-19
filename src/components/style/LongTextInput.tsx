import { ComponentPropsWithoutRef } from "react";
import {
  controlShapeClassNames,
  inputThemeClassNames,
} from "./controlClassNames";

export type LongTextInputProps = ComponentPropsWithoutRef<"textarea">;

export function LongTextInput({
  className,
  ...props
}: LongTextInputProps): React.JSX.Element {
  return (
    <textarea
      className={`
        ${className} LongTextInput ${controlShapeClassNames} ${inputThemeClassNames}`}
      {...props}
    />
  );
}
