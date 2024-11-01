import { notFound } from "next/navigation";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { hasFriendshipRecord } from "@/components/lib/user/friendshipDb";
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
  const [currentUserProfile, pageUserProfile] = await Promise.all([
    getSessionProfile(),
    getProfileRecord(userId),
  ]);

  if (!currentUserProfile) {
    // TODO 401
    return <div>401</div>;
  }

  if (!pageUserProfile) {
    notFound();
  }

  const isFriend =
    currentUserProfile.id !== pageUserProfile.id &&
    (await hasFriendshipRecord(currentUserProfile.id, pageUserProfile.id));

  return (
    <StraightPageLayout profile={currentUserProfile}>
      <UserPageContent
        currentUser={currentUserProfile}
        isFriend={isFriend}
        profile={pageUserProfile}
      />
    </StraightPageLayout>
  );
}
