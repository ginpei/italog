import { notFound } from "next/navigation";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getProfileRecord } from "@/components/lib/user/profileDb";
import { getSessionProfile } from "@/components/lib/user/profileSession";
import { UserPageContent } from "@/components/pages/user/UserPageContent";

interface Params {
  params: {
    userId: string;
  };
}

export default async function Page({ params }: Params): Promise<JSX.Element> {
  const userId = decodeURI(params.userId);
  const [loginUserProfile, pageUserProfile] = await Promise.all([
    getSessionProfile(),
    getProfileRecord(userId),
  ]);

  if (!pageUserProfile) {
    notFound();
  }

  return (
    <StraightPageLayout profile={loginUserProfile}>
      <UserPageContent profile={pageUserProfile} />
    </StraightPageLayout>
  );
}
