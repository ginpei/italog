export interface VStackProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  gap?: `gap-${4 | 8}`;
}

export function VStack({
  as = "div",
  className = "",
  children,
  gap = `gap-4`,
}: VStackProps): JSX.Element {
  const TagName = as;
  return (
    <TagName className={`${className} VStack flex flex-col ${gap}`}>
      {children}
    </TagName>
  );
}
