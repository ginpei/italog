import { VStack } from "@/components/layout/VStack";
import { Product } from "@/components/product/Product";
import { H1 } from "@/components/style/Hn";

export interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({
  product,
}: ProductPageContentProps): JSX.Element {
  return (
    <VStack className="ProductPageContent">
      <H1>{product.displayName}</H1>
      <p>Barcode: {product.barcode}</p>
    </VStack>
  );
}
