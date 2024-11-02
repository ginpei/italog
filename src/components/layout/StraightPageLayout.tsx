import { Profile } from "../user/Profile";
import { Content } from "./Content";
import { NavBar } from "./NavBar";
import { Footer } from "./NavBlock";
import { VStack } from "./VStack";

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
    <VStack className="StraightPageLayout">
      <NavBar profile={profile} title={navBarTitle} />
      <div className="min-h-[60vh]">
        <Content>{children}</Content>
      </div>
      <Footer />
    </VStack>
  );
}
