export interface ContentProps {
  children: React.ReactNode;
  name?: string;
}

export function Content({ children, name = "" }: ContentProps): JSX.Element {
  return (
    <div className={`${name} Content mx-auto w-full max-w-screen-md px-4`}>
      {children}
    </div>
  );
}
