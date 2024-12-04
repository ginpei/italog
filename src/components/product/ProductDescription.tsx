import { useMemo } from "react";
import { VStack } from "../layout/VStack";
import { H1 } from "../style/Hn";
import { Product } from "./Product";
import { ProductImageBlock } from "./ProductImage";

export interface ProductDescriptionProps {
  product: Product;
}

export function ProductDescription({
  product,
}: ProductDescriptionProps): JSX.Element {
  const displayName = useMemo(() => {
    const b = product.brands;
    const n = product.displayName;
    if (b && n) {
      return `${b} - ${n}`;
    }

    return b || n;
  }, [product.brands, product.displayName]);

  return (
    <VStack className="ProductDescription">
      <H1>{displayName}</H1>
      <ProductImageBlock imageUrl={product.imageUrl} />
      <div>
        Categories: {product.categories.split("\n").join(", ") || "(N/A)"}
      </div>
      <div>
        Barcode: <code>{product.barcode}</code>
      </div>
    </VStack>
  );
}
