import Link from "next/link";
import { LinkProps } from "../style/Link";

export function NavBarLink({
  as = "Link",
  className = "",
  ...props
}: LinkProps): React.JSX.Element {
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
