import NextLink from "next/link";
import { ComponentProps } from "react";

export function Link(
  props: ComponentProps<typeof NextLink>,
): React.JSX.Element {
  const { className = "", ...otherProps } = props;
  return (
    <NextLink
      className={`
        ${className} Link text-blue-700 underline
        hover:text-red-700 focus:text-red-700
      `}
      {...otherProps}
    />
  );
}
