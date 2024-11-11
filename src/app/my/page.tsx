import { MyPageContent } from "./MyPageContent";
import { getUserCheckinRecords } from "@/components/checkin/checkinDb";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getFriendProfileRecords } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    throw new Error("Need login");
  }

  const [checkins, friends] = await Promise.all([
    getUserCheckinRecords(profile.id),
    getFriendProfileRecords(profile.id),
  ]);

  return (
    <StraightPageLayout profile={profile}>
      <MyPageContent friends={friends} profile={profile} checkins={checkins} />
    </StraightPageLayout>
  );
}
