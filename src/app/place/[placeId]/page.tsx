import { notFound } from "next/navigation";
import { PlacePageContent } from "./PlacePageContent";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getPlaceRecord } from "@/components/lib/place/placeDb";
import { getSessionProfile } from "@/components/lib/user/profileSession";
import { getUserVisitRecords } from "@/components/lib/visit/visitDb";

export default async function PlacePage({
  params,
}: {
  params: { placeId: string };
}): Promise<JSX.Element> {
  const [profile, place] = await Promise.all([
    getSessionProfile(),
    getPlaceRecord(params.placeId),
  ]);
  const userVisits = profile
    ? await getUserVisitRecords(profile.id, params.placeId)
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
        userVisits={userVisits}
        visited={visited}
      />
    </StraightPageLayout>
  );
}
