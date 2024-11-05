import { HomePageContent } from "./HomePageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getCheckinTimeline } from "@/components/placeCheckin/placeCheckinDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Home() {
  const profile = await getSessionProfile();
  const userId = profile?.id;

  const checkins = userId ? await getCheckinTimeline(userId) : [];

  return (
    <StraightPageLayout profile={profile}>
      <HomePageContent profile={profile} checkins={checkins} />
    </StraightPageLayout>
  );
}
