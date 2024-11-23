import { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserPageContent } from "./UserPageContent";
import { getUserCheckinRecords } from "@/components/checkin/checkinDb";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getPlaceRecords } from "@/components/place/placeDb";
import { getProductRecords } from "@/components/product/productDb";
import { hasFriendshipRecord } from "@/components/user/friendshipDb";
import { getProfileRecord } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

interface PageParams {
  userId: string;
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const pageProfile = await getProfileRecord(params.userId);
  return {
    title: pageProfile?.displayName,
  };
}

export default async function Page({
  params,
}: {
  params: PageParams;
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

  const [places, products] = await Promise.all([
    getPlaceRecords(
      checkins
        .filter((v) => v.board.boardType === "place")
        .map((v) => v.boardId),
    ),
    getProductRecords(
      checkins
        .filter((v) => v.board.boardType === "product")
        .map((v) => v.boardId),
    ),
  ]);

  const isFriend =
    currentUserProfile.id !== pageUserProfile.id &&
    (await hasFriendshipRecord(currentUserProfile.id, pageUserProfile.id));

  const publicCheckins =
    isFriend || currentUserProfile.id === pageUserProfile.id ? checkins : [];

  return (
    <StraightPageLayout profile={currentUserProfile}>
      <UserPageContent
        checkins={publicCheckins}
        currentUser={currentUserProfile}
        isFriend={isFriend}
        places={places}
        products={products}
        profile={pageUserProfile}
      />
    </StraightPageLayout>
  );
}
