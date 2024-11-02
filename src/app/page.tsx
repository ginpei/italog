import { HomePageContent } from "./HomePageContent";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/lib/user/profileSession";

export default async function Home() {
  const profile = await getSessionProfile();

  return (
    <StraightPageLayout profile={profile}>
      <HomePageContent profile={profile} />
    </StraightPageLayout>
  );
}
