import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/lib/user/profileSession";
import { getUserVisitPlace } from "@/components/lib/visit/visitPlaceDb";
import { MyPageContent } from "@/components/pages/my/MyPageContent";

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
