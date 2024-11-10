import { HomePageContent } from "./HomePageContent";
import { getTimelineCheckinRecords } from "@/components/checkin/checkinDb";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Home() {
  const profile = await getSessionProfile();
  const userId = profile?.id;

  const checkins = userId ? await getTimelineCheckinRecords(userId) : [];

  return (
    <StraightPageLayout profile={profile}>
      <HomePageContent profile={profile} checkins={checkins} />
    </StraightPageLayout>
  );
}
