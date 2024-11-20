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
  return (
    <VStack className="ProductDescription">
      <H1>{product.displayName}</H1>
      <ProductImageBlock imageUrl={product.imageUrl} />
      <div>Brands: {product.brands.split("\n").join(", ") || "(N/A)"}</div>
      <div>
        Categories: {product.categories.split("\n").join(", ") || "(N/A)"}
      </div>
      <div>
        Barcode: <code>{product.barcode}</code>
      </div>
    </VStack>
  );
}
