import { Metadata } from "next";
import { SearchPlacesPageContent } from "./SearchPlacesPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export const metadata: Metadata = {
  title: "Search Places",
};

export default async function RegisterPage(): Promise<JSX.Element> {
  const profile = await getSessionProfile();

  if (!profile) {
    throw new Error("Need login");
  }

  return (
    <StraightPageLayout profile={profile}>
      <SearchPlacesPageContent />
    </StraightPageLayout>
  );
}
