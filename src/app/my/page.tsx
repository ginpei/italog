import { MyPageContent } from "./MyPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getFriendProfileRecords } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";
import { getUserVisitPlace } from "@/components/visit/visitPlaceDb";

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
      <MyPageContent friends={friends} profile={profile} visits={visits} />
    </StraightPageLayout>
  );
}
