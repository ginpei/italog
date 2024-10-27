import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { StraightPageLayout } from "@/components/lib/layout/StraightPageLayout";
import { getPlace } from "@/components/lib/place/db";
import { H1 } from "@/components/lib/style/Hn";

export default async function PlacePage({
  params,
}: {
  params: { placeId: string };
}): Promise<JSX.Element> {
  const session = await getSession();

  const place = getPlace(params.placeId);
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
      <H1>{place.displayName}</H1>
      <div>{params.placeId}</div>
      <p>
        <button className="border">Register</button>
      </p>
    </StraightPageLayout>
  );
}
