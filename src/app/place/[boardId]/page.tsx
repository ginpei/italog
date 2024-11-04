import { notFound } from "next/navigation";
import { PlacePageContent } from "./PlacePageContent";
import { getUserCheckinRecords } from "@/components/checkin/checkinDb";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getPlaceRecord } from "@/components/place/placeDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function PlacePage({
  params,
}: {
  params: { boardId: string };
}): Promise<JSX.Element> {
  const [profile, place] = await Promise.all([
    getSessionProfile(),
    getPlaceRecord(params.boardId),
  ]);
  const userVisits = profile
    ? await getUserCheckinRecords(profile.id, params.boardId)
    : [];

  const visited =
    userVisits[0] &&
    new Date(userVisits[0].createdAt).toLocaleDateString() ===
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
      <PlacePageContent
        place={place}
        userCheckins={userVisits}
        checkedIn={visited}
      />
    </StraightPageLayout>
  );
}
