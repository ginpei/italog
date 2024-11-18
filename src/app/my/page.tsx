import { Metadata } from "next";
import { MyPageContent } from "./MyPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getFriendProfileRecords } from "@/components/user/profileDb";
import { getSessionProfile } from "@/components/user/profileSession";

export const metadata: Metadata = {
  title: "My Page",
};

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    throw new Error("Need login");
  }

  const [friends] = await Promise.all([getFriendProfileRecords(profile.id)]);

  return (
    <StraightPageLayout profile={profile}>
      <MyPageContent friends={friends} profile={profile} />
    </StraightPageLayout>
  );
}
