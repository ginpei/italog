import { Metadata } from "next";
import { MyProfilePageContent } from "./MyProfilePageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export const metadata: Metadata = {
  title: "Edit profile",
};

export default async function Home() {
  const profile = await getSessionProfile();

  if (!profile) {
    throw new Error("Need login");
  }

  return (
    <StraightPageLayout profile={profile}>
      <MyProfilePageContent profile={profile} />
    </StraightPageLayout>
  );
}
