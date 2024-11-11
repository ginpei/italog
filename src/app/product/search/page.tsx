import { Metadata } from "next";
import { ProductSearchPageContent } from "./ProductSearchPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getSessionProfile } from "@/components/user/profileSession";

export const metadata: Metadata = {
  title: "Search products",
};

export default async function RegisterPage(): Promise<JSX.Element> {
  const profile = await getSessionProfile();

  if (!profile) {
    throw new Error("Need login");
  }

  const recentCheckins: never[] = []; // TODO

  return (
    <StraightPageLayout profile={profile}>
      <ProductSearchPageContent recentCheckins={recentCheckins} />
    </StraightPageLayout>
  );
}
