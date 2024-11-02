import { HomePageContent } from "./HomePageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";
import { getVisitTimeline } from "@/components/visit/visitPlaceDb";

export default async function Home() {
  const profile = await getSessionProfile();
  const userId = profile?.id;

  const visits = userId ? await getVisitTimeline(userId) : [];

  return (
    <StraightPageLayout profile={profile}>
      <HomePageContent profile={profile} visits={visits} />
    </StraightPageLayout>
  );
}
