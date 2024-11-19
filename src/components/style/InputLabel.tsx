import { ComponentPropsWithoutRef, ElementType } from "react";

export type InputLabelProps = ComponentPropsWithoutRef<"label"> & {
  as?: ElementType;
};

export function InputLabel({
  as: TagName = "label",
  className,
  ...props
}: InputLabelProps): React.JSX.Element {
  return (
    <TagName className={`${className} InputLabel flex flex-col`} {...props} />
  );
}
