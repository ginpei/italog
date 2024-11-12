import NextLink from "next/link";
import { ComponentProps } from "react";

export type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  as?: "a" | "Link";
  href: string;
};

export function Link({
  as,
  className,
  ...props
}: LinkProps): React.JSX.Element {
  const Tag = as === "a" ? "a" : NextLink;

  return (
    <Tag
      className={`
        ${className} Link text-blue-700 underline
        hover:text-red-700 focus:text-red-700
      `}
      {...props}
    />
  );
}
