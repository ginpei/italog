import { MyPageContent } from "./MyPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getUserVisitPlace } from "@/components/placeCheckin/visitPlaceDb";
import { getFriendProfileRecords } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    return <div>Not logged in</div>;
  }

  const [visits, friends] = await Promise.all([
    getUserVisitPlace(profile.id),
    getFriendProfileRecords(profile.id),
  ]);

  return (
    <StraightPageLayout profile={profile}>
      <MyPageContent friends={friends} profile={profile} checkins={visits} />
    </StraightPageLayout>
  );
}
