export interface CheckinListProps {
  children: React.ReactNode;
}

export function CheckinList({ children }: CheckinListProps): JSX.Element {
  return <div className="CheckinList flex flex-col gap-1">{children}</div>;
}
