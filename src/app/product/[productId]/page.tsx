import { notFound } from "next/navigation";
import { ProductPageContent } from "./ProductPageContent";
import { getProductCheckinRecords } from "@/components/checkin/checkinDb";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
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

  const [checkins] = await Promise.all([
    getProductCheckinRecords(profile.id, product.boardId),
  ]);

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
