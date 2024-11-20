"use client";

import { NewCheckinSection } from "@/components/checkin/NewCheckinSection";
import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { ProductDescription } from "@/components/product/ProductDescription";

export interface ProductCheckinPageContentProps {
  product: Product;
}

export function ProductCheckinPageContent({
  product,
}: ProductCheckinPageContentProps): JSX.Element {
  return (
    <VStack className="ProductCheckinPageContent" gap="gap-8">
      <ProductDescription product={product} />
      <NewCheckinSection board={product} />
    </VStack>
  );
}
