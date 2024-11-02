import { MyPageContent } from "./MyPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";
import { getUserVisitPlace } from "@/components/visit/visitPlaceDb";

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    return <div>Not logged in</div>;
  }

  const visits = await getUserVisitPlace(profile.id);

  return (
    <StraightPageLayout profile={profile}>
      <MyPageContent profile={profile} visits={visits} />
    </StraightPageLayout>
  );
}
