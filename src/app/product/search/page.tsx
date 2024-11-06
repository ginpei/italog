import { SearchProductPageContent } from "./SearchProductPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function RegisterPage(): Promise<JSX.Element> {
  const profile = await getSessionProfile();

  if (!profile) {
    return (
      <StraightPageLayout profile={profile}>
        <h1>Please login first</h1>
      </StraightPageLayout>
    );
  }

  const recentCheckins: never[] = []; // TODO

  return (
    <StraightPageLayout profile={profile}>
      <SearchProductPageContent recentCheckins={recentCheckins} />
    </StraightPageLayout>
  );
}
