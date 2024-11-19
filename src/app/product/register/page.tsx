import { Metadata } from "next";
import { ProductRegisterPageContent } from "./ProductRegisterPageContent";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { Product } from "@/components/product/Product";
import { getSessionProfile } from "@/components/user/profileSession";

export const metadata: Metadata = {
  title: "Register new product",
};

export default async function Page({
  searchParams,
}: {
  searchParams: { barcode: "0057700213247" };
}): Promise<JSX.Element> {
  const profile = await getSessionProfile();
  if (!profile) {
    throw new Error("Need login");
  }

  const initial: Partial<Product> = {
    barcode: searchParams.barcode ?? "",
  };

  return (
    <StraightPageLayout profile={profile}>
      <ProductRegisterPageContent initial={initial} />
    </StraightPageLayout>
  );
}
