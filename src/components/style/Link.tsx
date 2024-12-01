import NextLink from "next/link";
import { ComponentProps } from "react";

export type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  as?: "a" | "Link";
  href: string;
};

export function Link({
  as,
  className = "",
  ...props
}: LinkProps): React.JSX.Element {
  const Tag = as === "a" ? "a" : NextLink;

  return (
    <Tag
      className={`
        ${className} Link text-blue-700 underline
        hover:text-red-700
        active:text-red-900

        dark:text-cyan-400
        hover:dark:text-orange-400
        active:dark:text-orange-700
      `}
      {...props}
    />
  );
}
