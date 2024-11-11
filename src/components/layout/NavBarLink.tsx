import Link from "next/link";
import { ComponentProps } from "react";

export type NavBarLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  as?: "a" | "Link";
  href: string;
};

export function NavBarLink({
  as = "Link",
  className,
  ...props
}: NavBarLinkProps): React.JSX.Element {
  const Tag = as === "a" ? "a" : Link;

  return (
    <Tag
      className={`${className} NavBarLink
        px-4 text-inherit
        hover:bg-white/20
        active:bg-white/10
      `}
      {...props}
    />
  );
}
