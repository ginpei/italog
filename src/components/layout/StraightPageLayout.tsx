import { Session } from "@auth0/nextjs-auth0";
import { Content } from "./Content";
import { NavBar } from "./NavBar";
import { Footer } from "./NavBlock";

export interface StraightPageLayoutProps {
  children: React.ReactNode;
  navBarTitle?: string;
  session: Session | null | undefined;
}

export function StraightPageLayout({
  children,
  navBarTitle = "Italog",
  session,
}: StraightPageLayoutProps): JSX.Element {
  return (
    <div className="StraightPageLayout flex flex-col gap-4">
      <NavBar session={session} title={navBarTitle} />
      <div className="min-h-[60vh]">
        <Content>
          <div className="flex flex-col gap-4">{children}</div>
        </Content>
      </div>
      <Footer />
    </div>
  );
}
