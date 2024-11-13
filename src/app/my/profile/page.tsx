import { Metadata } from "next";
import { MyProfilePageContent } from "./MyProfilePageContent";
import { getAuthProfileRecordByUserId } from "@/components/auth/authProfileDb";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export const metadata: Metadata = {
  title: "My profile",
};

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    throw new Error("Need login");
  }

  const [authProfile] = await Promise.all([
    getAuthProfileRecordByUserId(profile.id),
  ]);
  if (!authProfile) {
    throw new Error("Auth profile not found");
  }

  return (
    <StraightPageLayout profile={profile}>
      <MyProfilePageContent authProfile={authProfile} profile={profile} />
    </StraightPageLayout>
  );
}
