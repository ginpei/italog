export interface VStackProps {
  className?: string;
  children: React.ReactNode;
  gap?: `gap-${4 | 8}`;
}

export function VStack({
  className = "",
  children,
  gap = `gap-4`,
}: VStackProps): JSX.Element {
  return (
    <div className={`${className} VStack flex flex-col ${gap}`}>{children}</div>
  );
}
