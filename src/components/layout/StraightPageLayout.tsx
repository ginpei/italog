import { Content } from "./Content";
import { NavBar } from "./NavBar";
import { Footer } from "./NavBlock";

export interface StraightPageLayoutProps {
  children: React.ReactNode;
  navBarTitle?: string;
}

export function StraightPageLayout({
  children,
  navBarTitle = "Italog",
}: StraightPageLayoutProps): JSX.Element {
  return (
    <div className="StraightPageLayout flex flex-col gap-4">
      <NavBar title={navBarTitle} />
      <div className="min-h-[60vh]">
        <Content>
          <div className="flex flex-col gap-4">{children}</div>
        </Content>
      </div>
      <Footer />
    </div>
  );
}
