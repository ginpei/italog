import { Profile } from "../user/Profile";
import { Content } from "./Content";
import { NavBar } from "./NavBar";
import { Footer } from "./NavBlock";

export interface StraightPageLayoutProps {
  children: React.ReactNode;
  navBarTitle?: string;
  profile: Profile | null;
}

export function StraightPageLayout({
  children,
  navBarTitle = "Italog",
  profile,
}: StraightPageLayoutProps): JSX.Element {
  return (
    <div className="StraightPageLayout flex flex-col gap-4">
      <NavBar profile={profile} title={navBarTitle} />
      <div className="min-h-[60vh]">
        <Content>
          <div className="flex flex-col gap-4">{children}</div>
        </Content>
      </div>
      <Footer />
    </div>
  );
}
