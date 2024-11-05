import { MyPageContent } from "./MyPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getUserPlaceCheckin } from "@/components/placeCheckin/placeCheckinDb";
import { getFriendProfileRecords } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    return <div>Not logged in</div>;
  }

  const [checkins, friends] = await Promise.all([
    getUserPlaceCheckin(profile.id),
    getFriendProfileRecords(profile.id),
  ]);

  return (
    <StraightPageLayout profile={profile}>
      <MyPageContent friends={friends} profile={profile} checkins={checkins} />
    </StraightPageLayout>
  );
}
