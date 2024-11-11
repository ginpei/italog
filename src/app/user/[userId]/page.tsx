import { notFound } from "next/navigation";
import { UserPageContent } from "./UserPageContent";
import { getUserCheckinRecords } from "@/components/checkin/checkinDb";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { hasFriendshipRecord } from "@/components/user/friendshipDb";
import { getProfileRecord } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Page({
  params,
}: {
  params: {
    userId: string;
  };
}): Promise<JSX.Element> {
  const userId = params.userId;
  if (!isUUID(userId)) {
    notFound();
  }

  const [currentUserProfile, pageUserProfile, checkins] = await Promise.all([
    getSessionProfile(),
    getProfileRecord(userId),
    getUserCheckinRecords(userId),
  ]);

  if (!currentUserProfile) {
    throw new Error("Need login");
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
