import { notFound } from "next/navigation";
import { PlaceCheckinPageContent } from "./PlaceCheckinPageContent";
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

  if (!profile) {
    throw new Error("Need login");
  }

  if (!place) {
    notFound();
  }

  return (
    <StraightPageLayout profile={profile}>
      <PlaceCheckinPageContent place={place} />
    </StraightPageLayout>
  );
}
