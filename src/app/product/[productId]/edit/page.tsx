import { notFound } from "next/navigation";
import { ProductEditPageContent } from "./ProductEditPageContent";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getProductRecord } from "@/components/product/productDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function PlacePage({
  params,
}: {
  params: { productId: string };
}): Promise<JSX.Element> {
  if (!isUUID(params.productId)) {
    notFound();
  }

  const [profile, product] = await Promise.all([
    getSessionProfile(),
    getProductRecord(params.productId),
  ]);

  if (!profile) {
    throw new Error("Need login");
  }

  if (!product) {
    notFound();
  }

  return (
    <StraightPageLayout profile={profile}>
      <ProductEditPageContent product={product} />
    </StraightPageLayout>
  );
}
