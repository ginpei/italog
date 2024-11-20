import { notFound } from "next/navigation";
import { ProductPageContent } from "./ProductPageContent";
import { Checkin } from "@/components/checkin/Checkin";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { Product } from "@/components/product/Product";
import { getProductRecord } from "@/components/product/productDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  if (!isUUID(params.productId)) {
    notFound();
  }

  const [profile, product, checkins] = await Promise.all([
    getSessionProfile(),
    getProductRecord(params.productId),
    [] as Checkin<Product>[], // TODO
  ]);
  if (!profile) {
    throw new Error("Need login");
  }
  if (!product) {
    notFound();
  }

  return (
    <StraightPageLayout profile={profile}>
      <ProductPageContent
        checkins={checkins}
        product={product}
        userId={profile.id}
      />
    </StraightPageLayout>
  );
}
