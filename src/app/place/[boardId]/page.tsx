import { notFound } from "next/navigation";
import { PlacePageContent } from "./PlacePageContent";
import { getPlaceCheckinRecords } from "@/components/checkin/checkinDb";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getPlaceRecord } from "@/components/place/placeDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function PlacePage({
  params,
}: {
  params: { boardId: string };
}): Promise<JSX.Element> {
  if (!isUUID(params.boardId)) {
    notFound();
  }

  const [profile, place] = await Promise.all([
    getSessionProfile(),
    getPlaceRecord(params.boardId),
  ]);
  const checkins = profile
    ? await getPlaceCheckinRecords(profile.id, params.boardId)
    : [];

  // TODO remove
  const visited =
    checkins[0] &&
    new Date(checkins[0].createdAt).toLocaleDateString() ===
      new Date().toLocaleDateString();

  if (!place) {
    console.log(`No place found (2)`);
    // TODO find how to return specific 404 page for this route
    // return (
    //   <StraightPageLayout session={session}>
    //     <H1>Place not found</H1>
    //   </StraightPageLayout>
    // );
    notFound();
  }

  return (
    <StraightPageLayout profile={profile}>
      <PlacePageContent place={place} checkins={checkins} checkedIn={visited} />
    </StraightPageLayout>
  );
}
