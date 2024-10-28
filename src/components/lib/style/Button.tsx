import { ComponentPropsWithoutRef } from "react";

export function Button({
  className,
  ...props
}: ComponentPropsWithoutRef<"button">): React.JSX.Element {
  return (
    <button
      className={`Button ${className} border border-gray-400 bg-gray-50 p-2 hover:bg-gray-100 active:bg-gray-200`}
      {...props}
    />
  );
}
