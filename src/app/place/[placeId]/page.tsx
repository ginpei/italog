import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getPlace } from "@/components/lib/place/db";
import { PlacePageContent } from "@/components/pages/place/PlacePageContent";

export default async function PlacePage({
  params,
}: {
  params: { placeId: string };
}): Promise<JSX.Element> {
  const [session, place] = await Promise.all([
    getSession(),
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
    <StraightPageLayout session={session}>
      <PlacePageContent place={place} />
    </StraightPageLayout>
  );
}
