import { notFound } from "next/navigation";
import { UserPageContent } from "./UserPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getUserPlaceCheckin } from "@/components/placeCheckin/placeCheckinDb";
import { hasFriendshipRecord } from "@/components/user/friendshipDb";
import { getProfileRecord } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

interface Params {
  params: {
    userId: string;
  };
}

export default async function Page({ params }: Params): Promise<JSX.Element> {
  const userId = decodeURI(params.userId);
  const [currentUserProfile, pageUserProfile, checkins] = await Promise.all([
    getSessionProfile(),
    getProfileRecord(userId),
    getUserPlaceCheckin(userId),
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

  const publicCheckins =
    isFriend || currentUserProfile.id === pageUserProfile.id ? checkins : [];

  return (
    <StraightPageLayout profile={currentUserProfile}>
      <UserPageContent
        currentUser={currentUserProfile}
        isFriend={isFriend}
        profile={pageUserProfile}
        checkins={publicCheckins}
      />
    </StraightPageLayout>
  );
}
