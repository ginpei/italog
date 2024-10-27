import { ComponentPropsWithoutRef } from "react";

export function H1({
  className,
  ...props
}: ComponentPropsWithoutRef<"h1">): React.JSX.Element {
  return <h1 className={`H1 ${className} text-5xl font-bold`} {...props} />;
}

export function H2({
  className,
  ...props
}: ComponentPropsWithoutRef<"h2">): React.JSX.Element {
  return <h2 className={`H2 ${className} text-3xl font-bold`} {...props} />;
}

export function H3({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">): React.JSX.Element {
  return <h3 className={`H3 ${className} text-xl font-bold`} {...props} />;
}
