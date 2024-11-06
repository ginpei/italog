import { notFound } from "next/navigation";
import { ProductPageContent } from "./ProductPageContent";
import { isUUID } from "@/components/db/transaction";
import { StraightPageLayout } from "@/components/layout/StraightPageLayout";
import { getProductRecord } from "@/components/product/productDb";
import { getSessionProfile } from "@/components/user/profileSession";

export default async function Page({
  params,
}: {
  params: { boardId: string };
}): Promise<JSX.Element> {
  if (!isUUID(params.boardId)) {
    notFound();
  }

  const [profile, product] = await Promise.all([
    getSessionProfile(),
    getProductRecord(params.boardId),
  ]);

  if (!profile) {
    return (
      <StraightPageLayout profile={profile}>
        <h1>Please login first</h1>
      </StraightPageLayout>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <StraightPageLayout profile={profile}>
      <ProductPageContent product={product} />
    </StraightPageLayout>
  );
}
