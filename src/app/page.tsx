import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/lib/user/profileSession";
import { HomePageContent } from "@/components/pages/home/HomePageContent";

export default async function Home() {
  const profile = await getSessionProfile();

  return (
    <StraightPageLayout profile={profile}>
      <HomePageContent profile={profile} />
    </StraightPageLayout>
  );
}
