import { ComponentPropsWithoutRef } from "react";
import {
  controlShapeClassNames,
  inputThemeClassNames,
} from "./controlClassNames";

export function Select({
  className,
  ...props
}: ComponentPropsWithoutRef<"select">): React.JSX.Element {
  return (
    <select
      className={`
        ${className} Select ${controlShapeClassNames} ${inputThemeClassNames}`}
      {...props}
    />
  );
}
