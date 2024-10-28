import { notFound } from "next/navigation";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getPlace } from "@/components/lib/place/db";
import { getSessionProfile } from "@/components/lib/user/profileSession";
import { PlacePageContent } from "@/components/pages/place/PlacePageContent";

export default async function PlacePage({
  params,
}: {
  params: { placeId: string };
}): Promise<JSX.Element> {
  const [profile, place] = await Promise.all([
    getSessionProfile(),
    getPlace(params.placeId),
  ]);

  if (!place) {
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
      <PlacePageContent place={place} />
    </StraightPageLayout>
  );
}
