import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckinEditPageContent } from "./CheckinEditPageContent";
import { getCheckinRecord } from "@/components/checkin/checkinDb";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export const fetchCache = "force-no-store";

interface PageParams {
  checkinId: string;
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const checkin = await getCheckinRecord(params.checkinId);
  return {
    title: `Edit checkin at ${checkin?.board.displayName}`,
  };
}

export default async function Page({
  params,
}: {
  params: PageParams;
}): Promise<JSX.Element> {
  if (!isUUID(params.checkinId)) {
    notFound();
  }

  const [profile, checkin] = await Promise.all([
    getSessionProfile(),
    getCheckinRecord(params.checkinId),
  ]);

  if (!profile) {
    throw new Error("Need login");
  }

  if (!checkin) {
    notFound();
  }

  return (
    <StraightPageLayout profile={profile}>
      <CheckinEditPageContent checkin={checkin} />
    </StraightPageLayout>
  );
}
