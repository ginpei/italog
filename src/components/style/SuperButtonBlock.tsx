export interface SuperButtonBlockProps {
  children: React.ReactNode;
}

export function SuperButtonBlock({
  children,
}: SuperButtonBlockProps): JSX.Element {
  return <div className="SuperButtonBlock mx-auto flex gap-4">{children}</div>;
}
